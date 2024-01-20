const animalStore       = require('./animals.store');

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
        const newAnimalSaved = await animalStore.addAnimalToDB(newAnimal)
        resolve(newAnimalSaved)
    })
}

function getAnimals(filter){
    return new Promise((resolve,reject)=>{
        resolve(animalStore.listAnimals(filter))
    })
}

module.exports = {addAnimal,getAnimals}

// https://drive.usercontent.google.com/download?id=1Pg2vOTI5rV4c88owMnuMfjie69osz8oI&export=view&authuser=0

//https://drive.google.com/file/d/19mu6L-F0xCSFgZOvgMpcwnnSniXc5DSq/view?usp=drive_link
//https://lh3.googleusercontent.com/drive-viewer/AEYmBYQLOiZonzgsm332HpIgcekbrmhQcDTkMT6QDgfkrDwXHruJQjqCwHSoBQj1ORSbOlxo7u8ny8J3JMcP6hbNMYQcj0_-=s1600