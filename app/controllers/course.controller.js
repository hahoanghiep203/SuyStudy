// app/controllers/course.controller.js
const db = require("../models");
const Course = db.course;

// Create and Save a new Course
exports.create = (req, res) => {
  const course = new Course({
    title: req.body.title,
    content_code: req.body.content_code,
    description: req.body.description,
    body: req.body.body,
    skill_tags: req.body.skill_tags,
    view_count: 0,
    // author_id: req.userId, // Assuming req.userId is set by auth middleware for admin
    // ... other fields
  });

  course.save()
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Error creating Course." });
    });
};

// Retrieve all Courses
exports.findAll = (req, res) => {
  Course.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Error retrieving Courses." });
    });
};

// Retrieve a single Course by id
exports.findOne = (req, res) => {
  Course.findById(req.params.id)
    .then(data => {
      if (!data) return res.status(404).send({ message: "Course not found." });
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Error retrieving Course." });
    });
};

// Update a Course by id
exports.update = (req, res) => {
  Course.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false })
    .then(data => {
      if (!data) return res.status(404).send({ message: "Course not found." });
      res.send({ message: "Course updated successfully.", data });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Error updating Course." });
    });
};

// Delete a Course by id
exports.delete = (req, res) => {
  Course.findByIdAndRemove(req.params.id)
    .then(data => {
      if (!data) return res.status(404).send({ message: "Course not found." });
      res.send({ message: "Course deleted successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Error deleting Course." });
    });
};
