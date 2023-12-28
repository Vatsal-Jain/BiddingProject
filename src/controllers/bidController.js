// src/controllers/bidController.js
import Project from "../models/project.js";

export const bidOnProject = async (req, res) => {
  const { projectId } = req.params; // Assuming projectId is part of the route parameters
  const { userId, amount, userRole } = req.body;

  try {
    // Check if the project exists
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if the project is active and the user has the required role
    if (!project.active || userRole !== "user") {
      return res
        .status(403)
        .json({ message: "Unauthorized to bid on this project" });
    }

    // Check if the user has already bid on this project
    const existingBid = project.bids.find(
      (bid) => bid.userId.toString() === userId
    );

    if (existingBid) {
      return res
        .status(400)
        .json({ message: "User has already bid on this project" });
    }

    // Add the new bid
    project.bids.push({ userId, amount });
    await project.save();

    res.status(201).json({ message: "Bid placed successfully", project });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
