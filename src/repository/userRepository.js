const User = require('../models/User');

class userRepository {

    async signup(username , password) {
        try {
            const user = await User.create({
                username,
                password
            });
            return user;
        } catch (error) {
            console.log(error);
            throw new error ({
                message : 'Error in user Repository'
            })
        }
    }

    async findByUsername (username) {
        try {
            const user = await User.findOne({username});
            return user;
        } catch (error) {
            console.log("No user exists with this username")
            throw new error({
                message : 'User not exists'
            })
        }
    }
}

module.exports = userRepository