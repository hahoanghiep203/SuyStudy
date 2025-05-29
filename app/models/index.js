// app/models/index.js
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.course = require("./course.model");
db.comment = require("./comment.model");
db.advertisement = require("./advertisement.model");
db.contactSubmission = require("./contactSubmission.model");
db.siteStat = require("./siteStat.model");
db.schedule = require("./schedule.model");       // From previous AI plan
db.userPreference = require("./userPreference.model"); // From previous AI plan


db.ROLES = ["user", "admin"]; // Reflecting your specific roles
// If you decide to keep moderator: db.ROLES = ["user", "admin", "moderator"];

module.exports = db;