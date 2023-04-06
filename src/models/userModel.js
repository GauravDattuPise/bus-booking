const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({

    firstName: {
        type:String,
        required: true,
        trim:true
    },
    lastName: {
        type:String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        trim:true
    },
    phone: {
        type: Number,
        required: true,
        trim:true
    },
    password: {
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        // required: true
    }
},{timeStamps:true})

module.exports = mongoose.model('user', userSchema)