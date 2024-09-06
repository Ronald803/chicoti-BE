const bcryptjs      = require('bcryptjs');
const jwt           = require('jsonwebtoken');
const usersStore    = require('../users/users.store');

function login(email,password){
    return new Promise( async(resolve,reject)=>{
        if(!email || !password){ return reject('Datos incompletos')}
        // ______________________ Checking email exists __________________
        const user = await usersStore.listUsers({email})
        if(user.length<1){return reject('Información incorrecta')}
        // ______________________ Checking user is active ________________
        // ______________________ Checking password is active ____________
        const validPassword = bcryptjs.compareSync(password,user[0].password)
        if(!validPassword){return reject('Información incorrecta')}
        // ______________________ Generating jwtoken _____________________
        const payload = {uid: user[0]._id}
        const token = jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{expiresIn: '4h'})
        resolve({
            name: user[0].name,
            token,
            rol: user[0].rol,
            cellphone: user[0].cellphone,
            email: user[0].email,
        })
    })
}

module.exports = {login}