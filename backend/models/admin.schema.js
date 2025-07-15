const mongoose = require("mongoose");
const roles = require("../utils/roles");
const adminSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    enum: Object.values(roles),
  },
  nickname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  tasksNumber: {
    type: Number,
    required: true,
    default: 0,
  },
  tasksDone: {
    type: Number,
    required: true,
    default: 0,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pic:{
    type:String,
    required: true,
  }
});

adminSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "assignedTo",
});

adminSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "userId",
});

adminSchema.set("toObject", { virtuals: true });
adminSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Admin", adminSchema, "admins");
