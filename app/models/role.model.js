// app/models/role.model.js
const mongoose = require("mongoose");

const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: String // "user", "admin"
  })
);

module.exports = Role;