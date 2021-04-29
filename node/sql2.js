var mysql  = require('mysql');
var con = mysql.createConnection({
    host : "localhost" ,
    user : "Vishal" ,
    password : "Vishal#1@" ,
    database : "college"
});
con.connect(function(err) {
    if(err) throw err;
    var sql  = "CREATE TABLE student (id int AUTO_INCREMENT PRIMARY KEY,"+
                "name varchar(255),email varchar(50));";
    con.query(sql,function(err) {
        if(err) throw err;
        console.log("Table is created.");
    })
})