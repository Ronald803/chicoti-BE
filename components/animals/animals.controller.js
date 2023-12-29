const animalStore       = require('./animals.store');

function addAnimal(infoAnimal,characteristic){
    return new Promise(async (resolve,reject)=>{
        const {name,human,age,species,breed,color,sterilized,sterilizedCode,other,date,place,reward} = infoAnimal;
        const newAnimal = {name,human,age,species,breed,color,sterilized,sterilizedCode,other,date,place,reward,characteristic}
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