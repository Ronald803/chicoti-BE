const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cellphoneOne: {
        type: Number,
        required: true
    },
    cellphoneTwo: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    }

})

const model = mongoose.model('User',mySchema)
module.exports = model;