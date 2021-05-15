const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const url = require('url');
const querystring = require('querystring');
var app = express();
var multer = require('multer');
var forms = multer();
app.use(bodyParser.json());
app.use(forms.array()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));
var http = require('http').Server(app);
var io = require('socket.io')(http);
const mysql  = require('mysql');
const port = process.env.PORT || 5500;

var con = mysql.createPool({
    host : "us-cdbr-east-03.cleardb.com" ,
    user : "bf29dd7f295af0" ,
    password : "d9dfef80" ,
    database : "heroku_90fbd2c992ae916"
});

// router
app.get('/api/v1/interest', (req,res) => {
    var sql  = "SELECT * FROM interest";
    con.query(sql, (error,result) => {
        if(error) res.send(null);
        else res.send(result);
        res.end();
    });
});
app.get('/api/v1/user', (req,res) => {
    var sql = "SELECT * FROM user";
    con.query(sql, (error,result) => {
        if(error) res.send(null);
        else res.send(result);
        res.end();
    });
});
app.get('/api/v1/interestedUser', (req,res) => {
    var interestid = Number(req.query.interestid);
    var sql = "SELECT * FROM user WHERE interestid = ?";
    con.query(sql, [interestid], (error,result) => {
        if(error) res.send(null);
        else res.send(result);
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
    var sql = "SELECT * FROM chat WHERE senderid=? OR receiverid=?  AND messagetype = 0";
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
app.get('/api/v1/signup', (req,res) => {
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
app.post('/api/v1/addinterest', (req,res) => {
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

// socket server side
io.on('connection', function(socket) {
    console.log("connected");
    socket.on('disconnect', function() {
        console.log("dis-connected");
    });
});

app.get('/',function(req,res) {
    res.send("Hello !!!");
    res.end();
});

// server listening at port
http.listen(port, function() {
    console.log('Server is listening at port ' + port);
});
