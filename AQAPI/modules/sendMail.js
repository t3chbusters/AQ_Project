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
  html: ''
};

const htmlTemplate = `
    <h4>Dear Raghunadh,</h4>
    <p>We have received the request from you for registering into the website of ABC.com.</p>
    <p>Thanks for showing interesting to subscribe. To activate your email id to receive more information, please click below button.</p>

    <a href="http://localhost:3000/verify/search?search="${Buffer.from(user.email).toString('base64')} class="rbl">Activate here</a>
`;

const sendMail = (user) => {
  return new Promise((resolve, reject) => {
    mailOptions.to = user.email;
    mailOptions.html = htmlTemplate;
    console.log(mailOptions.html);
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

module.exports = { sendMail };