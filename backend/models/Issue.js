
const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Issue title is required"],
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: 2000,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Waste",
        "Water Pollution",
        "Air Pollution",
        "Deforestation",
        "Water Wastage",
        "Other",
      ],
    },

    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },

    coordinates: {
      latitude: {
        type: Number,
        min: -90,
        max: 90,
      },
      longitude: {
        type: Number,
        min: -180,
        max: 180,
      },
    },

    imageUrl: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Reported",
        "Under Review",
        "Assigned",
        "In Progress",
        "Completed",
        "Verified",
        "Rejected",
      ],
      default: "Reported",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    deadline: {
      type: Date,
      default: null,
    },

    resolutionNotes: {
      type: String,
      default: "",
      trim: true,
    },

    proofImageUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Issue", issueSchema);
