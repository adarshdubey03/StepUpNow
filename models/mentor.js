import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  title: String,
  company: String,
  experience: Number,
  skills: [String],             // or expertise, based on your earlier naming
  linkedin: String,
  bio: String,
  price: Number,
  profileImage: String,
  verified: {                   // NEW field to track approval
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.models.Mentor || mongoose.model("Mentor", mentorSchema);

