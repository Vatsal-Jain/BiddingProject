import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import bidRouter from "./routes/bidRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import { Server } from "socket.io";
import http from "http";
import { authMiddleware } from "./middlewares/auth.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//Socket.io Configuration

// const server = http.createServer(app);
// export const io = new Server(server);

// // Setup WebSocket connection
// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
//   // Join a room based on the user's ID
//   socket.on("joinRoom", (userId) => {
//     socket.join(userId);
//     console.log(`User ${userId} joined room`);
//   });
// });

//routes

// import userRouter from "../src/routes/user.routes.js";

// //routes declaration
// app.use("/api/v1/users", userRouter);

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/projects", authMiddleware, projectRoutes);
app.use("/api/v1", authMiddleware, bidRouter);
app.use("/api/v1", authMiddleware, adminRouter);

app.get("/api/v1/protected-route", authMiddleware, (req, res) => {
  // Access the authenticated user through req.user
  res.json({ user: req.user });
});
export { app };
