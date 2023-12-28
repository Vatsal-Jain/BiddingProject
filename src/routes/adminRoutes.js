// src/routes/adminRouter.js
import express from "express";
import { activateProject } from "../controllers/adminController.js";

const router = express.Router();

// Define the route to activate a project (admin-only)
router.post("/projects/:projectId/activate", activateProject);

export default router;
