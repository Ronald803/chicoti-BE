const animalStore       = require('./animals.store');
const userStore         = require('../users/users.store');
const smtpServer        = require('../../services/smtp/smtpServer');

function addAnimal(infoAnimal,characteristic,humanName,files){
    return new Promise(async (resolve,reject)=>{
        const idImage = await animalStore.saveImageToGoogleDrive(files[0]);
        //const urlImage = `https://drive.google.com/uc?export=view&id=${idImage}`;
        const urlImage = `https://drive.google.com/file/d/${idImage}/view`
        const {petName,age,species,gender,breed,color,sterilized,sterilizedCode,other,date,place,cellphones} = infoAnimal;
        const newAnimal = {
                            petName,
                            age,
                            species,
                            breed,
                            color,
                            sterilized,
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
                            photoUrlOfficial: " "
                        }
        console.log(newAnimal);
        const newAnimalSaved = await animalStore.addAnimalToDB(newAnimal);
        // ______________________________ Notifying admins that a new animal is added to the database _______________________________
        const admins = await userStore.listUsers({'rol':'admin'});
        admins.map(async (admin)=>{
            const subject = "Nueva fotografía"
            const body = `
                            <h1>Nuevo animalito registrado</h1>
                            <p>Ingresa a la app y ayuda a corregir el url de la fotografía</p>
                            <p>${newAnimal.petName} fue ${newAnimal.characteristic}</p>
                            <a href="${urlImage}">Fotografía</a>
                        `
            await smtpServer.mailer(admin.email,subject,body)
        })
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