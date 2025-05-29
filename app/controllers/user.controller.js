// app/controllers/user.controller.js

// Public content
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content."); // [cite: 84]
};

// User-specific content (requires login)
exports.userBoard = (req, res) => {
  res.status(200).send("User Content."); // [cite: 84]
};

// Moderator-specific content (requires login and moderator role)
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content."); // [cite: 84]
};

// Admin-specific content (requires login and admin role)
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content."); // [cite: 84]
};