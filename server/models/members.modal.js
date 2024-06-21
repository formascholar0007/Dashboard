import mongoose, { Schema } from "mongoose";

const memberSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "UserId is required"],
  },
  projectId:{
      type:Schema.Types.ObjectId,
      ref:'Project',
      required:[true, 'ProjectId is required']
  },
  role: {
    type: String,
    enum: ["Developer", "Tester"],
    default: "Developer",
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Member = mongoose.model("Member", memberSchema);
export default Member;
