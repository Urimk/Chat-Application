
userService = require('../services/users.js')

const createUser = async(req,res) =>{
    res.json(await userService.createUser(req.body.username,req.body.password,
        req.body.displayName,req.body.profilePic));
}

const getUserByUserNamePassword = async(req,res) => {
    const user = await userService.getUserByUserNamePassword(req.body.username,req.body.password)
    if(!user){
        return res.status(404).json({ errors: ['user was not found']})
    }
    res.json(user)
}

module.exports = {
    createUser,
    getUserByUserNamePassword
};