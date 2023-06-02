import mongoose from 'mongoose'
import User from './users'
import Massage from './message'
const Schema = mongoose.Schema
const Chat = new Schema({
    id: {
        type: 	integer(Int32),
    },
    users: {
        type: [User],
        required: true
    },
    massages:{
        type: [Massage],
        required: true
    }
}); 
module.exports = mongoose.model('Chat',Chat);