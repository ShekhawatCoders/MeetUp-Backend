const { resolveSoa } = require('dns');
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
// for parsing application/json
app.use(bodyParser.json()); 
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/post-data', function(req,res) {
    var name = req.body.Name;
    var email = req.body.Email;
    var number = req.body.Number;
    if(name.length <= 0 || email.length <= 0 || number.length <= 0) {
        res.send("Please fill All Fields.");
    } else {
        console.log("Name : " + name + " && Email : " + email + " && Number : " + number); 
        res.send("Write Successfully.");
    }
});
app.listen(3000,function(req,res) {
    console.log("Ya, now server is listening at port 3000.");
});