const messageModel = require('./messageModel');

module.exports.createMessageDBService = (messageDetails) => {
  return new Promise((resolve, reject) => {
    if (!messageDetails.answers || !messageDetails.questions) {
      reject({ status: false, message: "All fields are required." });
    } else {
      const messageModelData = new messageModel({
        answers: messageDetails.answers,
        questions: messageDetails.questions
      });

      messageModelData
        .save()
        .then((result) => {
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
};
