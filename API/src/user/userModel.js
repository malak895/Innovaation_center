const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schéma de base pour tous les utilisateurs
const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  permission: { type: String, enum: ['read', 'write', 'admin'], required: true },
  profile: { type: String, required: true },
  date: { type: Date, required: true },
  etat: { type: String, enum: ['actif', 'inactif'], required: true },
  tel: { type: String, required: true },
  sexe: { type: String, enum: ['M', 'F'], required: true },
  avatar: { type: String, required: true },
}, { timestamps: true });

const clientSchema = new Schema({
  clientField: { type: String, required: true },
});

const adminSchema = new Schema({
  adminField: { type: String, required: true },
});
const User = mongoose.model('user', userSchema);
const Client = User.discriminator('client', clientSchema);
const Admin = User.discriminator('admin', adminSchema);

module.exports = { User, Client, Admin };
