var arr = [];
const socketid = "kdalfasd";
const username = "vishal singh";
var data = {userid : socketid, username : username};
arr.push(data);
data.username = "Satish singh";
arr.push(data);
console.log(arr);

const testFolder = __dirname;
const fs = require('fs');

fs.readdirSync(testFolder).forEach(file => {
  console.log(file);
});