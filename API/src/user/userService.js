const userModel = require('./userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.createUserDBService = (userDetails) => {
  return new Promise((resolve, reject) => {
    if (!userDetails.username) {
      reject({ status: false, message: "username field is required." });
    
    } else if (!userDetails.password) {
      reject({ status: false, message: "password field is required." });
    } else {
      const userModelData = new userModel();
      userModelData.username = userDetails.username;
      userModelData.email = userDetails.email;
      userModelData.permission = userDetails.permission;
      userModelData.profile = userDetails.profile;
      userModelData.date = userDetails.date;
      userModelData.etat = userDetails.etat;
      userModelData.tel = userDetails.tel;
      userModelData.sexe = userDetails.sexe;
      userModelData.avatar = userDetails.avatar;
      
      userModelData.password = userDetails.password;

      bcrypt.hash(userDetails.password, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          userModelData.password = hash;
          userModelData
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
