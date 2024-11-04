const express = require('express')
const route = express.Router();

const userController = require("../controller/userController")


route.get('/balance',userController.getBalance).get("/me",userController.getMe)
route.post('/signup',userController.SignUp)
route.post("/signin",userController.SignIn)

module.exports = route;