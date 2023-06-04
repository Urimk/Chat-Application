const Chat = require('../models/chat.js');

const createChat = async (user1, user2) => {
  const chat = new Chat({ users: [user1, user2], messages: [] });
  return await chat.save();
};

const getChatsByUser = async (username) => {
  try {
    const chats = await Chat.find({
      'users.username': username,
    });

    return chats;
  } catch (error) {
    console.error('Failed to get chats:', error);
    throw error;
  }
};

const deleteChat = async (id) => {
  try {
    const deletedChat = await Chat.findByIdAndRemove(id);
    return deletedChat;
  } catch (error) {
    console.error('Failed to delete chat:', error);
    throw error;
  }
};

module.exports = {
  createChat,
  getChatsByUser,
  deleteChat,
};
