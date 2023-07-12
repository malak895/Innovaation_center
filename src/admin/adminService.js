
const mongoose = require('mongoose');
const adminModel = require('./adminModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.createAdminDBService = (adminDetails) => {
  return new Promise((resolve, reject) => {
    if (!adminDetails.firstname || !adminDetails.email || !adminDetails.password) {
      reject({ status: false, message: "All fields are required." });
    } else {
      const adminModelData = new adminModel();
      adminModelData.firstname = adminDetails.firstname;
      adminModelData.email = adminDetails.email;
      adminModelData.password = adminDetails.password;

      bcrypt.hash(adminDetails.password, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          adminModelData.password = hash;
          adminModelData
            .save()
            .then((result) => {
              resolve(true);
            })
              .catch((error) => {
                reject(error);
              });
          }
        });
      }
    });
  }
  
module.exports.loginAdminDBService = (adminDetails) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await adminModel.findOne({ email: adminDetails.email });
      if (result) {
        const isMatch = await bcrypt.compare(adminDetails.password, result.password);
        if (isMatch) {
          resolve({ status: true, msg: "admin Validated Successfully" });
        } else {
          reject({ status: false, msg: "admin Validation failed" });
        }
      } else {
        reject({ status: false, msg: "admin Error Details" });
      }
    } catch (error) {
      reject({ status: false, msg: "Invalid Data" });
    }
  });
};

module.exports.updateAdminDBService = (id, updates) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        reject({ status: false, msg: "Invalid ID" });
        return;
      }

      const updatedAdmin = await adminModel.findByIdAndUpdate(id, updates, { new: true });
      if (updatedAdmin) {
        resolve(updatedAdmin);
      } else {
        reject({ status: false, msg: "No admin found with the provided ID" });
      }
    } catch (error) {
      reject(error);
    }
  });
};
