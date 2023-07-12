const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const conversationController = require('../src/conversation/conversationController');

router.route('/conversation/getAll').get(conversationController.getDataControllerFn);

module.exports = router;





