const { table } = require('console');
var http = require('http');
var mysql = require('mysql');
var con = mysql.createConnection({
    host : 'localhost',
    user : 'Vishal',
    password : 'Vishal#1@',
    database : 'college' //Select database
});
con.connect(function(err) {
    if(err) throw err;
});
http.createServer(function(req,res) {
        var sql = "SELECT * FROM student";
        con.query(sql,function(err,result) {
            res.writeHead(200,{'Content-Type' : 'text/html'});
            res.write("<h1>Student Database</h1>");
            res.write("<table><tr><th>Name</th><th>Email</th></tr>");
            for(var i=0;i<3;i++) {
                res.write("<tr><th>"+result[i].name+"</th><th>"+result[i].email+"</th></tr>");
            }
            res.write("</table>");
            res.end();
        })
}).listen(3310);