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
    : "title subtitle category slug featured_pic publish_date";

  const blogs = await Blog.find(query)
    .select(selectFields)
    .limit(limit)
    .skip(skip)
    .lean();
  if (!blogs) {
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
  if (!isAuthenticated) {
    delete blog.views;
  }
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
    const error = errorHandler.create;
  }

  blog.status = "published";

  blog.slug = await generateUniqueSlug(blog.title);
  // send all images before store and make his decide the featured image
  await blog.save();
  res.json({
    status: httpresponses.status.ok,
    message: httpresponses.message.published_successfully,
    data: { blog },
  });
});

const modifyBlog = asyncwrapper(async (req, res, next) => {
  const slug = req.params.slug;
  const { title, subtitle, Category, featured_image, pic, tags, content } =
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
  blog.title = title || blog.title;// update the slug if needed
  blog.subtitle = subtitle || blog.subtitle;
  blog.Category = Category || blog.Category;
  blog.featured_image = featured_image || blog.featured_image;
  // blog.pic = pic || blog.pic; 
  blog.tags = tags || blog.tags;
  blog.content = content | blog.content;


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
  await Blog.deleteOne({ _id: blog._id });

  res.sendStatus(httpresponses.status.noContent);
});

const addLike = asyncwrapper(async (req, res, next) => {
  console.log("add like called");

  let blog = await Blog.findOne({ slug });
  const ip = req.ip.replace("::ffff:", ""); // or req.ip only
});
// add to schema the IP and the user agent
const deleteLike = asyncwrapper(async (req, res, next) => {
  console.log("delete like called");
});

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
