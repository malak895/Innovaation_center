const eventService = require('./eventService');
const mongoose = require('mongoose');

const createEventControllerFn = async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('Image file is required.');
    }

    const { titre, description } = req.body;

    const status = await eventService.createEventDBService({ titre, description }, req.file);

    res.send(status);
  } catch (err) {
    res.send({ status: false, message: err.message });
  }
};

const getDataControllerFn = async (req, res) => {
  try {
    const events = await eventService.getDataFromDBService();

    const eventData = events.map(event => ({
      titre: event.titre,
      description: event.description,
      image: {
        data: event.image.data.toString('base64'),
        contentType: event.image.contentType
      }
    }));

    res.send(eventData); // Send the eventData array as the response
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};


const updateEventControllerFn = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const updatedEvent = await eventService.updateEventDBService(id, updates);

    if (!updatedEvent) {
      return res.status(404).json({ message: 'No Event found with the provided ID' });
    }

    res.json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the Event record.' });
  }
};



const deleteEventController = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const deletedEvent = await eventService.removeEventDBService(id);

    if (deletedEvent) {
      res.json({ status: true, message: 'Event deleted successfully' });
    } else {
      res.status(404).json({ status: false, message: 'No event found with the provided ID' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the Event record.', error: error.message });
  }
};

module.exports = {
  createEventControllerFn,
  getDataControllerFn,
  updateEventControllerFn,
  deleteEventController
};
