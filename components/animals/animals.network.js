const express           = require('express');
const router            = express.Router();
const animalController  = require('./animals.controller');
const { validateJWT }   = require('../../middlewares/validateJWT');
const multer            = require('multer');
const inOrderToUpload   = multer(); 
const response          = require('../../network/response');


router.get('/',(req,res)=>{
    animalController.getAnimals(req.query)
        .then(animals=>{
            response.success(req,res,animals.length,animals,200)
        })
        .catch(e=>{
            response.error(req,res,e,400)
        })
});

router.post('/:characteristic',validateJWT(['everybody']),inOrderToUpload.any(),(req,res)=>{
    const {files} = req;
    const bbbody = JSON.parse(req.body.bodyJson);
    animalController.addAnimal(bbbody,req.params.characteristic,req.user.name,files)
        .then(newAnimal=>{response.success(req,res,"Mascota registrada correctamente",newAnimal,200)})
        .catch(e=>{response.error(req,res,e,400)})
})

router.put('/:id',validateJWT(['admin']),(req,res)=>{
    animalController.updateAnimal(req.params.id,req.body)
        .then( updatedAnimal=>{
            response.success(req,res,"URL registrado exitosamente",updatedAnimal,200)
        })
        .catch(e=>{response.error(req,res,e,400)})
})

router.delete('/',(req,res)=>{
    res.send("delete a animals")
})

module.exports = router;