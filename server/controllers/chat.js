const { chatService } = require('../services/chat');
const { userService } = require('../services/users');

const createChat = async (req, res) => {
  let currentUser; // need to get by the token
  res.json(
    await chatService.createChat(
      userService.getUserByUserName(currentUser.username),
      userService.getUserByUserName(req.body.username)
    )
  );
};

const getChats = async (req, res) => {
  let currentUser;
  const chats = await chatService.getChatsByUser(currentUser.username);
  if (!chats) {
    return res.status(404).json({ errors: ['message was not found'] });
  }
  res.json(chats);
};

module.exports = {
  createChat,
  getChats,
};
