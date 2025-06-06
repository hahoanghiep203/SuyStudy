// app/controllers/schedule.controller.js
const db = require("../models");
const Schedule = db.schedule;

// Create a new Schedule item for the logged-in user
exports.create = (req, res) => {
  const scheduleItem = new Schedule({
    ...req.body,
    user_id: req.userId // From auth middleware
  });
  scheduleItem.save()
    .then(data => res.status(201).send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error creating schedule item." }));
};

// Retrieve all Schedule items for the logged-in user
exports.findAllForUser = (req, res) => {
  Schedule.find({ user_id: req.userId }).sort({ start_time: 1 })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving schedule items." }));
};

// Update a Schedule item by id (ensure ownership)
exports.update = (req, res) => {
  Schedule.findOneAndUpdate(
    { _id: req.params.id, user_id: req.userId }, // Ensures only the owner can update
    req.body,
    { new: true, useFindAndModify: false }
  )
    .then(data => {
      if (!data) return res.status(404).send({ message: "Schedule item not found or user not authorized." });
      res.send({ message: "Schedule item updated successfully.", data });
    })
    .catch(err => res.status(500).send({ message: err.message || "Error updating schedule item." }));
};

// Delete a Schedule item by id (ensure ownership)
exports.delete = (req, res) => {
  Schedule.findOneAndRemove({ _id: req.params.id, user_id: req.userId }) // Ensures only the owner can delete
    .then(data => {
      if (!data) return res.status(404).send({ message: "Schedule item not found or user not authorized." });
      res.send({ message: "Schedule item deleted successfully!" });
    })
    .catch(err => res.status(500).send({ message: err.message || "Error deleting schedule item." }));
};
