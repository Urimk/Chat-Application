import Message from '../models/message.js'

const createMassage = async (created,sender,content) =>{
    const mes = new Message({created: created,sender: sender,content: content});
    return await mes.save();
}

const getMassageById = async(id) => {
    let mes = await Message.find({"_id": ObjectId(id) });
    if(mes == {})
    return null
    return mes;
}



export const messageService = () => {
    return {createMassage, getMassageById};
  };