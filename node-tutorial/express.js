var express = require('express');
var app = express();
app.get('/',function(req,res)  {
    console.log("Welcome to here.");
    res.write("Welcome to here.");
    res.end();
});
app.post('/post-data',function(req,res) {
    res.write("Post requested.");
    res.end();
})
app.listen(3000,function() {
    console.log("Server is runnning");
})