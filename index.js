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
        if(error) throw error;
        res.send(result);
        res.end();
    });
});
app.get('/api/v1/user', (req,res) => {
    var sql = "SELECT * FROM user";
    con.query(sql, (error,result) => {
        if(error) throw error;
        res.send(result);
        res.end();
    });
});
app.get('/api/v1/chat', (req,res) => {
    var senderid = Number(req.query.senderid);
    var receiverid = Number(req.query.receiverid);
    var sql = "SELECT * FROM chat WHERE (senderid=? AND receiverid=?) OR (senderid=? AND receiverid=?)";
    con.query(sql, [senderid,receiverid,receiverid,senderid], (error,result) => {
        if(error) throw error;
        res.send(result);
        res.end();
    });
});
app.post('/api/v1/signup', (req,res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password; 
    // insert this user and return id for this user
    const sql = "INSERT INTO user (name,email,password) VALUES (?,?,?)";
    con.query(sql, [name,email,password], (error,result,fields) => {
        if(error) throw error;
        var response = JSON.stringify(result);
        console.log(response);
        res.send(response);
        res.end();
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
    console.log(values);
    var sql = 'INSERT INTO userinterest (interestid,userid) VALUES ?';
    con.query(sql, [values] , (error,result,fields) => {
        if(error) throw error;
        res.write("This is error :- ",error,"\n This is Field :- ",fields);
        res.end();
    });
});
app.post('/api/v1/login', (req,res) => {
    const email = req.body.nmail;
    const password = req.body.password; 
    const sql = 'SELECT * FROM user WHERE email = ? AND password = ?';
    con.query(sql, [email,password], (error,result,fields) => {
        if(error) throw error;
        var response = JSON.stringify(result);
        console.log("USER FOUND => " + response);
        res.send(response +"\n" + JSON.stringify(fields));
        res.end();
    });
});

// server listening at port
http.listen(port, function() {
    console.log('Server is listening at port ' + port);
});
