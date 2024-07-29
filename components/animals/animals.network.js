const express           = require('express');
const router            = express.Router();
const animalController  = require('./animals.controller');
const { validateJWT }   = require('../../middlewares/validateJWT');
const multer            = require('multer');
const response          = require('../../network/response');
const path              = require('path')
//const storage = multer.diskStorage({
//    destination: function (req,file,cb){
//        cb(null,'components/animals/uploads/');
//    },
//    filename: function (req,file,cb){
//        const fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
//        cb(null, fileName )
//        req.fileName = fileName
//    }
//})
//const upload = multer({ storage: storage})
const upload = multer()

router.get('/',(req,res)=>{
    animalController.getAnimals(req.query)
        .then(animals=>{
            response.success(req,res,animals.length,animals,200)
        })
        .catch(e=>{
            response.error(req,res,e,400)
        })
});

router.post('/:characteristic',validateJWT(['everybody']),upload.single('image'),(req,res)=>{
    try {
        const bbbody = JSON.parse(req.body.bodyJson);
        animalController.addAnimal(bbbody,req.params.characteristic,req.user.name,req.file)
            .then(newAnimal=>{response.success(req,res,"Mascota registrada correctamente",newAnimal,200)})
            .catch(e=>{response.error(req,res,e,400)})
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al subir el archivo');
    }
})

router.put('/notification/',validateJWT(['everybody']),(req,res)=>{
    animalController.notificateInfoAboutAnimal(req.user,req.body)
        .then(msg=>{response.success(req,res,"Notificación exitosa",msg,200)})
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