const userModel = require('../models/userModel.js')
const transactionModel = require('../models/transactionModel.js')
const mongoose = require('mongoose')

const transfer = async(req,res)=>{
    const session  = await mongoose.startSession();
    session.startTransaction();
    try{
        const {senderId,receiverId,amt} = req.body;
        const sender = await userModel.findById(senderId).session(session);
        if(!sender){
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({message:"user not found"});
        }
        if(amt > sender.balance){
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({message:"insufficient balance"})
        }
        await userModel.findByIdAndUpdate(sender.id,{$inc:{balance: -amt}},{new:true}).session(session)
        await userModel.findByIdAndUpdate(receiverId,{$inc:{balance:amt}},{new:true}).session(session)

        const date = new Date();
        const currentData = date.toLocaleDateString();
        const hour = date.getHours();
        const min = date.getMinutes();
        const time = `${hour}:${min}`;

        const transaction = await transactionModel.create({senderId:senderId,receiverId:receiverId,amount:amt,time:time,date:currentData})

        await session.commitTransaction();
        session.endSession();
        return res.status(200).json({message:"transaction successful",transaction:transaction});
    }
    catch(err){
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({message: err.message});
    }
}   


module.exports = {transfer}