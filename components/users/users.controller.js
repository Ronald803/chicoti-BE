const userStore     = require('./users.store');
const bcryptsjs     = require('bcryptjs');
const jwt           = require('jsonwebtoken')

function addUsers(userData){
    return new Promise(async (resolve,reject)=>{
        const {password,name,cellphone,email} = userData;
        // _____________________ encrypting password ____________________________
        const salt      = bcryptsjs.genSaltSync();
        const encryptPassword = bcryptsjs.hashSync(password,salt);
        // _____________________ saving in database _____________________________
        const newUser = {name,password:encryptPassword,cellphone,email,pets:[],rol:"user",characteristic:"active"}
        const userSaved = await userStore.addUserToDB(newUser)
        // _____________________ generating jwtoken _____________________________
        const payload = {uid: userSaved._id}
        const token = jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{expiresIn: '4h'})
        resolve({
            name: userSaved.name,
            token,
            rol: userSaved.rol,
            cellphone: userSaved.cellphone,
            email: userSaved.email
        })
    })
}

function getUsers(filter){
    return new Promise((resolve,reject)=>{
        resolve(userStore.listUsers(filter))
    })
}

module.exports = {addUsers,getUsers}