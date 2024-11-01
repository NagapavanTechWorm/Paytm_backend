const express = require('express')
const route = express.Router();

const transaction = require('../controller/transactionController');

route.put('/',transaction.transfer)


module.exports = route;