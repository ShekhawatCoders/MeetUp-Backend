var http = require('http');
var mysql = require('mysql');
var con = mysql.createConnection({
    host : "us-cdbr-east-03.cleardb.com" ,
    user : "bf29dd7f295af0" ,
    password : "d9dfef80" ,
    database : "heroku_90fbd2c992ae916"
});
con.connect(function(err) {
    if(err) {
        console.log(err);
        throw err;
    }
    console.log("Connection Successful");
    var sql = "select * from user";
    con.query(sql,function(err,result) {
        if(err) throw err;
        console.log(result);
        console.log("Fetched Successfully");
    });
    con.end();
});