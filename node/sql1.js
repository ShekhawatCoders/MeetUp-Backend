var http = require('http');
var mysql = require('mysql');
var con = mysql.createConnection({
    host : "localhost",
    user : "Vishal",
    password : "Vishal#1@"
});
con.connect(function(err) {
    if(err) {
        console.log(err);
        throw err;
    }
    console.log("Connection Successful");
    var sql = "CREATE DATABASE College";
    con.query(sql,function(err,result) {
        if(err) throw err;
        console.log(result);
        console.log("DataBase created Successfully");
    });
});