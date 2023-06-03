import mongoose from 'mongoose'
import User from './users'
import Message from './message'
const Schema = mongoose.Schema
const Chat = new Schema({
    id: {
        type: 	integer(Int32),
    },
    users: {
        type: [User],
        required: true
    },
    messages:{
        type: [Message],
        required: true
    }
}); 
module.exports = mongoose.model('Chat',Chat);