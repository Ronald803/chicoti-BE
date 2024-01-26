const express       = require('express');
const router        = express.Router();
const userController= require('./users.controller');
const response      = require('../../network/response');

router.get('/',(req,res)=>{
    userController.getUsers(req.query)
        .then(users=>{response.success(req,res,users.length,users,200)})
        .catch(e=>{response.error(req,res,e,400)})
});

router.post('/',(req,res)=>{
    userController.addUsers(req.body)
        .then(newUser=>{response.success(req,res,"Usuario añadido correctamente",newUser,200)})
        .catch(e=>{response.error(req,res,e,400)})
})

router.put('/',(req,res)=>{
    res.send("put a users")
})

router.delete('/',(req,res)=>{
    res.send("delete a users")
})

module.exports = router;