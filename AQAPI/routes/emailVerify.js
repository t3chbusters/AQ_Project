const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Email verified successfully..');
})

module.exports = router;