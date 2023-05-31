import userController from './controlers/users'
import express from 'express';
let router = express.Router();

router.route('/')
.post(userController.createUser)

module.exports = router;