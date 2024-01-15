const express           = require('express');
const router            = express.Router();
const animalController  = require('./animals.controller');
const { validateJWT }   = require('../../middlewares/validateJWT');
const multer            = require('multer');
const inOrderToUpload   = multer(); 

router.get('/',(req,res)=>{
    animalController.getAnimals(req.query)
        .then(animals=>{
            res.send(animals)
        })
        .catch()
});

router.post('/:characteristic',validateJWT(['user']),inOrderToUpload.any(),(req,res)=>{
    const bbbody = JSON.parse(req.body.bodyJson);
    console.log(bbbody,req.body,req.params.characteristic,req.files);
    res.send("desde backend")
    // animalController.addAnimal(req.body,req.params.characteristic)
    //     .then(newAnimal=>{
    //         res.send(newAnimal)
    //     })
    //     .catch(e=>console.log(e))
})

router.put('/',(req,res)=>{
    res.send("put a animals")
})

router.delete('/',(req,res)=>{
    res.send("delete a animals")
})

module.exports = router;