const express = require('express');
const router = require('./network/router')
const app = express();
const config = require('./config');
const connectDB = require('./db')

connectDB(config.dbUrl)
router(app);


app.listen(config.port,()=>{
    console.log('La aplicación esta escuchando en http://localhost: '+config.port);
});

