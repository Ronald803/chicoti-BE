const animalStore       = require('./animals.store');
const userStore         = require('../users/users.store');
const smtpServer        = require('../../services/smtp/smtpServer');
const { storeImageCloudinary, deleteLocalImageCopy } = require('./utilities');
require('dotenv').config()

function addAnimal(infoAnimal,characteristic,humanName,file){
    return new Promise(async (resolve,reject)=>{
        const urlImage = await storeImageCloudinary(file)
        if(!urlImage){ reject("error") }
        //deleteLocalImageCopy(file)
        const {petName,age,species,gender,breed,color,sterilized,sterilizedCode,other,date,place,cellphones} = infoAnimal;
        const newAnimal = {
                            petName,
                            age,
                            species,
                            breed,
                            color,
                            sterilized:false,
                            sterilizedCode,
                            gender,
                            other,
                            date,
                            place,
                            reward:0,
                            characteristic,
                            humanName,
                            cellphones,
                            photoUrl:urlImage,
                            photoUrlOfficial: urlImage
                        }
        const newAnimalSaved = await animalStore.addAnimalToDB(newAnimal);
        resolve(newAnimalSaved)
    })
}

function notificateInfoAboutAnimal(user,animal){
    return new Promise( async(resolve,reject)=>{
        const humanOwnerName = await userStore.listUsers({'name':animal.humanName});
        const subject = `Tenemos noticias de ${animal.name}`
        const body = `
                        <h1>Contactate a la brevedad posible con ${user.name}</h1>
                        <p>Este es su número celular ${user.cellphone}</p>
                        <p>Este es su correo electrónico ${user.email}</p>
                        
                    `
        await smtpServer.mailer(humanOwnerName[0].email,subject,body)
        resolve({"msg":"Ya se notificó al humano"})
    })
}

function getAnimals(filter){
    return new Promise((resolve,reject)=>{
        resolve(animalStore.listAnimals(filter))
    })
}

function updateAnimal(id,body){
    return new Promise( async(resolve,reject)=>{
        if(!id || !body){
            reject ("Datos incompletos")
            return false
        }
        const updated =  await animalStore.updateAnimal(id,body)
        resolve (updated)
    })
}

module.exports =    {
                        addAnimal,
                        getAnimals,
                        updateAnimal,
                        notificateInfoAboutAnimal
                    }

// https://drive.usercontent.google.com/download?id=1Pg2vOTI5rV4c88owMnuMfjie69osz8oI&export=view&authuser=0

//https://drive.google.com/file/d/19mu6L-F0xCSFgZOvgMpcwnnSniXc5DSq/view?usp=drive_link
//https://lh3.googleusercontent.com/drive-viewer/AEYmBYQLOiZonzgsm332HpIgcekbrmhQcDTkMT6QDgfkrDwXHruJQjqCwHSoBQj1ORSbOlxo7u8ny8J3JMcP6hbNMYQcj0_-=s1600