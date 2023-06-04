User = require('../models/users.js')

const createUser = async (username,password,displayName,profilePic) =>{
    const user = new User({username: username, password: password, displayName: displayName, profilePic: profilePic});
    return await user.save();
}

const getUserByUserName = async(username) => {
    let user = await User.find({username: username});
    if(user == {})
    return null
    return{
        username: user.username,
        displayName: user.displayName,
        profilePic: user.profilePic
    }
}



module.exports = {createUser, getUserByUserName};