var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var messageSchema = new Schema({
    answers: {
        type: [String],
        required: true,
      },
      questions: {
        type: [String],
        required: true,
      },
});
 
module.exports = mongoose.model('message', messageSchema);