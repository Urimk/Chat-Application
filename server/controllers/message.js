
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

function printError(error) {
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

const getMessageById = async(req,res) => {
    const mes = await messageService.getMessageById(req.params.id)
    if(!mes){
        return res.status(404).json({ errors: ['message was not found']})
    }
    res.json(mes)
}

module.exports = {
    createMassage,
    getMessagesByChatId,
    postMessage
};