const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const users = require('./routes/users.js');
const token = require('./routes/token.js');
const chat = require('./routes/chat.js');
const { env } = require('custom-env');

const app = express();
env(process.env.NODE_ENV, './config');

console.log(process.env.CONNECTION_STRING);
console.log(process.env.PORT);

mongoose
  .connect(process.env.CONNECTION_STRING + '/chat-app')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB', error));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/Users', users);
app.use('/api/Tokens', token);
app.use('/api/Chats', chat);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
