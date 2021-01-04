process.env.NODE_ENV === 'development' ? require('dotenv').config() : '';
const express = require('express');
const app = express();
const port = 3000;
const router = require('./routes');

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use('/', router);
app.listen(port, _=> console.log(`running on ${port}`));