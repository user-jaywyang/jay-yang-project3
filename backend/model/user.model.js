// Model pattern from: course lecture demo file (ahjorgen167/user.model.js)
import mongoose from 'mongoose';
import UserSchema from '../schema/user.schema.js';

const UserModel = mongoose.model('User', UserSchema);

export function createUser(user) {
  return UserModel.create(user);
}

export function findUserByUsername(username) {
  return UserModel.findOne({ username }).exec();
}

export function getAllUsers() {
  return UserModel.find().exec();
}