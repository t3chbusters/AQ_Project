var nodemailer = require('nodemailer');
require('dotenv').config();
var transporter = nodemailer.createTransport({
  secure: true,
  host: process.env.SMTPHOST,
  port: process.env.SMTPPORT,
  auth: {
    user: process.env.SMTPUSER,
    pass: process.env.SMTPPW
  }
});

var mailOptions = {
  from: process.env.SMTPUSER,
  to: '',
  subject: 'Email From Node.js',
  // text: 'test mail easy!',
  html: '<a href="http://localhost:3000/verify" class="rbl">Activate here</a>'
};

const testMail = (user) => {
  return new Promise((resolve, reject) => {
    mailOptions.to = user.email;
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        reject({ msg: error });
      } else {
        console.log('Email sent: ' + info.response);
        resolve({ msg: 'success' });
      }
    });
  })
}

module.exports = { testMail };