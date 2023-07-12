const userService = require('./userService');

const createUserControllerFn = async (req, res) => {
  try {
    console.log(req.body);
    const status = await userService.createUserDBService(req.body);
    console.log(status);
 
    if (status) {
      res.send({ status: true, message: 'User created successfully' });
    } else {
      res.send({ status: false, message: 'Error creating user' });
    }
  } catch(err) {
    console.log(err);
    res.send({ status: false, message: err.message });
  }
};
module.exports = {createUserControllerFn}