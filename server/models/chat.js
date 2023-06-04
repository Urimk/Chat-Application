const mongoose = require('mongoose');
const User = require('./users');
const Massage = require('./message');

const Schema = mongoose.Schema;
const ChatSchema = new Schema({
  users: {
    type: [User],
    required: true,
  },
  massages: {
    type: [Massage],
    required: true,
  },
});

module.exports = mongoose.model('Chat', ChatSchema);
