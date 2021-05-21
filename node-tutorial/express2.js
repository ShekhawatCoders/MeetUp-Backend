var express = require('express');
var app = express();



app.use(express.static("c:/Users/visha/OneDrive/Documents/Website/public"));

/*
app.get('/',function(req,res) {
    res.sendFile('c:/Users/visha/OneDrive/Documents/Website/public/node/form1.html');
    console.log("File Submitted Successfully.");
});
app.get('/index.html',function(req,res) {
    res.sendFile('c:/Users/visha/OneDrive/Documents/Website/public/index.html');
});
app.get('/about.html',function(req,res) {
    res.sendFile('c:/Users/visha/OneDrive/Documents/Website/public/about.html');
});
app.get('/contact.html',function(req,res) {
    res.sendFile('c:/Users/visha/OneDrive/Documents/Website/public/contact.html');
});
app.post('/post-data',function(req,res) {
    res.sendFile('c:/Users/visha/OneDrive/Documents/Website/public/index.html');
    console.log("File Submitted Successfully.");
});
*/
app.listen(3000,function(err){
    if(err) throw err;
    console.log('Node Server is listening.');
});