const mongoose = require('mongoose');
const User = require('./users');
const Schema = mongoose.Schema
const Message = new Schema({
    id: {
        type: Number,
        required: true,
      },
    created: {
        type: String
    },
    sender:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true 
    }
}); 
module.exports = mongoose.model('Message',Message);