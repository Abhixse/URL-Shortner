// routes/domainRoutes.js
import express from "express";
import { getDomainStats } from "../controllers/domain.controllers.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { addDomain, getDomains, deleteDomain } from "../controllers/domain.controllers.js";



const router = express.Router();


router.get("/stats", authMiddleware, getDomainStats);
router.post("/", authMiddleware, addDomain);
router.get("/", authMiddleware, getDomains);
router.delete("/:id", authMiddleware, deleteDomain);

export default router;