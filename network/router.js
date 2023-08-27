const animals = require('../components/animals/animals.network')

const routes = function(server){
    server.use('/api/animals',animals);
}

module.exports = routes;
