const express   = require('express');
const router    = express.Router();
const authController = require('./auth.controller');

router.post('/',(req,res)=>{
    const {email,password} = req.body;
    authController.login(email,password)
        .then(message=>{
            res.send(message)
        })
        .catch(e=>{
            res.send(e)
        })
})

module.exports = router;