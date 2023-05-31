import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import cors from 'cors'
import users from "./routes/users"
import costomENV from 'custom-env'
costomENV.env(process.env.NODE_ENV,'./config')
console.log(process.env.CONNECTION_STRING)
console.log(process.env.PORT)

mongoose.connect(process.env.CONNECTION_STRING,
    {
        userNewUrlParser: true,
        userUnifiedTopology: true
    })
app.use('/users', users);
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())




app.listen(process.env.PORT)