const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    characteristic:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    human: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    species:{
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    color: {
        type: Array,
        required: true
    },
    sterilized: {
        type: Boolean,
        required: true
    },
    sterilizedCode: {
        type: String,
        required: true
    },
    other: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    reward: {
        type: Number,
        required: true
    }
})

const model = mongoose.model('Animal',mySchema)
module.exports = model;