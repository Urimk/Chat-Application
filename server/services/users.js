import User from './models/users'

const createUser = async (username,password,displayName,profilePic) =>{
    const user = new User({username: username, password: password, displayName: displayName, profilePic: profilePic});
    return await user.save();
}

const getUserByUserNamePassword = async(username,password) => {
    return await User.find({username: username, password: password});
}

const getUserByUserName = async(username) => {
    return await User.find({username: username});
}



module.exports = {createUser, getUserByUserNamePassword, getUserByUserName}