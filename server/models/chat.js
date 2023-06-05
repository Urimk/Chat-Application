const mongoose = require('mongoose');
const User = require('./users');
const Massage = require('./message');

const Schema = mongoose.Schema;
const ChatSchema = new Schema({
  users: {
    type: [],
    required: true
  },
  massages: {
    type: [],
    required: true
  },
});

module.exports = mongoose.model('Chat', ChatSchema);
