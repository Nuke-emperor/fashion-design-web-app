
const mongoose = require('mongoose')

const DBSchema = mongoose.Schema

const UserSchema = new DBSchema({
    username: {
        type: String,
        required:true
    },
    Email:{
    type: String,
    required: true 
    },

    Password: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()  
    }
})

mongoose.model('user', UserSchema)