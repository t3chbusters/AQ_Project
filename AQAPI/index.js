const express = require('express');
const app = express();
require('dotenv').config();
const login = require('./routes/login');
const PORT = process.env.PORT;
app.use(express.json());
app.use('/login', login);

app.get('/', (req, res) => {
    res.send('success');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));