const clientModel = require('./clientModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.createClientDBService = (clientDetails) => {
  return new Promise((resolve, reject) => {
    if (!clientDetails.firstname) {
      reject({ status: false, message: "firstname field is required." });
    
    } else if (!clientDetails.password) {
      reject({ status: false, message: "password field is required." });
    } else {
      const clientModelData = new clientModel();
      clientModelData.firstname = clientDetails.firstname;
      clientModelData.email = clientDetails.email;
      
      clientModelData.password = clientDetails.password;

      bcrypt.hash(clientDetails.password, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          clientModelData.password = hash;
          clientModelData
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


module.exports.loginClientDBService = (clientDetails) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await clientModel.findOne({ email: clientDetails.email });
      if (result) {
        const isMatch = await bcrypt.compare(clientDetails.password, result.password);
        if (isMatch) {
          resolve({ status: true, msg: "client Validated Successfully" });
        } else {
          reject({ status: false, msg: "client Validation failed" });
        }
      } else {
        reject({ status: false, msg: "client Error Details" });
      }
    } catch (error) {
      reject({ status: false, msg: "Invalid Data" });
    }
  });
};