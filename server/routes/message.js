import messageController from '../controllers/message';
import express from 'express';

const massege = express.Router();

massege.post('/',messageController.createMassage);
massege.get('/',messageController.getMessageById);

export default massege;