const express = require("express");
const router = express.Router();
const blogController = require("../controller/blog.controller");
const auth = require("../middlewares/auth");
const roles = require("../utils/roles");
const slug = require("../middlewares/slugMiddleware");
//validation required
router
  .route("/")
  .get(auth.verifyToken, blogController.getAllBlogs)
  .post(
    auth.verifyToken,
    auth.allowedTo(roles.ceo, roles.cto),
    blogController.createBlog
  );
router
  .route("/:slug/like")
  .post( blogController.addLike)
  .delete(blogController.deleteLike);

router
  .route("/:slug/publish")
  .patch(
    auth.verifyToken,
    auth.allowedTo(roles.ceo, roles.cto),
    blogController.publishBlog
  );
router
  .route("/:slug")
  .get(auth.verifyToken, blogController.getSingleBlog)
  .patch(auth.verifyToken, blogController.modifyBlog)
  .delete(auth.verifyToken, blogController.deleteBlog);

module.exports = router;
