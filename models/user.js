import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,  // required only if you want
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false, // only for credentials provider
  },
  image: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
