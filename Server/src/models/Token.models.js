import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);


tokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 });

tokenSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { id: this.userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY } // e.g. "15m"
  );
};


// ✅ Instance method to generate a refresh token
tokenSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { id: this.userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY } // e.g. "7d"
  );
};

tokenSchema.statics.verifyRefreshToken = function (token) {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};

// ✅ Decode without verifying (optional)
tokenSchema.statics.decodeRefreshToken = function (token) {
  return jwt.decode(token);
};

export const Token = mongoose.model("Token", tokenSchema);
