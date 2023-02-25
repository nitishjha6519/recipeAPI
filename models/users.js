const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String },
    password: { type: String },
  },
  { collection: "User" }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
