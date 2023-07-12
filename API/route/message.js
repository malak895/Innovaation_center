
var express = require('express');
 
var messageController = require('../src/message/messageController');

const router = express.Router();
 

router.route('/message/create').post(messageController.createMessageControllerFn);
 
module.exports = router;
