import { Router } from "express";
import auth from "../middleware/auth.middleware.js";
import { loginUser, logoutUser, signupUser } from "../controllers/user.controllers.js";
import { authLimiter } from "../middleware/rateLimiter.middleware.js";

const router = Router();

router.route("/login").post(authLimiter, loginUser);
router.route("/signup").post(authLimiter, signupUser);
router.route("/logout").post(auth, logoutUser);


export default router;