const userService = require('../services/userService');
const userServ = new userService;

const signup = async (req,res) => {
    try {
        const { username , password } = {...(req.body)};
        const user = await userServ.signup({username,password});
        return res.status(201).json({
            data:user,
            success : true,
            message : "signup completed",
            err : {}
        })

    } catch (error) {
        return res.status(501).json({
            data:{},
            success:false,
            message : "Could not signup!",
            err : error
        })
    }
}

const login = async (req,res) => {
    try {
        const { username , password } = {...(req.body)};
        const user = await userServ.login(username,password);
        return res.status(201).json({
            data:user,
            success : true,
            message : "Login completed successfully",
            err : {}
        })

    } catch (error) {
        return res.status(501).json({
            data:{},
            success:false,
            message : "Could not login!",
            err : error
        })
    }
}

module.exports = {
    signup,
    login
}