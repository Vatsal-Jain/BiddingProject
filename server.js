// import express from "express";
// import mongoose from "mongoose";
// import bodyParser from "body-parser";
// import cors from "cors";
// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(bodyParser.json());

// mongoose.connect(`${process.env.MONGODB_URL}/BidProject`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const userSchema = new mongoose.Schema({
//   username: String,
//   role: String, // 'admin' or 'enduser'
// });

// const projectSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   active: Boolean,
//   expireDate: Date,
//   bids: [{ userId: mongoose.Types.ObjectId, amount: Number }],
// });

// const User = mongoose.model("User", userSchema);
// const Project = mongoose.model("Project", projectSchema);

// // Endpoint for user registration
// app.post("/register", async (req, res) => {
//   const { username, role } = req.body;

//   try {
//     const newUser = new User({ username, role });
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // Endpoint for project posting
// app.post("/postProject", async (req, res) => {
//   const { title, description, expireDate } = req.body;

//   try {
//     const newProject = new Project({
//       title,
//       description,
//       active: false,
//       expireDate,
//       bids: [],
//     });

//     await newProject.save();
//     res.status(201).json(newProject);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
