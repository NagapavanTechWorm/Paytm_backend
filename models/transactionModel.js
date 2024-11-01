const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    amount:{
        type:Number,
        required: true
    },
    time:{
        type:String,
        required: true
    },
    date:{
        type:String,
        required: true
    }
})

const TransModel = mongoose.model("transactions",transactionSchema);

module.exports = TransModel;