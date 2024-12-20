const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const userModel = require('../models/userModel.js')
const zod = require('../utils/typeCheck.js')



const getBalance = async(req,res)=>{
    try{
        const id = req.user.id;
        const user = await userModel.findById(id);
        if(!user){ 
            return res.status(400).json({message:"user not found"});
        }
        return res.status(200).json({balance:user.balance});
    }
    catch(error){
        return res.json({message:error.message});
    }
}

const SignUp = async (req,res)=>{
    try{
        const {email,password,username} = req.body;
        if(!email && !password && !username){
            return res.json({message:"please enter all info"})
        }
        const {success,data,error} = zod.signupcheck.safeParse({email,password,username});
        if(!success){
            return res.status(400).json({message:error.message})
        }
        const userExist = await userModel.findOne({email:email})
        if(userExist){
            return res.status(400).json({message:`${email} already exist`});
        }
        const hashPassword = await bcrypt.hash(password,10);

        const bal = Math.floor(Math.random()*100000)


        const newUser = await userModel.create({username:username,email:email,password:hashPassword,balance:bal});
        res.status(200).json({message:newUser})
    }
    catch(error){
        return res.json({message:error.message});
    }
}

const SignIn = async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email && !password){
            return res.status(404).json({message:"please enter all info"})
        }
        const {success,data,error} = zod.signincheck.safeParse({email,password});
        if(!success){
            return res.status(400).json({message:error.message})
        }
        const existuser = await userModel.findOne({email});
        if(!existuser){
            return res.status(400).json({message:"user not found"});
        }
        const status = await bcrypt.compare(password,existuser.password);
        if(!status){
            return res.status(400).json({message:"wrong password"})
        }
        const token = jwt.sign({email},process.env.JWT_SECRET)
        return res.status(200).json({token:token})
    }
    catch(error){
        return res.json({message:error.message});
    }
}

const getMe = async(req,res)=>{
    try{
        const user = await userModel.findById(req.user.id);
        res.status(200).json({message:user});

    }catch(error){
        res.status(500).json({message:error.message});
    }
}


const getAllUser =async(req,res)=>{
    try{
        const meid = req.user.id;
        const users = await userModel.find({_id:{$ne:meid}});
        return res.status(200).json({users:users});
    }
    catch(error){
        return res.status(500).json({message:error.message});
    }
}

const verifyPassword = async(req,res)=>{
    try{
        const {password,id} =  req.body;
        if(!password || !id) return res.status(401).json({message:"data missing"})
        const user =  await userModel.findById(id);
        if(!user) return res.status(401).json({message:"user not found"});
        const status = await bcrypt.compare(password, user.password);
        console.log(status)
        return res.status(200).json({message:status});
    }
    catch(error){
        return res.status(500).json({message:error.message});
    }
}

module.exports = {SignUp,SignIn,getBalance,getMe,getAllUser,verifyPassword}