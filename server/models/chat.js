const mongoose = require('mongoose');
const User = require('./users');
const Message = require('./message');

const Schema = mongoose.Schema;
const ChatSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  users: {
    type: [],
    required: true
  },
  messages: {
    type: [],
    required: true
  },
});

module.exports = mongoose.model('Chat', ChatSchema);
