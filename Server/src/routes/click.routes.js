// routes/clickRoutes.js
import express from "express";
import { getUserClicks } from "../controllers/click.controllers.js"
import  authMiddleware  from "../middleware/auth.middleware.js";


const router = express.Router();

router.get("/stats", authMiddleware, getUserClicks);

export default router;