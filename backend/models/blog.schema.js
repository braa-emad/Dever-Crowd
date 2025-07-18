const mongoose = require("mongoose");
const slugifyMiddleware = require("../middlewares/slugMiddleware");

const likeSchema = mongoose.Schema({
  ip: {
    type: String,
    required: false,
  },
  userAgent: {
    type: String,
    required: false,
  },
  sessionId: {
    type: String,
    required: false,
  },
  likedAt: {
    type: Date,
    default: Date.now,
  },
});
const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    subtitle: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    writer_pic: {
      type: String,
      default: "https://res.cloudinary.com/dlx9aqseo/image/upload/v1752824800/projects/yasmilrzpceyzs6sauqd.png"
    },
    featured_image: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    tags: [
      {
        type: String,
        required: false,
      },
    ],
    content: {
      type: String,
      required: false,
    },
    likes: [likeSchema],
    views: {
      type: Number,
      default: 0,
    },
    publish_date: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

blogSchema.pre("validate", slugifyMiddleware);

module.exports = mongoose.model("Blog", blogSchema, "blogs");
