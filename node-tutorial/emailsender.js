var nodemailer = require('nodemailer');
const { getMaxListeners } = require('process');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vishalsinghgk2021@gmail.com',
    pass: 'mkunxwdtfeqxanlc'
  }
});

var mailOptions = {
  from: 'vishalsinghgk2021@gmail.com',
  to: 'vishalsinghgk2018@gmail.com',
  subject: 'Good to See You !!!!',
  html: '<h1>Welcome to rvCoder ...</h1>'+
  '<p>Hey, We have some surprised for you if you want then you can join to us,' +
  'and hoping good for you , have a nice day.</p>'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

