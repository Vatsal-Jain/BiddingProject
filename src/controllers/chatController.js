// src/controllers/chatController.js
import Message from "../models/message.js";
import { io } from "../app.js"; // Import the socket.io instance

export const sendMessage = async (req, res) => {
  const { senderId, receiverId, content } = req.body;

  try {
    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      content,
    });
    await newMessage.save();

    // Emit the message to the receiver using WebSocket
    io.to(receiverId).emit("newMessage", {
      message: "New message received",
      newMessage,
    });

    res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getChat = async (req, res) => {
  const { userId } = req.params;

  try {
    const chat = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .sort({ timestamp: 1 })
      .populate("sender", "username")
      .populate("receiver", "username");

    res.status(200).json({ chat });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
