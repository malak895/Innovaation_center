const mongoose = require('mongoose');
const eventModel = require('./eventModel');

module.exports.createEventDBService = (eventDetails, imageFile) => {
  return new Promise((resolve, reject) => {
    if (!eventDetails.titre) {
      reject({ status: false, message: 'Titre field is required.' });
    } else if (!imageFile.buffer || !imageFile.mimetype) {
      reject({ status: false, message: 'Image file is required.' });
    } else {
      const eventModelData = new eventModel({
        titre: eventDetails.titre,
        description: eventDetails.description,
        image: {
          data: imageFile.buffer,
          contentType: imageFile.mimetype
        }
      });

      eventModelData
        .save()
        .then(() => {
          resolve({ status: true, message: 'Event created successfully' });
        })
        .catch((error) => {
          reject({ status: false, message: error.message });
        });
    }
  });
};

module.exports.getDataFromDBService = () => {
  return eventModel.find({});
};

module.exports.updateEventDBService = (id, updates) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        reject({ status: false, msg: 'Invalid ID' });
        return;
      }

      const updatedEvent = await eventModel.findByIdAndUpdate(id, updates, { new: true });

      if (updatedEvent) {
        resolve(updatedEvent);
      } else {
        reject({ status: false, msg: 'No Event found with the provided ID' });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports.removeEventDBService = (id) => {
  return eventModel.findByIdAndDelete(id).exec();
};
