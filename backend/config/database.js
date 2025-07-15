const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {console.log("Mongodb server connected");})
  .catch((err) => console.error("MongoDB connection error:", err)); 
