
const clientService = require('./clientService');

const  createClientControllerFn = async (req, res) => {
  try {
    console.log(req.body);
    const status = await clientService.createClientDBService(req.body);
    console.log(status);
 
    if (status) {
      res.send({ status: true, message: 'client created successfully' });
    } else {
      res.send({ status: false, message: 'Error creating user' });
    }
  } catch(err) {
    console.log(err);
    res.send({ status: false, message: err.message });
  }
};

const loginClientControllerFn = async (req, res) => {
  try {
    const result = await clientService.loginClientDBService(req.body);
    if (result.status) {
      res.send({ status: true, message: result.msg });
    } else {
      res.send({ status: false, message: result.msg });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, message: error.message });
  }
};

module.exports = { createClientControllerFn , loginClientControllerFn };