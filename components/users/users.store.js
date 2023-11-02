const UserModel = require('./users.model');

async function addUserToDB(user){
    const newUser   = new UserModel(user);
    const userSaved = newUser.save()
    return userSaved
}

async function listUsers(filter){
    const users = await UserModel.find(filter)
    return users
}

module.exports = {addUserToDB,listUsers}