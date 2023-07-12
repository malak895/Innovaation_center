
var express = require('express');
 
var adminController = require('../src/admin/adminController');
const mongoose = require('mongoose');


const router = express.Router();
 
router.route('/admin/login').post(adminController.loginAdminControllerFn);
router.route('/admin/create').post(adminController.createAdminControllerFn);
router.route('/admin/update/:id').put(adminController.updateAdminControllerFn);


module.exports = router;
