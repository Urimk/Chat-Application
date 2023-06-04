const express = require('express');
const chatController = require('../controllers/chat');
const userController = require('../controllers/users.js');

const chat = express.Router();

chat.get('/',userController.isLoggedIn,chatController.getAllChatsController);
chat.get('/:id',userController.isLoggedIn,chatController.getChatById);
chat.post('/', userController.isLoggedIn,chatController.createChat);
chat.delete('/:id',userController.isLoggedIn,chatController.deleteChat);
chat.get('/:id/Messages',userController.isLoggedIn,chatController.getMessage);
chat.post('/:id/Messages',userController.isLoggedIn,chatController.createMessage);

module.exports = message;