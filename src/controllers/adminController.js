// src/controllers/adminController.js
import Project from "../models/project.js";

export const activateProject = async (req, res) => {
  const { projectId } = req.params;
  const { adminId, userRole } = req.body;

  try {
    // Check if the project exists
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if the user making the request has the role of an admin
    if (userRole !== "admin") {
      return res
        .status(403)
        .json({ message: "Unauthorized. Only admins can activate projects." });
    }

    // Check if the adminId of the project matches the adminId from the request body
    if (project.adminId.toString() !== adminId) {
      return res
        .status(403)
        .json({
          message: "Unauthorized. AdminId does not match the project adminId.",
        });
    }

    // Activate the project
    project.active = true;
    await project.save();

    res
      .status(200)
      .json({ message: "Project activated successfully", project });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
