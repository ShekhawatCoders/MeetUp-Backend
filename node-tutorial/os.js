var os = require('os');
console.log(os.version());
console.log(os.userInfo());
console.log("Total memory : " + os.totalmem()/(1024*1024*1024) + " GB.");
console.log("Free memory : " + os.freemem()/(1024*1024*1024) + " GB.");