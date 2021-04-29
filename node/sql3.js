var mysql = require('mysql');
var con = mysql.createConnection({
    host : 'localhost',
    user : 'Vishal',
    password : 'Vishal#1@',
    database : 'college'
});
con.connect(function(err) {
    if(err) throw err;
    var name = 'Satish';
    var email = 'Vishalsinghgk2019@gmail.com';
    var sql  = "INSERT INTO student (name,email) VALUES (?,?)";
    con.query(sql,[name,email],function(err) {
        if(err) throw err;
        console.log("Inserted Data Successfully");
    });
});