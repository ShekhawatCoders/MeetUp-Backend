const express = require('express');
const bodyParser = require('body-parser');
var app = express();
var multer = require('multer');
var forms = multer();
app.use(bodyParser.json());
app.use(forms.array()); 
app.use(bodyParser.urlencoded({ extended: true }));
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
app.get('/interest', (req,res) => {
    var sql  = "SELECT * FROM interest";
    con.query(sql, (error,result) => {
        if(error) throw error;
        for(var i=0;i<result.length;i++) {
            res.write(i+1 + ". " + result[i].name+"\n");
        }
        res.end();
    });
});

app.get('/user', (req,res) => {
    var sql = "SELECT * FROM user";
    con.query(sql, (error,result) => {
        if(error) throw error;
        console.log(JSON.stringify(result));
        for(var i=0;i<result.length;i++) {
            res.write(i+1 + ". " + result[i].name + " => " + result[i].email+"\n");
        }
        res.end();
    });
});

app.post('/signup', (req,res) => {
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

app.post('/addinterests', (req,res) => {
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

app.post('/login', (req,res) => {
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
