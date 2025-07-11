import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mentor",
    required: false
  },
  amount: {
    type: Number,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
