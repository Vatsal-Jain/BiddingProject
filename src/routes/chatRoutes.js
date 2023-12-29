// src/routes/chatRouter.js
import express from "express";
import { sendMessage, getChat } from "../controllers/chatController.js";

const router = express.Router();

// Define the route to send a message
router.post("/messages", sendMessage);

// Define the route to get the chat for a user
router.get("/messages/:userId", getChat);

export default router;
