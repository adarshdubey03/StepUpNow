import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false, 
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  image: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
