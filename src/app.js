import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import bidRouter from "./routes/bidRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

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

//routes

// import userRouter from "../src/routes/user.routes.js";

// //routes declaration
// app.use("/api/v1/users", userRouter);

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1", bidRouter);
app.use("/api/v1", adminRouter);
export { app };
