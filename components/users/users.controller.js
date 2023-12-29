const userStore     = require('./users.store');
const bcryptsjs     = require('bcryptjs');

function addUsers(userData){
    return new Promise(async (resolve,reject)=>{
        const {password,name,cellphoneOne,cellphoneTwo,email,pets} = userData;
        // _____________________ encrypting password _______________
        const salt      = bcryptsjs.genSaltSync();
        const encryptPassword = bcryptsjs.hashSync(password,salt);
        // _________________________________________________________
        const newUser = {name,password:encryptPassword,cellphoneOne,cellphoneTwo,email,pets}
        const userSaved = await userStore.addUserToDB(newUser)
        resolve(userSaved)
    })
}

function getUsers(filter){
    return new Promise((resolve,reject)=>{
        resolve(userStore.listUsers(filter))
    })
}

module.exports = {addUsers,getUsers}