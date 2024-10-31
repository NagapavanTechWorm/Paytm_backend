const mongoose = require('mongoose');

const ConnectDB = async()=>{
    try{
        const res = await mongoose.connect(process.env.MONGODB_STRING);
        console.log(`Database connected: ${res.connection.host}`);
    }
    catch(error){
        console.error(`Couldn't connect to MongoDB: ${error.message}`);
    }
}

module.exports = ConnectDB;