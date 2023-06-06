Message = require('../models/message.js')
Chat = require('../models/chat.js');
User = require('../models/users.js');


async function getMessagesByChatId(chatId) {
  try {
    const chat = await Chat.findOne({ id: chatId }).populate({
        path: 'messages',
        populate: {
          path: 'user',
          model: User,
          select: 'username',
        },
      });
  
      if (!chat) {
        throw new Error('Chat not found');
      }

      const filteredMessages = chat.messages.map((message) => {
        const {id, created, user, content } = message;
        console.log("hi");
        return {
          id: id,
          created,
          sender: { username: user.username },
          content,
        };
      });
  
      return filteredMessages;
    } catch (error) {
      console.error('Failed to retrieve messages:', error);
      throw error;
    }
  }

  async function postMessage(chatId, senderName, content) {
    try {
      const chat = await Chat.findOne({  id: chatId });
      if (!chat) {
        throw new Error('Chat not found');
      }
      console.log(content);
      const sender = await User.findOne({ username: senderName });
      const created = new Date();
      const message = new Message({
        id: chat.messages.length + 1,
        created: created,
        sender: sender._id,
        content: content,
      });
  
      chat.messages.push(message);
      await chat.save();
  
      const formattedMessage = {
        id: message.id,
        created: message.created,
        sender: {
          username: sender.username,
          displayName: sender.displayName,
          profilePic: sender.profilePic,
        },
        content: message.content,
      };
  
      return formattedMessage;
    } catch (error) {
      console.error('Failed to post message:', error);
      throw error;
    }
  }
  

  module.exports = {getMessagesByChatId, postMessage};
