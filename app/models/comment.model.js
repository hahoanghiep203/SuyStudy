// app/models/comment.model.js
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  content_id: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true }, // Links to course/article
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  // Storing username for easier display, but user_id is the source of truth
  username: { type: String, required: true },
  comment_text: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 }, // Optional rating
  created_at: { type: Date, default: Date.now },
  is_approved: { type: Boolean, default: true } // For potential moderation by admin
});

module.exports = mongoose.model("Comment", CommentSchema);