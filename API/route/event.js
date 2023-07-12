
var express = require('express');
const mongoose = require('mongoose');

var eventController = require('../src/event/eventController');

const router = express.Router();
 

router.route('/event/create').post(eventController.createEventControllerFn);
router.route('/event/getAll').get(eventController.getDataControllerFn);
router.route('/event/update/:id').put(eventController.updateEventControllerFn);
router.route('/event/delete/:id').delete(eventController.deleteEventController);
module.exports = router;




