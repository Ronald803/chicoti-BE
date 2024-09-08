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
    const animals = await AnimalModel.find(filter).sort({ createdAt: -1 });
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
    const updatedAnimal = await AnimalModel.findByIdAndUpdate(id,body,{
        new: true,
        runValidators: true
    });
    if(!updatedAnimal){
        throw new Error('Animal not found')
    }
    return updatedAnimal
}
module.exports =    {
                        addAnimalToDB,
                        listAnimals,
                        saveImageToGoogleDrive,
                        updateAnimal
                    }