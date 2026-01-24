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
        console.log("LOGIN BODY:", req.body);
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

const authenticate = async (req,res) => {
    try {

        const authHeader = req.headers.authorization;
        if (!authHeader)
        return res.status(401).json({ msg: "No token provided" });

        const parts = authHeader.split(' ');

        if (parts.length !== 2 || parts[0] !== 'Bearer')
        return res.status(401).json({ msg: "Invalid auth format" });

        const token = parts[1];

        const response = await userServ.authenticate(token);
        return res.status(201).json({
            data:response,
            success : true,
            message : "User is Authenticated and User is valid",
            err : {}
        })

    } catch (error) {
        return res.status(501).json({
            data:{},
            success:false,
            message : "Not authorized!",
            err : error
        })
    }
}

module.exports = {
    signup,
    login,
    authenticate
}