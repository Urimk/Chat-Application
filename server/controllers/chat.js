
chatService = require('../services/chat');
userService = require('../services/users');

function printError(res, error) {
  if (error.statusCode === 500) {
    res.status(500).json({ error: 'Internal Server Error' });
  } else if (error.statusCode === 401) {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    res.status(404).json({ error: error.message });
  }
}


// Create a new chat
async function createChat(req, res) {
  try {
    const chatData = req.body;
    const user = await userService.getUserByUserName(req.username);

    const createdChat = await chatService.createChat(user, chatData.username);
    res.status(200).json(createdChat);
  } catch (error) {
    printError(res, error);
  }
}


// Get all chats
async function getAllChatsController(req, res) {
  try {
    const user = req.headers.user;
    const chats = await chatService.getAllChats(user);
    res.json(chats);
  } catch (error) {
    if (error.statusCode === 404) {
      res.sendStatus(404);
    }
    printError(res, error);
  }
}

// Get a chat by its ID
async function getChatById(req, res) {
  const { id } = req.params;
  
    try {
      const chat = await chatService.getChatById(id);
      res.json(chat);
    } catch (error) {
        console.log(error);
        printError(res, error);
    }
  }

// Update a chat
async function updateChat(req, res) {
  try {
    const chatId = req.params.id;
    const updatedData = req.body;
    const updatedChat = await chatService.updateChat(chatId, updatedData);
    if (!updatedChat) {
      return res.status(404).json({ error: 'Chat not found' });
    }
    res.json(updatedChat);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update chat' });
  }
}

// Delete a chat
async function deleteChat(req, res) {
  try {
    const chatId = req.params.id;
    const deletedChat = await chatService.deleteChat(chatId);
    if (!deletedChat) {
      return res.status(404).json({ error: 'Chat not found' });
    }
    res.json(deletedChat);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete chat' });
  }
}



module.exports = {
  createChat,
  getAllChatsController,
  getChatById,
  updateChat,
  deleteChat, }