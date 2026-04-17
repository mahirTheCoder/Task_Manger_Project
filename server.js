const express = require('express')
const app = express()
const router = require('./router');
const dbConfig = require('./configs/dbConfig');
const dotenv = require('dotenv');
app.use(express.json());
app.use(router)
dotenv.config();
dbConfig()

// -----server crash ba dbconfig connect na hole ai code ta use korle problem solve hoey jabe 

// const dns = require('dns');
// dns.setServers(['8.8.8.8', '8.8.4.4']);



app.listen(8000, ()=>{
    console.log('Server is running on port 8000')
})