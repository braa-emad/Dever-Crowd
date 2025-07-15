const crypto = require("crypto");
const generateUniqueSlug = require("../utils/generateSlug");

async function slugifyMiddleware(next) {
  if (!this.slug) {
    if (this.title) {
      this.slug = await generateUniqueSlug(this.title);
    } else {
      const randomPart = crypto.randomBytes(3).toString("hex");
      this.slug = `untitled-${randomPart}`;
    }
  }
  next();
}

module.exports = slugifyMiddleware;
