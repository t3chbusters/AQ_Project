const express = require('express');
const router = express.Router();
const dbOps = require('../modules/dbOps');
const { validation } = require('../utils/validation');

//http://localhost:3000/verify/search?search=cmFnaHVuYWRocHN0YXlzQGdtYWlsLmNvbQ==
router.get('/search', async (req, res) => {
    let qParam = req.query.search;
    let decodeParam = Buffer.from(qParam, 'base64').toString('ascii');
    try{
        try{
            let userExist = await dbOps.getUser(decodeParam);
            if(userExist.error == false){
                if(userExist.msg[0].USERSTATUS == 'Active'){
                    let status = "User Already Activated";
                    res.status(200).send(validation(status));
                }else{
                    let updateStatus = await dbOps.updateUser(decodeParam);
                    if(updateStatus.error == false){
                        updateStatus.status = 'Email Verified & User Activated';
                        res.status(200).send(updateStatus);
                    }else{
                        res.status(400).send(updateStatus);
                    }
                }             
            }else{
                res.status(400).send(userExist);
            }
        }catch(err){
            res.status(400).send(err);
        }
    }catch(err){
        res.status(400).send(err);
    }
})

module.exports = router;