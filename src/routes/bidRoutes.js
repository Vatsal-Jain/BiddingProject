import express from "express";
import { bidOnProject } from "../controllers/bidController.js";

const router = express.Router();

// Define the route to bid on a project
router.post("/projects/:projectId/bid", bidOnProject);

export default router;
