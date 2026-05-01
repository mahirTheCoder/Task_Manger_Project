
const express = require('express');
const app = express();
require('dotenv').config(); 

const router = require('./router');
const dbConfig = require('./configs/dbConfig');
const cookieParser = require('cookie-parser');

dbConfig();
app.use(express.json());
app.use(cookieParser());
app.use(router);

// ------secound way to serve static files
const path = require('path');
console.log(path.join(__dirname, 'uploads')); // debug


app.listen(8000, () => {
  console.log('Server is running on port 8000');
});