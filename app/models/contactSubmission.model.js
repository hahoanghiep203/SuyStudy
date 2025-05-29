// app/models/contactSubmission.model.js
const mongoose = require("mongoose");

const ContactSubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: String,
  message: { type: String, required: true },
  submitted_at: { type: Date, default: Date.now },
  is_read: { type: Boolean, default: false } // For admin tracking
});

module.exports = mongoose.model("ContactSubmission", ContactSubmissionSchema);