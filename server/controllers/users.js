
userService = require('../services/users.js')
jwt = require('jsonwebtoken')

const key = "Life is the biggest adventure ever!!!"

const createUser = async (req, res) => {
    const username = req.body.username;
    const isExists = await userService.getUserByUserName(username);
  
    if (isExists === null ) {
      await userService.createUser(
        req.body.username,
        req.body.password,
        req.body.displayName,
        req.body.profilePic
      );
      res.status(200).json({ message: 'User created successfully' });
    } else {
      res.status(409).json({ message: 'Username already exists' });
    }
  };

const getUserByUserNamePassword = async(req,res) => {
    const user = await userService.checkUser(req.body.username,req.body.password)
    if(!user){
        return res.status(404).json({ errors: ['user was not found']})
    }
    // Generate the token.
    const token = jwt.sign({ username: req.body.username }, key)
    // Return the token to the browser
    res.status(200).json( token );
}

const getUserByUserName = async(req,res) => {
    const user = await userService.getUserByUserName(req.params.username);
    if (user !== null ) {
        res.status(200).json(user);
      } else {
        res.status(404)
      }
}

// Ensure that the user sent a valid token
const isLoggedIn = (req, res, next) => {
    // If the request has an authorization header
    
    if (req.headers.authorization) {
    // Extract the token from that header
    const token = req.headers.authorization.split(" ")[1];
    try {
    // Verify the token is valid
    const data = jwt.verify(token, key);
    // Token validation was successful. Continue to the actual function (index)
    req.username = data.username
    return next()
    } catch (err) {
    return res.status(401).send("Invalid Token");
    }
    }
    else
    return res.status(403).send('Token required');
    }

module.exports = {
    createUser,
    getUserByUserNamePassword,
    isLoggedIn,
    getUserByUserName
};