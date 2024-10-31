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
    }
})

const TransModel = mongoose.Model("transactions",transactionSchema);

module.exports = TransModel;