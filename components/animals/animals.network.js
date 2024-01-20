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

router.post('/:characteristic',validateJWT(['everybody']),inOrderToUpload.any(),(req,res)=>{
    const {files} = req;
    const bbbody = JSON.parse(req.body.bodyJson);
    animalController.addAnimal(bbbody,req.params.characteristic,req.user.name,files)
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