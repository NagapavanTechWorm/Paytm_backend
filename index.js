const express = require('express');
const dotenv = require('dotenv');
const ConnectDB = require('./config/db.js')
const userRoute = require('./Routes/userRoute.js')
const Auth = require('./middleware/auth.js')




const app = express();
dotenv.config();
ConnectDB();
app.use(express.json());
app.use(Auth)

app.use('/user',userRoute);


let Port = process.env.PORT || 5000
app.listen(Port,()=>{
    console.log(`Server On Port: ${Port}`)
})