const animals   = require('../components/animals/animals.network')
const users     = require('../components/users/users.network')
const auth      = require('../components/auth/auth.network')

const routes = function(server){
    server.use('/api/animals',animals);
    server.use('/api/users',users);
    server.use('/api/auth',auth)
}

module.exports = routes;
