const express = require('express');
const router = require('./network/router')

const app = express();

router(app);


app.listen(6000);
console.log('La aplicacion está escuchando en http://localhost:6000');
