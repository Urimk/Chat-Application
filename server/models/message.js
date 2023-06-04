const mongoose = require('mongoose');
const User = require('./users');
const Schema = mongoose.Schema
const Massage = new Schema({
    created: {
        type: String($date-time)
    },
    sender:{
        type: User
    },
    content: {
        type: String,
        required: true 
    }
}); 
module.exports = mongoose.model('Massage',Massage);