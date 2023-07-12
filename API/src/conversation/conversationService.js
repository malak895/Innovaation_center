const conversationModel = require('../conversation/conversationModel');

module.exports.getDataFromDBService = () => {
  return conversationModel.find({});
};
