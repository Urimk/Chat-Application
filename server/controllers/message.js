import {messageService} from '../services/message'

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

export default {
    createMassage,
    getMessageById
};