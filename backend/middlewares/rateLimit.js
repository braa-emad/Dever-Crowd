const rateLimit = require("express-rate-limit");
const formRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    status: 429,
    message: "Too many requests. Please try again later. و بطل بعبصه",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  formRateLimiter,
};
// نحن غرابا عك عك  
