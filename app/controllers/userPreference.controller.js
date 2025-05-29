// app/controllers/userPreference.controller.js
const db = require("../models");
const UserPreference = db.userPreference;

// Create or Update User Preferences for the logged-in user
exports.upsertForUser = (req, res) => {
  UserPreference.findOneAndUpdate(
    { user_id: req.userId }, // Find by user_id
    { ...req.body, user_id: req.userId, last_updated: new Date() }, // Data to insert/update
    { new: true, upsert: true, useFindAndModify: false } // upsert:true creates if not found
  )
    .then(data => res.send({ message: "User preferences saved successfully.", data }))
    .catch(err => res.status(500).send({ message: err.message || "Error saving user preferences." }));
};

// Retrieve User Preferences for the logged-in user
exports.findForUser = (req, res) => {
  UserPreference.findOne({ user_id: req.userId })
    .then(data => {
      if (!data) return res.status(404).send({ message: "User preferences not found. Please set them up." });
      res.send(data);
    })
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving user preferences." }));
};
