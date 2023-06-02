// users.js
import userController from '../controllers/users.js';
import express from 'express';

const users = express.Router();

users.post('/',userController.createUser);

export default users;
