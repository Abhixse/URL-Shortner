import { Router } from "express";
import auth from "../middleware/auth.middleware.js";
import { shortenUrl, getAllUrls, deleteUrl, urlRedirect } from "../controllers/url.controllers.js";
import { urlLimiter } from "../middleware/rateLimiter.middleware.js";



const router = Router();


router.route("/shorten").post(auth, urlLimiter, shortenUrl);
router.route("/").get(auth, getAllUrls);
router.route("/:id").delete(auth, deleteUrl);
router.route("/:id").get(urlRedirect);

export default router;