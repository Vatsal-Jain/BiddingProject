// src/models/project.js
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: [true, "Project Title Should Be Unique"],
  },
  description: String,
  active: {
    type: Boolean,
    default: true,
  },
  expireDate: String,

  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  bids: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      amount: { type: String, required: true },
    },
  ],
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
