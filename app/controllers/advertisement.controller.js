// app/controllers/advertisement.controller.js
const db = require("../models");
const Advertisement = db.advertisement;

// Create a new Advertisement
exports.create = (req, res) => {
  const advertisement = new Advertisement(req.body);
  advertisement.save()
    .then(data => res.status(201).send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error creating Advertisement." }));
};

// Retrieve the active Advertisement for popup
exports.findActive = (req, res) => {
  Advertisement.findOne({ is_active: true }).sort({ created_at: -1 }) // Get the newest active one
    .then(data => {
      if (!data) return res.status(404).send({ message: "No active advertisement found." });
      res.send(data);
    })
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving active Advertisement." }));
};

// Retrieve all Advertisements
exports.findAll = (req, res) => {
  Advertisement.find()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving Advertisements." }));
};

// Update an Advertisement by id
exports.update = (req, res) => {
  Advertisement.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false })
    .then(data => {
      if (!data) return res.status(404).send({ message: "Advertisement not found." });
      res.send({ message: "Advertisement updated successfully.", data });
    })
    .catch(err => res.status(500).send({ message: err.message || "Error updating Advertisement." }));
};

// Delete an Advertisement by id
exports.delete = (req, res) => {
  Advertisement.findByIdAndRemove(req.params.id)
    .then(data => {
      if (!data) return res.status(404).send({ message: "Advertisement not found." });
      res.send({ message: "Advertisement deleted successfully!" });
    })
    .catch(err => res.status(500).send({ message: err.message || "Error deleting Advertisement." }));
};
