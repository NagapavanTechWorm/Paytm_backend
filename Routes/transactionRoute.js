const express = require('express')
const route = express.Router();

const transaction = require('../controller/transactionController');

route.put('/transfer',transaction.transfer)


module.exports = route;