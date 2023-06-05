Chat = require('../models/chat');
User = require('../models/users');

async function createChat(user ,username) {
  try {
    // Assuming you have a User model and want to create a chat between the current user and another user
    const otherUser = await User.findOne({ username: username });
    if (!otherUser) {
      throw new Error('User not found');
    }

    const lastChat = await Chat.findOne().sort({ id: -1 }).limit(1);
    let nextId = 1;
    if (lastChat) {
      nextId = lastChat.id + 1;
    }

    const newChat = new Chat({
      id: nextId,
      users: [otherUser, user], // Add the current user to the chat
      messages: [], // Initialize messages as an empty array
    });

    const savedChat = await newChat.save();
// Perform the filtering
const { id, users } = savedChat;
const filteredChat = { id, users: users.find(u => u._id.toString() !== user._id.toString()) };


    return savedChat;
  } catch (error) {
    throw new Error('Failed to create chat');
  }
}

async function getAllChats() {
    try {
      const chats = await Chat.find()
        .populate('users', 'username') // Populate the 'users' field in Chat with only 'username'
        .populate({
          path: 'messages',
          options: { sort: { id: -1 }, limit: 1 }, // Sort messages in descending order of id and limit to 1
          populate: { path: 'user', select: 'username' }, // Populate the 'user' field in Message with only 'username'
        })
        .exec();
  
      // Extract the necessary data for each chat
      const formattedChats = chats.map((chat) => {
        const otherUser = chat.users.find((u) => u.username !== user.username);
        const lastMessage = chat.messages[0];
  
        return {
          id: chat.id,
          otherUser,
          lastMessage,
        };
      });
  
      return formattedChats;
    } catch (error) {
      throw new Error('Failed to retrieve chats');
    }
  }

  async function getChatById(id) {
    try {
      const chat = await Chat.findById(id);
  
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
  getAllChats,
  getChatById
};
