const animalStore       = require('./animals.store');

function addAnimal(infoAnimal,characteristic){
    return new Promise(async (resolve,reject)=>{
        const {name,human,age,species,breed,color,sterilized,sterilizedCode,other,date,place,reward} = infoAnimal;
        const newAnimal = {name,human,age,species,breed,color,sterilized,sterilizedCode,other,date,place,reward,characteristic}
        const newAnimalSaved = await animalStore.addAnimalToDB(newAnimal)
        resolve(newAnimalSaved)
    })
}

function getAnimals(){
    return new Promise((resolve,reject)=>{
        resolve({msg: "getAnimals desde controller"})
    })
}

module.exports = {addAnimal,getAnimals}