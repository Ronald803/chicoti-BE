const AnimalModel = require('./animals.model');

async function addAnimalToDB(animal){
    const newAnimal = new AnimalModel(animal);
    const animalSaved = newAnimal.save();
    return animalSaved;
}

async function listAnimals(filter){
    const animals = await AnimalModel.find(filter);
    return animals;
}

module.exports = {addAnimalToDB,listAnimals}