Massage = require('../models/message.js')

const createMassage = async (created,sender,content) =>{
    const mes = new Massage({created: created,sender: sender,content: content});
    return await mes.save();
}

const getMassageById = async(id) => {
    let mes = await Massage.find({"_id": ObjectId(id) });
    if(mes == {})
    return null
    return mes;
}



module.exports = {createMassage, getMassageById};
