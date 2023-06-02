import { Int32 } from 'bson';
import mongoose from 'mongoose'
import User from './users'
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