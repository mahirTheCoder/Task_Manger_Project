const express = require('express')
const app = express()
const router = require('./router');
const dbConfig = require('./configs/dbConfig');
const dotenv = require('dotenv');
app.use(express.json());
app.use(router)

dotenv.config();
dbConfig()



app.listen(8000, ()=>{
    console.log('Server is running on port 8000')
})