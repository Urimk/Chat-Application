const express = require('express');
const messageController = require('../controllers/message');

const message = express.Router();

message.post('/', messageController.createMassage);
message.get('/', messageController.getMessageById);

module.exports = message;
