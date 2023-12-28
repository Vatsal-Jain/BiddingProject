import dotenv from "dotenv";

import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});
const Port = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("database failed on app.on", error);
      throw error;
    });
    app.listen(Port, () => {
      console.log("App Listening on Port", Port);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection faield!", error);
  });
