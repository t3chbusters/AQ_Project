var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  secure: true,
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: '3r4rss@gmail.com',
    pass: 'ipvrfwbtvhentzrv'
  }
});

var mailOptions = {
  from: '3r4rss@gmail.com',
  to: 'raghunadhpstays@gmail.com; ',
  subject: 'Email From Node.js',
  text: 'test mail easy!',
  html: '<a href="http://localhost:3000/testing" class="rbl">Click here</a>'
};

const testMail = (email, username, passcode) => {
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
    console.log(`email: ${email}; username: ${username}; passcode: ${passcode}`);
}

module.exports = {testMail};