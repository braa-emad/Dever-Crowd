const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    ],
    type: {
      type: String,
      required: true,
    },
    deadline: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "InProgress", "review", "completed"],
      default: "pending",
      required: true,
    },
    references: {
      type: String,
      required: true,
    },
    priority:{
      type: String,
      required: true,
      enum:["low","medium","high"],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema, "tasks");
