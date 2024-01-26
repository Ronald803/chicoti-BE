const AnimalModel   = require('./animals.model');
const {google}      = require('googleapis');
const path          = require('path');
const stream        = require('stream');

async function addAnimalToDB(animal){
    const newAnimal = new AnimalModel(animal);
    const animalSaved = newAnimal.save();
    return animalSaved;
}

async function listAnimals(filter){
    const animals = await AnimalModel.find(filter);
    return animals;
}

async function saveImageToGoogleDrive(file){
    const KEYFILEPATH = path.join(__dirname + "/credentials.json")
    const SCOPES = ['https://www.googleapis.com/auth/drive']
    const auth = new google.auth.GoogleAuth({
        keyFile: KEYFILEPATH,
        scopes: SCOPES
    })
    const uploadFile = async (fileObject)=>{
        const bufferStream = new stream.PassThrough();
        bufferStream.end(fileObject.buffer);
        const {data} = await google.drive({
            version: 'v3',
            auth: auth
        }).files.create({
            media:{
                mimeType: fileObject.mimeType,
                body: bufferStream
            },
            requestBody:{
                name: fileObject.originalname,
                parents: ['13YCbttCTQHU5RVrOiqUF042cb6eyWNZJ']
            },
            fields: "id,name"
        })
        return data.id
    }
    const id = await uploadFile(file);
    return id;
}
async function updateAnimal(id,body){
    const foundAnimal = await AnimalModel.findById(id);
    foundAnimal.photoUrlOfficial = body.photoUrlOfficial;
    const updatedAnimal = await foundAnimal.save();
    return updatedAnimal;
}
module.exports =    {
                        addAnimalToDB,
                        listAnimals,
                        saveImageToGoogleDrive,
                        updateAnimal
                    }