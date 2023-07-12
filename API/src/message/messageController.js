const messageService = require('./messageService');

const createMessageControllerFn = async (req, res) => {
  try {
    const status = await messageService.createMessageDBService(req.body);
    if (status) {
      res.send({ status: true, message: 'Message created successfully' });
    } else {
      res.send({ status: false, message: 'Error creating message' });
    }
  } catch(err) {
    console.log(err);
    res.send({ status: false, message: err.message });
  }
};

module.exports = { createMessageControllerFn };
