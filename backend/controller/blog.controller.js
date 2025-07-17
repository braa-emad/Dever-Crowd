const express = require("express");
const Blog = require("../models/blog.schema");
const httpresponses = require("../utils/httpResponse");
const asyncwrapper = require("../middlewares/asyncWrapper");
const errorHandler = require("../utils/errorHandler");
const generateUniqueSlug = require("../utils/generateSlug");
const sortBlogs = require("../utils/SortingBlogs.js");

const getAllBlogs = asyncwrapper(async (req, res, next) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;
  const skip = limit * (page - 1);

  const isAuthenticated = Boolean(req.user);

  const query = isAuthenticated ? {} : { status: "published" };

  const selectFields = isAuthenticated
    ? undefined
    : "title subtitle category slug publish_date";

  const blogs = await Blog.find(query)
    .select(selectFields)
    .limit(limit)
    .skip(skip)
    .lean();
  if (!blogs.length) {
    const error = errorHandler.create({
      status: httpResponse.message.NoBlogsnow,
      message: httpResponse.status.BlogsNowFound,
    });
    return next(error);
  }

  const sortedBlogs = sortBlogs(blogs);
  res.json({
    status: httpresponses.status.ok,
    message: httpresponses.message.getAllBlogs,
    data: { blogs: sortedBlogs },
  });
});

const getSingleBlog = asyncwrapper(async (req, res, next) => {
  const slug = req.params.slug;

  const isAuthenticated = Boolean(req.user);

  const query = {
    slug,
    ...(isAuthenticated ? {} : { status: "published" }),
  };

  const blog = await Blog.findOne(query);
  if (!blog) {
    const error = errorHandler.create({
      status: httpresponses.status.notfound,
      message: httpresponses.message.blogNotFound,
    });
    return next(error);
  }
  if (
    (!isAuthenticated || req.user.id !== blog.writer.toString()) &&
    blog.status === "published"
  )
    blog.views = (blog.views || 0) + 1;

  await blog.save();
  res.json({
    status: httpresponses.status.ok,
    message: httpresponses.message.SingleBlogDetails,
    data: { blog },
  });
});

const createBlog = asyncwrapper(async (req, res, next) => {
  if (!req.user) {
    const error = errorHandler.create({
      status: httpresponses.status.unauthorized,
      message: httpresponses.message.unauthorized,
    });
    return next(error);
  }
  const blog = new Blog({
    writer: req.user.id,
    writer_pic: req.user.pic,
    status: "draft",
  });
  await blog.save();
  res.json({
    status: httpresponses.status.ok,
    message: httpresponses.message.createBlog,
    data: { blog },
  });
});

const publishBlog = asyncwrapper(async (req, res, next) => {
  const slug = req.params.slug;

  let blog = await Blog.findOne({ slug });

  if (!blog) {
    const error = errorHandler.create({
      status: httpresponses.status.notfound,
      message: httpresponses.message.blogNotFound,
    });
    return next(error);
  }

  if (req.user.id !== blog.writer.toString()) {
    const error = errorHandler.create({
      status: httpresponses.status.unauthorized,
      message: httpresponses.message.unauthorized,
    });
    return next(error);
  }

  if (blog.status === "published") {
    const error = errorHandler.create({
      status: httpresponses.status.badrequest,
      message: httpresponses.message.blogAlreadyPublished,
    });
    return next(error);
  }

  blog.status = "published";

  blog.slug = await generateUniqueSlug(blog.title);
  blog.publish_date = new Date();
  await blog.save();
  res.json({
    status: httpresponses.status.ok,
    message: httpresponses.message.published_successfully,
    data: { blog },
  });
});

