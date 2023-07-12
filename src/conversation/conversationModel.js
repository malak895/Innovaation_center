const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  bot: {
    type: String,
    required: true
  }
}, { collection: 'conversation' }); // Set the collection name to "conversation"

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
