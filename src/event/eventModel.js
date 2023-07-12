const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  titre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    data: {
      type: Buffer,
      required: true
    },
    contentType: {
      type: String,
      required: true
    }
  }
});

module.exports = mongoose.model('Event', eventSchema);
