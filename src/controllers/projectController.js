// src/controllers/projectController.js
import Project from "../models/project.js";
import User from "../models/user.js";

export const postProject = async (req, res) => {
  const { title, description, expireDate } = req.body;
  const user = req.user;
  const adminId = user._id;

  // Assuming req.user contains the authenticated user information

  try {
    // Check if the user is an admin
    const findUser = await User.findById(adminId);
    const userRole = findUser.role;
    if (userRole !== "admin") {
      res
        .status(403)
        .json({ message: "Permission denied. Only admins can post projects." });
      return;
    }

    const newProject = new Project({
      title,
      description,
      active: false,
      expireDate,
      adminId,
      bids: [],
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.title === 1
    ) {
      // Handle duplicate key error (title uniqueness violation)
      res.status(400).json({ message: "Project title must be unique." });
    } else {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
};
