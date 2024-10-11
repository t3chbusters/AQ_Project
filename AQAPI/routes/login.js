const express = require('express');
const router = express.Router();
const {validation} = require('../utils/validation');
const mail = require('../modules/sendMail');
const dbOps = require('../modules/dbOps');
const Joi = require('joi');

const UserSchema = Joi.object({
    email: Joi.string().required().min(5).max(50),
    username: Joi.string().required(),
    passcode: Joi.string().min(5).max(20).required()
});

router.get('/', async (req, res) => {
    let userDetails = req.body;
    let validate = UserSchema.validate(userDetails);
    if(validate.error){
        let valide = {};
        valide.error = validate.error.message;
        res.status(400).send(validation(valide));
    }else{
        let userAddResult = {};
        try{
            let userAdd = await dbOps.pushUser(userDetails);  
            if(userAdd.error == false){
                try{
                    let result = await mail.sendMail(userDetails);
                    if(result.error == false){
                        result.status = 'email sent for activation';
                        res.status(200).send(result);
                    }
                }catch(err){
                    userAddResult.error = err;
                    res.status(400).send(userAddResult);
                }                
            }
        }catch(err) {
            userAddResult.error = err;
            res.status(400).send(userAddResult);
        }
    }
});

module.exports = router;