
// const express = require('express');
// const app = express();
// const dotenv = require('dotenv');

// const router = require('./router');
// const dbConfig = require('./configs/dbConfig');
// const cookieParser = require('cookie-parser');
// dotenv.config();
// dbConfig();
// app.use(express.json());
// app.use(cookieParser())

// app.use(router)


// // const dns = require('dns');
// // dns.setServers(['8.8.8.8', '8.8.4.4']);

// app.listen(8000, ()=>{
//     console.log('Server is running on port 8000')
// })

require('dotenv').config(); 

const express = require('express');
const app = express();

const router = require('./router');
const dbConfig = require('./configs/dbConfig');
const cookieParser = require('cookie-parser');

dbConfig();

app.use(express.json());
app.use(cookieParser());

app.use(router);

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});