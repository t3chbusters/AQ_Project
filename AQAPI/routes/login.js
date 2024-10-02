const express = require('express');
const router = express.Router();
const mail = require('../modules/sendMail');
const Joi = require('joi');
const UserSchema = Joi.object({
    email: Joi.string().required().min(5).max(50),
    username: Joi.string().required(),
    passcode: Joi.string().min(5).max(20)
});

router.get('/', (req, res) => {
    let details = req.body;
    let result = Joi.valid(details);
    console.log(`result: ${result}`);
    mail.testMail(details.email, details.username, details.passcode);
    res.send('login success..');
});

module.exports = router;