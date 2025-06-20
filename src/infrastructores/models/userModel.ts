import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: String,
  name: String,
  email: String,
  password: String,
  role: String,
  createdBy: String,
  groupId: String,
}, { timestamps: true });

export default mongoose.model('User', userSchema);
