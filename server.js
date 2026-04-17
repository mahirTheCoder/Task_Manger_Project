const express = require('express')
const app = express()
const router = require('./router')
app.use(express.json());
app.use(router)




app.listen(8000, ()=>{
    console.log('Server is running on port 8000')
})