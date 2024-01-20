const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    characteristic:{
        type: String,
        required: true
    },
    petName: {
        type: String,
        required: true
    },
    humanName: {
        type: String,
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
    gender:{
        type: String,
        required: true
    },
    age: {
        type: Number,
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
    },
    cellphones: {
        type: Array,
        required: true
    },
    photoUrl:{
        type: String,
        required: true
    },
    photoUrlOfficial:{
        type: String,
        required: true
    }
})

const model = mongoose.model('Animal',mySchema)
module.exports = model;