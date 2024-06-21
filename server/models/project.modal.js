import mongoose, { Schema } from "mongoose";

const projectSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  description: {
    type: String,
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "manager id required"],
  },
  status: {
    type: String,
    enum: ["Planning", "Ongoing", "Completed"],
    default: "Planning",
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
