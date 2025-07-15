const Blog = require("../models/blog.schema");


function Slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}
async function generateUniqueSlug(title) {
  const baseSlug = Slugify(title);
  let slug = baseSlug;
  const existing = await Blog.findOne({ slug });
  if (existing) {
    const randomSuffix = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");

    slug = `${baseSlug}-${randomSuffix}`;
  }

  return slug;
}

module.exports = generateUniqueSlug;
