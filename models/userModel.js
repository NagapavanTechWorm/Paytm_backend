const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    balance:{
        type:Number
    }
})


const userModel = mongoose.model("users",userSchema);

module.exports = userModel;