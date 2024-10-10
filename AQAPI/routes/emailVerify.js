const express = require('express');
const router = express.Router();
const dbOps = require('../modules/dbOps');

router.get('/search', async (req, res) => {
    // console.log(Buffer.from('raghunadhpstays@gmail.com').toString('base64'));
    let qParam = req.query.search;
    let decodeParam = Buffer.from(qParam, 'base64').toString('ascii');
    console.log(decodeParam);
    let userFetch = await dbOps.getUser(decodeParam);
    console.log(userFetch);
    // if result is ok, need to change active status in db.
    let updateStatus = await dbOps.updateUser(decodeParam);
    console.log(updateStatus);
    res.send('Email verified successfully..');
})
//?search=SGVsbG8gV29ybGQ=
//http://localhost:3000/verify/search?search=cmFnaHVuYWRocHN0YXlzQGdtYWlsLmNvbQ==
module.exports = router;