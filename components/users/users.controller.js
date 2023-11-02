const userStore     = require('./users.store');
const bcryptsjs     = require('bcryptjs');

function addUsers(userData){
    return new Promise(async (resolve,reject)=>{
        const {password,name,cellphoneOne,cellphoneTwo,email} = userData;
        // _____________________ encrypting password _______________
        const salt      = bcryptsjs.genSaltSync();
        const encryptPassword = bcryptsjs.hashSync(password,salt);
        // _________________________________________________________
        const newUser = {name,password:encryptPassword,cellphoneOne,cellphoneTwo,email}
        const userSaved = await userStore.addUserToDB(newUser)
        resolve(userSaved)
    })
}

function getUsers(){
    return new Promise((resolve,reject)=>{
        resolve({msg:"getUser desde controller"})
    })
}

module.exports = {addUsers,getUsers}