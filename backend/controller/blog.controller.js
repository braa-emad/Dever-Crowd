const express = require("express");
const Blog = require("../models/blog.schema");
const httpresponses = require("../utils/httpResponse");
const asyncwrapper = require("../middlewares/asyncWrapper");
const errorHandler = require("../utils/errorHandler");

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
    const error = errorHandler.create(
      httpResponse.message.NoBlogsnow,
      httpResponse.status.BlogsNowFound
    );
    return next(error);
  }
  res.json({
    status: httpresponses.status.ok,
    message: httpresponses.message.getAllBlogs,
    data: { blogs },
  });
});

const getSingleBlog = asyncwrapper(async (req, res, next) => {
  const slug = req.params.slug;

  const isAuthenticated = Boolean(req.user);

  const query = {
    slug,
    ...(isAuthenticated ? {} : { status: "published" }),
  };
  
  const blog = await Blog.findOne(
    query)
  if (!blog) {
    const error = errorHandler.create(
      httpresponses.status.notfound,
      httpresponses.message.blogNotFound
    );
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
    const error = errorHandler.create(
      httpresponses.status.unauthorized,
      httpresponses.message.unauthorized
    );
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
const modifyBlog = asyncwrapper(async (req, res, next) => {
  console.log("update blog called");
});
const deleteBlog = asyncwrapper(async (req, res, next) => {
  console.log("delete blog called");
});
// add this route to the blog routes'

const addLike = asyncwrapper(async (req, res, next) => {
  console.log("add like called");

  let blog = await Blog.findOne({ slug });
  const ip = req.ip.replace("::ffff:", ""); // or req.ip only
});
// add to schema the IP and the user agent
const deleteLike = asyncwrapper(async (req, res, next) => {
  console.log("delete like called");
});

const publishBlog = asyncwrapper(async (req, res, next) => {
  console.log("publish blog called");
});
// process workflow

/*
when user open the /create and type any thing this will send post request to the API to create a blog with draft status and this new blog should has title to make the slug to update then
while typing we will make update every x seconds
when click on the save button this will send a request to update endpoint and change the status to published


*/

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
