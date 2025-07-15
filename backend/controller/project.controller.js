const Project = require("../models/project.schema");
const httpResponse = require("../utils/httpResponse");
const errorHandler = require("../utils/errorHandler");
const asyncWrapper = require("../middlewares/asyncWrapper");

const getProjects = asyncWrapper(async (req, res, next) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const skip = limit * (page - 1);
  let projects;
  if (!req.user) {
    projects = await Project.find()
      // .select("title description pic category")
      .limit(limit)
      .skip(skip);
  } else {
    projects = await Project.find().limit(limit).skip(skip);
  }
  res.json({
    status: httpResponse.status.ok,
    message: httpResponse.message.getProjects,
    data: { projects },
  });
});

const singleProject = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    const error = errorHandler.create(
      httpResponse.message.projectNotFound,
      httpResponse.status.notfound
    );
    return next(error);
  }
  res.json({
    status: httpResponse.status.ok,
    message: httpResponse.message.getProject,
    data: { project },
  });
});

const createProject = asyncWrapper(async (req, res, next) => {
  const {
    title,
    description,
    timeToFinish,
    client,
    status,
    category,
    cost,
    stack,
    scope,
    industry,
  } = req.body;
  const pic = req.file ? req.file.path : null;
  const project = new Project({
    title,
    description,
    timeToFinish,
    client,
    status,
    category,
    cost,
    pic,
    stack,
    scope,
    industry,
  });
  await project.save();
  console.log(project);
  res.status(201).json({
    status: httpResponse.status.created,
    message: httpResponse.message.projectCreated,
    data: { project },
  });
});

const updateProject = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const {
    title,
    description,
    timeToFinish,
    client,
    status,
    category,
    cost, 
    timeSpend,
    stack,
    scope,
    industry,
  } = req.body;
  const project = await Project.findById(id);
  if (!project) {
    const error = errorHandler.create(
      httpResponse.message.projectNotFound,
      httpResponse.status.notfound
    );
    return next(error);
  }
  project.title = title || project.title;
  project.description = description || project.description;
  project.pic = req.file?.path || project.pic;
  project.timeToFinish = timeToFinish || project.timeToFinish;
  project.client = client || project.client;
  project.status = status || project.status;
  project.category = category || project.category;
  project.cost = cost || project.cost;
  project.timeSpend = timeSpend || project.timeSpend;
  project.stack = stack || project.stack;
  project.scope = scope || project.scope;
  project.industry = industry || project.industry;
  await project.save();
  console.log(project);
  
  res.json({
    status: httpResponse.status.ok,
    message: httpResponse.message.updateProject,
    data: { project },
  });
});

const delProject = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const deletedproject = await Project.findByIdAndDelete({ _id: id });
  if (!deletedproject) {
    const error = errorHandler.create(
      httpResponse.message.projectNotFound,
      httpResponse.status.notfound
    );
    return next(error);
  }  
  res.json({
    status: httpResponse.status.ok,
    message: httpResponse.message.deleteProject,
  });
});

module.exports = {
  getProjects,
  createProject,
  updateProject,
  delProject,
  singleProject,
};
