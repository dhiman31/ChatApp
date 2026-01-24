const { JWT_KEY, EXP_IN } = require("../config/serverConfig");
const userRepository = require("../repository/userRepository");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class userService {
    constructor() {
        this.userRepo = new userRepository
    }

    async signup(data){
        try {
            const user = await this.userRepo.signup(data.username,data.password);
            return user;

        } catch (error) {
            console.log(error);
            throw new error ({
                message : 'Error in user Service'
            })
        }
    }

    async login(username, password) {
        try {
            const user = await this.userRepo.findByUsername(username);
            if(!user){
                console.log('No user found!!')
                throw new error({
                    message : 'No user found'
                })
            }
            const response = await bcrypt.compare(password,user.password);
            if(!response){
                throw new error('Invalid Password!')
            }
            
            const token = jwt.sign({id:user.id,username:user.username} , JWT_KEY , {expiresIn : EXP_IN});
            return token;

        } catch (error) {
            console.log(error);
            throw new error ({
                message : 'Error in user Repository'
            })
        }
    }

}

module.exports = userService;