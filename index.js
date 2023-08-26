const express = require('express');

const app = express();

app.use('/',function(req,res){
    res.send('hola esta es el backend de la app chicoti')
})

app.listen(6000);
console.log('La aplicacion está escuchando en http://localhost:6000');
