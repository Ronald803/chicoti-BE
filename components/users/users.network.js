const express       = require('express');
const router        = express.Router();
const userController= require('./users.controller');

router.get('/',(req,res)=>{
    userController.getUsers()
        .then(users=>{
            res.send(users)
        })
        .catch()
});

router.post('/',(req,res)=>{
    userController.addUsers()
        .then(newUser=>{
            res.send(newUser)
        })
        .catch()
})

router.put('/',(req,res)=>{
    res.send("put a users")
})

router.delete('/',(req,res)=>{
    res.send("delete a users")
})

module.exports = router;