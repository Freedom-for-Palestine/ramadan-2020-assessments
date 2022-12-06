var User = require("./../models/user.model");

module.exports = {
  // ! create a new user  in database
  createUser: async (userData) => {
    // if user found before
    const userObj = await User.findOne({ author_email: userData.author_email });
    if (userObj) {
      // it will return if user already exists
      return userObj;
    }
    // if user not found before
    // will create new user
    let newUser = new User(userData);
    // and save it in database by save() and because save() return promise it will return new user data
    return await newUser.save();
  },
  
  // ! return all users from database
  getAllUsers: () => {
    return User.find({});
  },
};
