Message = require('../models/message.js')
Chat = require('../models/chat');

const createMassage = async (created,sender,content) =>{
    const mes = new Massage({created: created,sender: sender,content: content});
    return await mes.save();
}

async function getMessagesByChatId(chatId) {
  try {
    const chat = await Chat.findById(chatId).populate({
        path: 'messages',
        populate: {
          path: 'user',
          select: 'username',
        },
      });
  
      if (!chat) {
        throw new Error('Chat not found');
      }
  
      const filteredMessages = chat.messages.map((message) => {
        const { _id, created, user, content } = message;
        return {
          id: _id,
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

  async function postMessage(chatId, sender, content) {
    try {
      const chat = await Chat.findById(chatId);
  
      if (!chat) {
        throw new Error('Chat not found');
      }
  
      const message = new Message({
        id: chat.messages.length + 1, // Assign the ID based on the number of existing messages in the chat
        sender,
        content,
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
  

module.exports = {createMassage, getMessagesByChatId,postMessage};
