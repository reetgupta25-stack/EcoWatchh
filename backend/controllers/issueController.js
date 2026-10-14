
const Issue = require("../models/Issue");
const User = require("../models/User");

// ==========================================
// 1. CREATE A NEW ENVIRONMENTAL ISSUE
// POST /api/issues
// ==========================================
const createIssue = async (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      location,
      coordinates,
      priority,
      imageUrl,
    } = req.body;

    if (
      !title?.trim() ||
      !description?.trim() ||
      !category ||
      !location?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Title, description, category and location are required.",
      });
    }

    const issue = await Issue.create({
      title: title.trim(),
      description: description.trim(),
      category,
      location: location.trim(),
      coordinates,
      priority: priority || "Medium",
      imageUrl: imageUrl || "",
      reportedBy: req.user._id,
      status: "Reported",
    });

    return res.status(201).json({
      success: true,
      message: "Environmental issue reported successfully.",
      issue,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 2. GET ALL ISSUES
// GET /api/issues
// ==========================================
const getIssues = async (req, res, next) => {
  try {
    const filter = {};
    const { status, category, priority } = req.query;
    const role = req.user.role;

    // Citizens can only view their own reports.
    if (role === "citizen") {
      filter.reportedBy = req.user._id;
    }

    // Workers can only view tasks assigned to them.
    if (role === "worker") {
      filter.assignedTo = req.user._id;
    }

    // Supervisors can view issues assigned to them for supervision.
    if (role === "supervisor") {
      filter.supervisor = req.user._id;
    }

    if (status) filter.status = status;
    if (category) filter.category = category;
    if (priority) filter.priority = priority;

    const issues = await Issue.find(filter)
      .populate("reportedBy", "name email")
      .populate("assignedTo", "name email")
      .populate("supervisor", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: issues.length,
      issues,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 3. GET A SINGLE ISSUE BY ID
// GET /api/issues/:id
// ==========================================
const getIssueById = async (req, res, next) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate("reportedBy", "name email")
      .populate("assignedTo", "name email")
      .populate("supervisor", "name email");

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found.",
      });
    }

    const userId = req.user._id.toString();
    const role = req.user.role;

    if (
      role === "citizen" &&
      issue.reportedBy?._id.toString() !== userId
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only view your own reported issues.",
      });
    }

    if (
      role === "worker" &&
      issue.assignedTo?._id.toString() !== userId
    ) {
      return res.status(403).json({
        success: false,
        message: "This issue is not assigned to you.",
      });
    }

    if (
      role === "supervisor" &&
      issue.supervisor?._id.toString() !== userId
    ) {
      return res.status(403).json({
        success: false,
        message: "This issue is not assigned to your supervision.",
      });
    }

    return res.status(200).json({
      success: true,
      issue,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 4. UPDATE ISSUE / WORKFLOW
// PATCH /api/issues/:id
// ==========================================
const updateIssue = async (req, res, next) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found.",
      });
    }

    const role = req.user.role;
    const userId = req.user._id.toString();

    const isOwner = issue.reportedBy.toString() === userId;
    const isAssignedWorker =
      issue.assignedTo?.toString() === userId;
    const isAssignedSupervisor =
      issue.supervisor?.toString() === userId;

    const {
      title,
      description,
      category,
      location,
      coordinates,
      imageUrl,
      priority,
      status,
      assignedTo,
      supervisor,
      deadline,
      resolutionNotes,
      proofImageUrl,
    } = req.body;

    // Citizens may edit their own report, but cannot assign
    // workers or change workflow status/priority.
    if (role === "citizen") {
      if (!isOwner) {
        return res.status(403).json({
          success: false,
          message: "You can only update your own reports.",
        });
      }

      if (
        status !== undefined ||
        priority !== undefined ||
        assignedTo !== undefined ||
        supervisor !== undefined ||
        deadline !== undefined ||
        resolutionNotes !== undefined ||
        proofImageUrl !== undefined
      ) {
        return res.status(403).json({
          success: false,
          message: "Citizens cannot change issue assignments or workflow status.",
        });
      }

      if (title !== undefined) {
        if (!title.trim()) {
          return res.status(400).json({
            success: false,
            message: "Title cannot be empty.",
          });
        }
        issue.title = title.trim();
      }

      if (description !== undefined) {
        if (!description.trim()) {
          return res.status(400).json({
            success: false,
            message: "Description cannot be empty.",
          });
        }
        issue.description = description.trim();
      }

      if (category !== undefined) issue.category = category;

      if (location !== undefined) {
        if (!location.trim()) {
          return res.status(400).json({
            success: false,
            message: "Location cannot be empty.",
          });
        }
        issue.location = location.trim();
      }

      if (coordinates !== undefined) issue.coordinates = coordinates;
      if (imageUrl !== undefined) issue.imageUrl = imageUrl;
    }

    // Admins and supervisors manage review, priority,
    // assignments and deadlines.
    else if (role === "admin" || role === "supervisor") {
      if (role === "supervisor" && !isAssignedSupervisor) {
        return res.status(403).json({
          success: false,
          message: "You can only manage issues assigned to your supervision.",
        });
      }

      if (priority !== undefined) issue.priority = priority;
      if (status !== undefined) issue.status = status;

      if (role === "admin" && assignedTo !== undefined) {
        if (assignedTo === null || assignedTo === "") {
          issue.assignedTo = null;
        } else {
          const worker = await User.findById(assignedTo);

          if (!worker || worker.role !== "worker") {
            return res.status(400).json({
              success: false,
              message: "Please select a valid worker.",
            });
          }

          issue.assignedTo = worker._id;
        }

        if (issue.status === "Reported" || issue.status === "Under Review") {
          issue.status = "Assigned";
        }
      }

      if (role === "admin" && supervisor !== undefined) {
        if (supervisor === null || supervisor === "") {
          issue.supervisor = null;
        } else {
          const supervisorUser = await User.findById(supervisor);

          if (!supervisorUser || supervisorUser.role !== "supervisor") {
            return res.status(400).json({
              success: false,
              message: "Please select a valid supervisor.",
            });
          }

          issue.supervisor = supervisorUser._id;
        }
      }

      if (deadline !== undefined) {
        issue.deadline = deadline || null;
      }

      if (resolutionNotes !== undefined) {
        issue.resolutionNotes = resolutionNotes;
      }

      if (proofImageUrl !== undefined) {
        issue.proofImageUrl = proofImageUrl;
      }
    }

    // Workers may update only their assigned tasks.
    else if (role === "worker") {
      if (!isAssignedWorker) {
        return res.status(403).json({
          success: false,
          message: "You can only update tasks assigned to you.",
        });
      }

      if (
        title !== undefined ||
        description !== undefined ||
        category !== undefined ||
        location !== undefined ||
        coordinates !== undefined ||
        imageUrl !== undefined ||
        priority !== undefined ||
        assignedTo !== undefined ||
        supervisor !== undefined ||
        deadline !== undefined
      ) {
        return res.status(403).json({
          success: false,
          message: "Workers cannot change issue details or assignments.",
        });
      }

      if (status !== undefined) {
        const allowedWorkerStatuses = [
          "In Progress",
          "Completed",
        ];

        if (!allowedWorkerStatuses.includes(status)) {
          return res.status(400).json({
            success: false,
            message: "Workers can set status to In Progress or Completed only.",
          });
        }

        issue.status = status;
      }

      if (resolutionNotes !== undefined) {
        issue.resolutionNotes = resolutionNotes;
      }

      if (proofImageUrl !== undefined) {
        issue.proofImageUrl = proofImageUrl;
      }
    } else {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this issue.",
      });
    }

    await issue.save();

    const updatedIssue = await Issue.findById(issue._id)
      .populate("reportedBy", "name email")
      .populate("assignedTo", "name email")
      .populate("supervisor", "name email");

    return res.status(200).json({
      success: true,
      message: "Issue updated successfully.",
      issue: updatedIssue,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 5. DELETE ISSUE
// DELETE /api/issues/:id
// ==========================================
const deleteIssue = async (req, res, next) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found.",
      });
    }

    await Issue.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Issue deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// Export all controller functions
module.exports = {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
};
