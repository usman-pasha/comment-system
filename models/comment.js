const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    username: { type: String, required: true },
    comment: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
