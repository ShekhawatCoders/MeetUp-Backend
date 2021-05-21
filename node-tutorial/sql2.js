var mysql  = require('mysql');
var con = mysql.createConnection({
    host : "us-cdbr-east-03.cleardb.com" ,
    user : "bf29dd7f295af0" ,
    password : "d9dfef80" ,
    database : "heroku_90fbd2c992ae916"
});
con.connect(function(err) {
    if(err) throw err;
    var new_sql = "DROP TABLE user";
    var sql  = "CREATE TABLE user ("+
                "id int AUTO_INCREMENT PRIMARY KEY,"+
                "name varchar(20),"+
                "email varchar(50) unique not null,"+
                "password varchar(25) not null,"+
                "status varchar(10),"+
                "lastseen timestamp default current_timestamp,"+
                "token varchar(25));";
    con.query(sql,function(err) {
        if(err) throw err;
        console.log("Hello");
    })
    con.end();
})