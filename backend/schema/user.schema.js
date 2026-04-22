// Schema pattern from: course lecture demo file (ahjorgen167/user.schema.js)
import { Schema } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { collection: 'sudonku_users' });

export default UserSchema;