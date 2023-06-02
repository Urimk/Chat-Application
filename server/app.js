import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import users from './routes/users.js';
import { env } from 'custom-env';

const app = express();
env(process.env.NODE_ENV, './config');

console.log(process.env.CONNECTION_STRING);
console.log(process.env.PORT);

mongoose
  .connect(process.env.CONNECTION_STRING + '/chat-app')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB', error));

app.use('/api/Users', users);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Route handler for the root path ("/")
app.get('/', (req, res) => {
  console.log('One user connected');
  res.send('Welcome to the chat app!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
