var mysql = require('mysql');
var con = mysql.createConnection({
    host : 'localhost',
    user : 'Vishal',
    password : 'Vishal#1@',
    database : 'college' //Select database
});
con.connect(function(err) {
    if(err) throw err;
    var sql = "SELECT * from student";
    //var sql = "SELECT * from student WHERE id = 1";
    //var sql = "SELECT * from student ORDER BY id DESC";
    con.query(sql,function(err,result) {
        if(err) throw err;
        console.log(result);
    })
})