const modifyBlog = asyncwrapper(async (req, res, next) => {
  const slug = req.params.slug;
  const { title, subtitle, category, featured_image, tags, content } =
    req.body;

  let blog = await Blog.findOne({ slug });

  if (!blog) {
    const error = errorHandler.create({
      status: httpresponses.status.notfound,
      message: httpresponses.message.blogNotFound,
    });
    return next(error);
  }

  if (req.user.id !== blog.writer.toString()) {
    const error = errorHandler.create({
      status: httpresponses.status.unauthorized,
      message: httpresponses.message.unauthorized,
    });
    return next(error);
  }

  const updates = {
    subtitle,
    category,
    featured_image,
    tags,
    content,
  };

  for (const [key, value] of Object.entries(updates)) {
    if (value !== undefined) {
      blog[key] = value;
    }
  }
  if (title && title !== blog.title) {
    blog.title = title;
    blog.slug = await generateUniqueSlug(title);
  }
  await blog.save();
  res.json({
    status: httpresponses.status.ok,
    message: httpresponses.message.blogModified,
    data: { slug: blog.slug },
  });
});

const deleteBlog = asyncwrapper(async (req, res, next) => {
  const slug = req.params.slug;

  let blog = await Blog.findOne({ slug });

  if (!blog) {
    const error = errorHandler.create({
      status: httpresponses.status.notfound,
      message: httpresponses.message.blogNotFound,
    });
    return next(error);
  }

  if (req.user.id !== blog.writer.toString()) {
    const error = errorHandler.create({
      status: httpresponses.status.unauthorized,
      message: httpresponses.message.unauthorized,
    });
    return next(error);
  }
  await blog.deleteOne();

  res.sendStatus(httpresponses.status.noContent);
});

const addLike = asyncwrapper(async (req, res, next) => {
  const slug = req.params.slug;
  const ip = req.ip;
  const userAgent = req.headers["user-agent"];
  const blog = await Blog.findOne({ slug });

  if (!blog) {
    const error = errorHandler.create({
      status: httpresponses.status.notfound,
      message: httpresponses.message.blogNotFound,
    });
    return next(error);
  }

  if (blog.status !== "published") {
    const error = errorHandler.create({
      status: httpresponses.status.badrequest,
      message: httpresponses.message.blogNotPublished,
    });
    return next(error);
  }

  const alreadyLiked = blog.likes.some(
    (like) => like.ip === ip || like.userAgent === userAgent
  );

  if (alreadyLiked) {
    res.json({
      status: httpresponses.status.ok,
      message: httpresponses.message.alreadyLiked,
      data: { totalLikes: blog.likes.length },
    });
    return;
  }

  blog.likes.push({ ip, userAgent });
  await blog.save();

  res.json({
    status: httpresponses.status.ok,
    message: httpresponses.message.likeAdded,
    data: { totalLikes: blog.likes.length },
  });
});
const deleteLike = asyncwrapper(async (req, res, next) => {
  const slug = req.params.slug;
  const ip = req.ip;
  const userAgent = req.headers["user-agent"];
  const blog = await Blog.findOne({ slug });

  if (!blog) {
    const error = errorHandler.create({
      status: httpresponses.status.notfound,
      message: httpresponses.message.blogNotFound,
    });
    return next(error);
  }

  if (blog.status !== "published") {
    const error = errorHandler.create({
      status: httpresponses.status.badrequest,
      message: httpresponses.message.blogNotPublished,
    });
    return next(error);
  }

  const alreadyLiked = blog.likes.some(
    (like) => like.ip === ip || like.userAgent === userAgent
  );

  if (!alreadyLiked) {
    res.json({
      status: httpresponses.status.ok,
      message: httpresponses.message.UnableToDeleteLike,
      data: { totalLikes: blog.likes.length },
    });
    return;
  }
  blog.likes = blog.likes.filter(
    (like) => like.ip !== ip && like.userAgent !== userAgent
  );
  await blog.save();
  res.json({
    status: httpresponses.status.ok,
    message: httpresponses.message.likeRemoved,
    data: { totalLikes: blog.likes.length },
  });
}); // add & delete have a problem did you get it?

module.exports = {
  getAllBlogs,
  getSingleBlog,
  createBlog,
  modifyBlog,
  deleteBlog,
  addLike,
  deleteLike,
  publishBlog,
};
