// src/controllers/bidController.js
import Project from "../models/project.js";
import User from "../models/user.js";
export const bidOnProject = async (req, res) => {
  const { projectId } = req.params;
  const { amount } = req.body;
  const user = req.user;
  const id = user._id;

  try {
    // Check if the project exists
    const project = await Project.findById(projectId);
    const findUser = await User.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if the project is active and the user has the required role
    if (!project.active || findUser.role !== "user") {
      return res
        .status(403)
        .json({ message: "Unauthorized to bid on this project" });
    }

    // Check if the user has already bid on this project
    const existingBid = project.bids.find(
      (bid) => bid.userId.toString() === id
    );

    if (existingBid) {
      return res
        .status(400)
        .json({ message: "User has already bid on this project" });
    }

    // // Check if the token matches the user's token in the database
    // const user = await User.findOne({ _id: id, token });

    // if (!user) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }

    // Add the new bid
    project.bids.push({ userId: id, amount });
    await project.save();

    res.status(201).json({ message: "Bid placed successfully", project });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
