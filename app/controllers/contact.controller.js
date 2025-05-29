// app/controllers/contact.controller.js
const db = require("../models");
const ContactSubmission = db.contactSubmission;

// Submit a new Contact Form message
exports.submit = (req, res) => {
  const submission = new ContactSubmission(req.body);
  submission.save()
    .then(data => res.status(201).send({ message: "Contact form submitted successfully!", data }))
    .catch(err => res.status(500).send({ message: err.message || "Error submitting contact form." }));
};

// Retrieve all Contact Submissions
exports.findAll = (req, res) => {
  ContactSubmission.find().sort({ submitted_at: -1 })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving contact submissions." }));
};

// Delete a Contact Submission by id
exports.delete = (req, res) => {
  ContactSubmission.findByIdAndRemove(req.params.id)
    .then(data => {
      if (!data) return res.status(404).send({ message: "Contact submission not found." });
      res.send({ message: "Contact submission deleted successfully!" });
    })
    .catch(err => res.status(500).send({ message: err.message || "Error deleting contact submission." }));
};
