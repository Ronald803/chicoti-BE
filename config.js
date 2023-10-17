require('dotenv').config();

const config = {
    port: process.env.PORT || 4000,
    dbUrl: process.env.MONGOCNN
}

module.exports = config