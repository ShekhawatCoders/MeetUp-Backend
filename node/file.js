var http = require('http')
var fs = require('fs')

http.createServer(function(req,res) {
    /*fs.readFile('public/index.html',function(err,data) {
        if(err) {
            throw err;
        }
        res.writeHead(200,{'Content-Type' : 'text/html'});
        res.write(data);
        return res.end();
    });*/
    fs.writeFile('input.txt',"This is input file where all inputs are stored.",function(err) {
        if(err) console.log(err);
        console.log("Write successfully");
    });
    fs.appendFile('input.txt',"This is appended into mydatabase",function(err) {
        if(err) console.log(err);
        console.log("Line Appended successfully");
    })
    res.writeHead(200,{'Content-Type' : 'text/html'});
    res.write("<h1>Welcome</h1>");
    res.end();
}).listen(8000);