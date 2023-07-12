const adminService = require('./adminService');
const Admin = require('./adminModel');
const mongoose = require('mongoose');

const createAdminControllerFn = async (req, res) => {
  try {
    console.log(req.body);
    const status = await adminService.createAdminDBService(req.body);
    console.log(status);

    if (status) {
      res.send({ status: true, message: 'Admin created successfully' });
    } else {
      res.send({ status: false, message: 'Error creating user' });
    }
  } catch(err) {
    console.log(err);
    res.send({ status: false, message: err.message });
  }
};

const loginAdminControllerFn = async (req, res) => {
  try {
    const result = await adminService.loginAdminDBService(req.body);
    if (result.status) {
      res.send({ status: true, message: result.msg });
    } else {
      res.send({ status: false, message: result.amsg });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, message: error.message });
  }
};
const updateAdminControllerFn = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const updatedAdmin = await adminService.updateAdminDBService(id, updates);

    if (!updatedAdmin) {
      return res.status(404).json({ message: 'No admin found with the provided ID' });
    }

    res.json(updatedAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the Admin record.' });
  } 
};


module.exports = { createAdminControllerFn, loginAdminControllerFn ,updateAdminControllerFn};
