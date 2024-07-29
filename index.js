const express = require('express');
const cors = require('cors')
const router = require('./network/router')
const app = express();
const config = require('./config');
const connectDB = require('./db')

connectDB(config.dbUrl)
app.use( cors() )
app.use(express.json())
router(app);


app.listen(config.port,()=>{
    console.log('La aplicación esta escuchando en http://localhost: '+config.port);
});

// https://cosmic-latte.jala-one.com/jalasoft/evaluations/E7acyj4xgpgb3YgSP/fill/z2wohtb3a3s
