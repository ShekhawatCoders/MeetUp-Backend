const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const url = require('url');
const querystring = require('querystring');
var app = express();
var http = require('http').Server(app);
var multer = require('multer');
var forms = multer();
const mysql  = require('mysql');
const port = process.env.PORT || 5500;

app.use(bodyParser.json());
app.use(forms.array()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

var con = mysql.createPool({
    host : "us-cdbr-east-03.cleardb.com" ,
    user : "bf29dd7f295af0" ,
    password : "d9dfef80" ,
    database : "heroku_90fbd2c992ae916"
});

// router
app.get('/api/v1/login', (req,res) => {
    const email = req.query.email;
    const password = req.query.password; 
    const sql = 'SELECT * FROM user WHERE email = ? AND password = ?';
    con.query(sql, [email,password], (error,result,fields) => {
        if(error) res.send([]);
        else res.send(result);
        res.end();
    });
});
app.get('/api/v1/signUp', (req,res) => {
    var name = req.query.name;
    var email = req.query.email;
    var password = req.query.password; 
    // insert this user and return id for this user
    const sql = "INSERT INTO user (name,email,password) VALUES (?,?,?)";
    con.query(sql, [name,email,password], (error,result,fields) => {
        if(error) {
            res.send([]);
            res.end();
            return;
        }
        const sql = 'SELECT * FROM user WHERE email = ? AND password = ?';
        con.query(sql, [email,password], (error,result,fields) => {
            if(error) res.send([]);
            else res.send(result);
            res.end();
        });
    });
});
app.get('/api/v1/allInterests', (req,res) => {
    var sql  = "SELECT * FROM interest";
    con.query(sql, (error,result) => {
        if(error) res.send(null);
        else res.send(result);
        res.end();
    });
});
app.post('/api/v1/allInterestedUsers', (req,res) => {
    var json_response = req.body;
    const keys = Object.keys(json_response);
    var values = [];
    for(i=0;i<keys.length;i++) {
        var key = keys[i];
        values.push(Number(key));
    }
    var sql = "SELECT DISTINCT id,name,email,password,status,"+
    "lastseen,socketid,token FROM user,userinterest WHERE "+
    "userinterest.interestid in (?) AND userinterest.userid = user.id";
    con.query(sql, [values], (error,result) => {
        if(error) res.send(null);
        else res.send(result);
        res.end();
    });
});
app.get('/api/v1/allUsers', (req,res) => {
    var sql = "SELECT * FROM user";
    con.query(sql, (error,result) => {
        if(error) res.send(null);
        else res.send(result);
        res.end();
    });
});
app.get('/api/v1/userInterests', (req,res) => {
    var userid = Number(req.query.userid);
    var sql = "SELECT interest.id,interest.name FROM interest,userinterest WHERE "+
    "userinterest.userid = ? AND userinterest.interestid = interest.id";
    con.query(sql, [userid], (error,result) => {
        if(error) res.send(null);
        else res.send(result);
        res.end();
    });
});
app.post('/api/v1/addInterests', (req,res) => {
    var json_response = req.body;
    const keys = Object.keys(json_response);
    var values = [];
    for(i=0;i<keys.length;i++) {
        var key = keys[i];
        values.push([Number(key),Number(json_response[key])]);
    }
    var sql = 'INSERT INTO userinterest (interestid,userid) VALUES ?';
    con.query(sql, [values] , (error,result,fields) => {
        if(error) res.send(false);
        else res.send(true);
        res.end();
    });
});
app.get('/api/v1/chatOne', (req,res) => {
    var senderid = Number(req.query.senderid);
    var receiverid = Number(req.query.receiverid);
    var sql = "SELECT * FROM chat WHERE (senderid=? AND receiverid=?) OR (senderid=? AND receiverid=?) AND messagetype = 0";
    con.query(sql, [senderid,receiverid,receiverid,senderid], (error,result) => {
        if(error) res.send(null);
        else res.send(result);
        res.end();
    });
});
app.get('/api/v1/chatAll', (req,res) => {
    var id = Number(req.query.id);
    var sql = "SELECT * FROM chat WHERE senderid=? OR receiverid=? "+
    "AND messagetype = 0";
    con.query(sql, [id,id], (error,result) => {
        if(error) res.send(null);
        else res.send(result);
        res.end();
    });
});
app.get('/api/v1/groupChatAll', (req,res) => {
    var id = Number(req.query.id);
    var sql = "SELECT * FROM chat WHERE receiverid=?  AND messagetype = 1";
    con.query(sql, [id,id], (error,result) => {
        if(error) res.send(null);
        else res.send(result);
        res.end();
    });
});
app.get('/api/v1/addChatOneMessage', (req,res) => {
    const senderid = Number(req.query.senderid);
    const receiverid = Number(req.query.receiverid);
    if(receiverid == senderid) {
        res.send([]);
        res.end();
    }
    const message = req.query.message;
    const sql = "INSERT INTO chat (senderid,receiverid,message) VALUES (?, ?, ?);";
    con.query(sql, [senderid,receiverid,message], (error,result,fields) => {
        if(error) {
            res.send(null);
            res.end();
            return;
        }
        const sql = "SELECT * FROM chat where messageid = ? AND messagetype = 0";
        con.query(sql, [result.insertId], (error,result,fields) => {
            if(error) res.send(null);
            else res.send(result);
            res.end();
        });
    });
});
app.get('/api/v1/addFriendRequests', (req,res) => {
    const firstid = Number(req.query.firstid);
    const secondid = Number(req.query.secondid);
    const status = 0;
    if(firstid > secondid) {
        var temp = firstid;
        firstid = secondid;
        secondid = temp;
        status = 1;
    }
    // notify user here
    const sql = "INSERT INTO friends (firstid,secondid,status) VALUES (?,?,?)";
    con.query(sql, [firstid, secondid], (error,result,fields) => {
        if(error) {
            res.send(false);
        } else {
            res.send(true);
        }
        res.end();
    });
});
app.get('/api/v1/makeFriends', (req,res) => {
    const firstid = Number(req.query.firstid);
    const secondid = Number(req.query.secondid);
    // notify user here
    const sql = "UPDATE friends SET status = 2 " + 
    "WHERE firstid = ? AND secondid = ?";
    con.query(sql, [firstid, secondid], (error,result,fields) => {
        if(error) {
            res.send(false);
        } else {
            res.send(true);
        }
        res.end();
    });
});
app.get('api/v1/getFriends' , (req,res) => {
    const id = Number(req.query.id);
    const sql = "SELECT user.id,name,email,password,status,"+
    "lastseen,socketid,token FROM user,friends WHERE "+
    "(friends.firstid = ? AND stat = 2) OR "+
    "(friends.secondid = ? AND stat = 2)";
    con.query(sql, [id,id], (error,result,fields) => {
        if(error) {
            res.send(null);
        } else {
            res.send(result);
        }
        res.end();
    });
});
app.get('api/v1/getFriendRequests' , (req,res) => {
    const id = Number(req.query.id);
    const sql = "SELECT user.id,name,email,password,status,"+
    "lastseen,socketid,token FROM user,friends WHERE "+
    "(friends.firstid = ? AND stat = 1) OR "+
    "(friends.secondid = ? AND stat = 0)";
    con.query(sql, [id,id], (error,result,fields) => {
        if(error) {
            res.send(null);
        } else {
            res.send(result);
        }
        res.end();
    });
});
app.get('/api/v1/updateToken', (req,res) => {
    const id = Number(req.query.id);
    const token = req.query.token;
    const sql = "UPDATE user SET token = ? WHERE id = ?";
    con.query(sql, [token,id], (error,result,fields) => {
        if(error) {
            res.send(false);
        } else {
            res.send(true);
        }
        res.end();
    });
});
app.get('/api/v1/updateLastSeen', (req,res) => {
    const id = Number(req.query.id);
    const lastseen = req.query.lastseen;
    const sql = "UPDATE user SET lastseen = ? WHERE id = ?";
    con.query(sql, [lastseen,id], (error,result,fields) => {
        if(error) {
            res.send(false);
        } else {
            res.send(true);
        }
        res.end();
    });
});

// server listening at port
var listener = http.listen(port, function() {
    console.log('Server is listening at port ' + port);
});
