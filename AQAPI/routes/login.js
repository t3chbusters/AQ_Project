const express = require('express');
const router = express.Router();
const mail = require('../modules/sendMail');
const dbOps = require('../modules/dbOps');
const Joi = require('joi');
const UserSchema = Joi.object({
    email: Joi.string().required().min(5).max(50),
    username: Joi.string().required(),
    passcode: Joi.string().min(5).max(20)
});

router.get('/', async (req, res) => {
    let userDetails = req.body;
    let validateResult = UserSchema.validate(userDetails);
    console.log(validateResult);
    // db insertion functionality...
    let r = await dbOps.pushUser(userDetails);
    console.log(r);
    //mail sending process...
    let result = await mail.sendMail(userDetails);
    if (result.msg = 'success') {
        res.send('Mail Sent for Activation');
    } else {
        res.send(result.msg);
    }
});

module.exports = router;