const mongoose = require("mongoose");

const addSchema = new mongoose.Schema(
  {
    title: { type: String },
    author: { type: String },
    url: { type: String },
    ingredients: { type: String },
    directions: { type: String },
  },
  { collection: "Addrecipe" }
);

const addModel = mongoose.model("Addrecipe", addSchema);

module.exports = addModel;
