const express = require("express");
const router = express.Router();
const blogController = require("../controller/blog.controller");
const auth = require("../middlewares/auth");
const roles = require("../utils/roles");
const validateInputs = require("../middlewares/validateInputs");
const validatorMiddleware = require("../middlewares/validatorMiddleware"); // writeone for the slug validation
const validator = require("../utils/validator");

router
  .route("/")
  .get(auth.isauth, blogController.getAllBlogs)
  .post(
    auth.verifyToken,
    auth.allowedTo(roles.ceo, roles.cto),
    blogController.createBlog
  );
router
  .route("/:slug/like")
  .post(blogController.addLike)
  .delete(blogController.deleteLike);

router
  .route("/:slug/publish")
  .patch(
    auth.verifyToken,
    auth.allowedTo(roles.ceo, roles.cto),
    validator.blogValidation,
    validateInputs,
    blogController.modifyBlog,
    blogController.publishBlog
  );
router
  .route("/:slug")
  .get(auth.isauth, blogController.getSingleBlog)
  .patch(
    auth.verifyToken,
    validator.blogValidation,
    validateInputs,
    blogController.modifyBlog
  )
  .delete(auth.verifyToken, blogController.deleteBlog);

module.exports = router;
