Chat = require('../models/chat.js');
User = require('../models/users.js');

async function createChat(user ,username) {
  try {
    const otherUser = await User.findOne({ username: username }, 'username displayName profilePic');
    if (!otherUser) {
      throw new Error('User not found');
    }
    if (user.username === otherUser.username) {
      const error = new Error("Thou shalt not talk with thyself");
      error.statusCode = 400;
      throw error;
    }

    const newChat = new Chat({
      users: [otherUser, user],
      messages: [],
    });
    const savedChat = await newChat.save();
    const id = savedChat._id;
    const users = savedChat.users
    const filteredChat = { id, users };
    return filteredChat;
  } catch (error) {
    throw new Error(error);
  }
}

async function getAllChats(user) {
  try {
    const chats = await Chat.find({
      users: {
        $elemMatch: {
          username: user
        }
      }
    })
      .populate('users', 'username')
      .populate({
        path: 'messages',
        options: { sort: { id: -1 }, limit: 1 },
        populate: { path: 'user', select: 'username' }, 
      })
      .exec();
    const formattedChats = chats.map((chat) => {
      const otherUser = chat.users.find((u) => u.username !== user.username);
      const lastMessage = chat.messages.length > 0 ? chat.messages.length[0] : null;

      return {
        id: chat.id,
        user: otherUser,
        lastMessage,
      };
    });
    return formattedChats;
  } catch (error) {
    throw new Error(error);
  }
}


  async function getChatById(id) {
    try {
      const chat = await Chat.findOne({ id });
  
      if (!chat) {
        throw new Error('Chat not found');
      }
  
      return chat;
    } catch (error) {
      throw new Error('Failed to retrieve chat');
    }
  }

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
    const deletedChat = await Chat.findOneAndRemove({ id: id });
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
  getAllChats,
  getChatById
};
