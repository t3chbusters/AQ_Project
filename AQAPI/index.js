const express = require('express');
const app = express();
require('dotenv').config();
const login = require('./routes/login');
const verify = require('./routes/emailVerify');
const PORT = process.env.PORT;
app.use(express.json());
app.use('/login', login);
app.use('/verify', verify);

app.get('/', (req, res) => {
    res.send('success');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));