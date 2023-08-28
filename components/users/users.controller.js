

function addUsers(){
    return new Promise((resolve,reject)=>{
        resolve({msg: "addUser desde controller"})
    })
}

function getUsers(){
    return new Promise((resolve,reject)=>{
        resolve({msg:"getUser desde controller"})
    })
}

module.exports = {addUsers,getUsers}