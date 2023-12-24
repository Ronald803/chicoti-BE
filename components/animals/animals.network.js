const express           = require('express');
const router            = express.Router();
const animalController  = require('./animals.controller');

router.get('/',(req,res)=>{
    animalController.getAnimals()
        .then(animals=>{
            res.send(animals)
        })
        .catch()
});

router.post('/:characteristic',(req,res)=>{
    console.log("asdfasdfasdf");
    animalController.addAnimal(req.body,req.params.characteristic)
        .then(newAnimal=>{
            res.send(newAnimal)
        })
        .catch(e=>console.log(e))
})

router.put('/',(req,res)=>{
    res.send("put a animals")
})

router.delete('/',(req,res)=>{
    res.send("delete a animals")
})

module.exports = router;