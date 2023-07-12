
var express = require('express');
 
var clientController = require('../src/client/clientController');

const router = express.Router();
 
router.route('/client/login').post(clientController.loginClientControllerFn);
router.route('/client/create').post(clientController.createClientControllerFn);
 

module.exports = router;




