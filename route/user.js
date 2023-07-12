const express = require('express');
const userController = require('../src/user/userController');

const router = express.Router();

router.route('/users/create').post(userController.createUserControllerFn);

module.exports = router;
