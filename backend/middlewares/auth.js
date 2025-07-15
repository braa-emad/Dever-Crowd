const jwt = require("jsonwebtoken");
const redis = require("../config/redis");
const errorHandler = require("../utils/errorHandler");
const httpResponse = require("../utils/httpResponse");
const asyncWrapper = require("./asyncWrapper");
const roles = require("../utils/roles");

const isauth = asyncWrapper(async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next();

  const isBlacklisted = await redis.get(`blacklist:${token}`);
  if (isBlacklisted) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    req.user = null;
  }
  next();
});

const verifyToken = asyncWrapper(async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next(
      errorHandler.create(
        httpResponse.message.unauthenticated,
        httpResponse.status.unauthenticated
      )
    );
  }
  const isBlacklisted = await redis.get(`blacklist:${token}`);
  if (isBlacklisted)
    return next(
      errorHandler.create(
        httpResponse.message.unauthenticated,
        httpResponse.status.unauthenticated
      )
    );

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return next(
      errorHandler.create(
        httpResponse.message.unauthenticated,
        httpResponse.status.unauthenticated
      )
    );
  }
});

const allowedTo = (...roles) => {
  return (req, res, next) => {
    const { role, id } = req.user;
    const profileId = req.params.id;
    if (id == profileId) {
      return next();
    } else if (roles.includes(role)) {
      return next();
    }
    return next(
      errorHandler.create(
        httpResponse.message.unauthorized,
        httpResponse.status.unauthorized
      )
    );
  };
};

module.exports = {
  verifyToken,
  allowedTo,
  isauth,
};
