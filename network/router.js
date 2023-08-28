const animals   = require('../components/animals/animals.network')
const users     = require('../components/users/users.network')

const routes = function(server){
    server.use('/api/animals',animals);
    server.use('/api/users',users)
}

module.exports = routes;
