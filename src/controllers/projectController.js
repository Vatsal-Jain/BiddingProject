// src/controllers/projectController.js
import Project from "../models/project.js";

export const postProject = async (req, res) => {
  const { title, description, expireDate, userRole, adminId } = req.body;

  // Assuming req.user contains the authenticated user information

  try {
    // Check if the user is an admin
    if (userRole !== "admin") {
      res
        .status(403)
        .json({ message: "Permission denied. Only admins can post projects." });
      return;
    }

    const newProject = new Project({
      title,
      description,
      active: true,
      expireDate,
      userRole,
      adminId,
      bids: [],
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
