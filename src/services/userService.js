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

    async verifyToken (token) {
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response
        } catch (error) {
            console.error('JWT verification failed:', error.message);
            throw new Error('Invalid or expired token');
        }
    }

    async authenticate (token) {
        try {
            const response = await this.verifyToken(token);
            if(!response){
                throw new Error('Invalid Token');
            }

            // suppose you had the token but the user account was deleted
            const user = await this.userRepo.findByUsername(response.username);
            if(!user){
                throw new Error('User no longer exists');
            }
            return true;
            
        } catch (error) {
            console.log("Problem in the service layer")
            throw error
        }
    }
}

module.exports = userService;