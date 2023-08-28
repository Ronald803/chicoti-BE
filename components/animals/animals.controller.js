

function addAnimal(){
    return new Promise((resolve,reject)=>{
        resolve({msg: "addAnimal desde controller"})
    })
}

function getAnimals(){
    return new Promise((resolve,reject)=>{
        resolve({msg: "getAnimals desde controller"})
    })
}

module.exports = {addAnimal,getAnimals}