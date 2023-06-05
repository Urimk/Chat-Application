
messageService = require('../services/message.js')

function printError(req,res,error) {
    if (error.statusCode === 500) {
        res.status(500).json({ error: 'Internal Server Error' });
    } else if (error.statusCode === 401) {
    res.status(401).json({ error: 'Unauthorized' });
    } else {
    res.status(404).json({ error: error.message });
    }
}

const createMassage = async(req,res) =>{
    res.json(await messageService.createMassage(req.body.created,req.body.sender,
        req.body.content));
}

async function getMessagesByChatId(req, res) {
    const { chatId } = req.params;
  
    try {
      const messages = await MessageService.getMessagesByChatId(chatId);
      res.json(messages);
    } catch (error) {
        printError(req,res,error);         
    }
}

async function postMessage(req, res) {
    const { chatId, sender, content } = req.body;
  
    try {
      const message = await MessageService.postMessage(chatId, sender, content);
      res.json(message);
    } catch (error) {
        printError(req, res,error);         
    }
  }

module.exports = {
    createMassage,
    getMessagesByChatId,
    postMessage
};