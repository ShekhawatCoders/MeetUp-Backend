var mysql = require('mysql');
var con = mysql.createConnection({
    host : "us-cdbr-east-03.cleardb.com" ,
    user : "bf29dd7f295af0" ,
    password : "d9dfef80" ,
    database : "heroku_90fbd2c992ae916"
});
con.connect(function(err) {
    if(err) throw err;
    var name = 'V Singh 2021';
    var email = 'Vishalsinghgk2021@gmail.com';
    var password = "Vishal#1@";
    var sql  = "INSERT INTO user (name,email,password) VALUES (?,?,?)";
    con.query(sql,[name,email,password],function(err) {
        if(err) throw err;
        console.log("Inserted Data Successfully");
        con.end();
    });
});