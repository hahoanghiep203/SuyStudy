// app/controllers/comment.controller.js
const db = require("../models");
const Comment = db.comment;
const mongoose = require("mongoose"); // Import mongoose for ObjectId validation

// Create a new Comment for a Course
exports.create = (req, res) => {
  const comment = new Comment({
    content_id: req.params.courseId, // From route parameter
    user_id: req.userId, // From auth middleware
    username: req.body.username, // Or get from req.user object set by middleware
    comment_text: req.body.comment_text,
    rating: req.body.rating,
  });

  comment.save()
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Error creating Comment." });
    });
};

// Retrieve all Comments for a Course
exports.findAllForCourse = (req, res) => {
  Comment.find({ content_id: req.params.courseId })
    .populate("user_id", "username") // Optionally populate username from User model
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Error retrieving Comments." });
    });
};

// Retrieve all Comments (global, for admin dashboard)
exports.findAll = (req, res) => {
  db.comment.find()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving comments." }));
};

// Delete a Comment by its id
exports.delete = (req, res) => {
  // Validate ObjectId before attempting to delete
  if (!mongoose.Types.ObjectId.isValid(req.params.commentId)) {
    return res.status(400).send({ message: "Invalid comment ID format." });
  }
  Comment.findByIdAndDelete(req.params.commentId)
    .then(data => {
      if (!data) return res.status(404).send({ message: "Comment not found." });
      res.send({ message: "Comment deleted successfully!" });
    })
    .catch(err => {
      console.error('Error deleting comment:', err); // Log error for debugging
      res.status(500).send({ message: err.message || "Error deleting Comment." });
    });
};
