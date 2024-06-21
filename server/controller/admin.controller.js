import Member from "../models/members.modal.js";
import Project from "../models/project.modal.js";

export const createProject = async (req, res) => {
  if (!userId) {
    res
      .status(400)
      .json({ message: "User Id not found", data: null, success: false });
  }
  const {
    title,
    description,
    manager,
    status,
    startDate,
    endDate,
    role,
    joinedAt,
    active,
    members,
  } = req.body;

  if (
    !(
      title ||
      description ||
      manager ||
      status ||
      startDate ||
      endDate ||
      role ||
      joinedAt ||
      active ||
      members
    )
  ) {
    res
      .status(400)
      .json({ message: "Required All Fields", data: null, success: false });
  }

  try {
    const newProject = await Project.create({
      title,
      description,
      manager,
      status: status || "Planning",
      startDate: startDate || Date.now(),
      endDate,
    });

    if (!newProject) {
      res.status(400).json({
        message: "Failed To Create Project",
        data: null,
        success: false,
      });
    }

    if (members && members.length > 0) {
      const membersObj = members.map((member) => ({
        userId: member.userId,
        projectId: newProject._id,
        role: role || "Developer",
        joinedAt: joinedAt || Date.now(),
        active: active || true,
      }));

      await Member.insertMany(membersObj);
    }

    return res
      .status(201)
      .json({ message: "Project Created", data: newProject, success: true });
  } catch (err) {
    console.error("Error creating project:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", data: null, success: false });
  }
};
