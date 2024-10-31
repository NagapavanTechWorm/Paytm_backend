const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel')

const Auth = async(req,res,next)=>{
    try{
        const Paths = ['/user/signin','/user/signup'];
        if(Paths.includes(req.path)){
            return next();
        }
        const auth_string = req.headers.authorization;
        const token = auth_string.split(' ')[1];
        const {email} = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({message:"user not authorized"});
        }
        req.user = user;
        console.log(req.user);
        return next();
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
}

module.exports = Auth;