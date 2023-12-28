// src/routes/projectRoutes.js
import express from "express";
import { postProject } from "../controllers/projectController.js";

const router = express.Router();

router.post("/post", postProject);

export default router;
