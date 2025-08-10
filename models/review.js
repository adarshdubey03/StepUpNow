import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
      unique: true, 
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentor",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    text: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);
