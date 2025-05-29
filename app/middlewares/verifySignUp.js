// app/middlewares/verifySignUp.js
const db = require("../models");
const ROLES = db.ROLES; // Defined in app/models/index.js
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => { // Made async
  // Check if req.body is populated
  if (!req.body) {
    console.error("verifySignUp.js: req.body is undefined. Ensure express.json() middleware is used correctly in server.js and client is sending appropriate Content-Type header and body.");
    res.status(400).send({ message: "Request body is missing or not parsed. Please ensure you are sending a JSON payload with 'Content-Type: application/json'." });
    return;
  }
  // Check if username is provided in the body
  if (typeof req.body.username === 'undefined') {
    res.status(400).send({ message: "Failed! Username is required in the request body." });
    return;
  }

  try {
    // Username Check
    const userByUsername = await User.findOne({ username: req.body.username });
    if (userByUsername) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email Check (only if email is provided in the request body)
    if (req.body.email) {
      const userByEmail = await User.findOne({ email: req.body.email });
      if (userByEmail) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }
    }

    next(); // Proceed if no duplicates are found
  } catch (err) {
    res.status(500).send({ message: err.message || "Error checking duplicate username/email." });
  }
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;
