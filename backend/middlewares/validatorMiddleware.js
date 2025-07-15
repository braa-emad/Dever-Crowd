const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const errorHandler = require("../utils/errorHandler");
const httpResponse = require("../utils/httpResponse");

const validateMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorHandler.create(
      "Validation Error",
      httpResponse.status.badrequest,
      {
        errors: errors.array().map((err) => ({
          field: err.param,
          message: err.msg,
        })),
      }
    );
    return next(error);
  }
  next();
};

const validateMongoId = (param = "id") => {
  return (req, res, next) => {
    const id = req.params[param];
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(
        errorHandler.create(
          `Invalid ID format: ${id}`,
          httpResponse.status.badrequest
          
        )
      );
    }
    next();
  };
};

module.exports = { validateMongoId, validateMiddleware };
