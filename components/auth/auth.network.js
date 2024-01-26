const express       = require('express');
const router        = express.Router();
const authController= require('./auth.controller');
const response      = require('../../network/response');

router.post('/',(req,res)=>{
    const {email,password} = req.body;
    authController.login(email,password)
        .then(user=>{response.success(req,res,"Bienvenido",user,200)})
        .catch(e=>{response.error(req,res,e,400)})
})

module.exports = router;