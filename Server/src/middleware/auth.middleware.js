import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/Users.models.js";

const auth = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "No token provided");
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      throw new ApiError(401, "User not found");
    }

    req.user = user; // 👈 ye important hai
    next();
  } catch (error) {
    next(new ApiError(401, "Unauthorized - Invalid token"));
  }
};

export default auth;
