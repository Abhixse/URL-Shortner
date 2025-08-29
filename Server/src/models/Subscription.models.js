import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  plan: {
    type: String,
    enum: ["free", "basic", "premium"],
    default: "free",
  },
  status: {
    type: String,
    enum: ["active", "cancelled", "paused"],
    default: "active",
  }
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
