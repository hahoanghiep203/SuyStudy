// app/controllers/auth.controller.js
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => { // Made async
  try {
    const user = new User({
      username: req.body.username,
      // email: req.body.email, // Uncomment if you added email to your user model
      password: bcrypt.hashSync(req.body.password, 8)
    });

    const savedUser = await user.save(); // Use await

    if (req.body.roles) {
      const roles = await Role.find({ name: { $in: req.body.roles } }); // Use await
      savedUser.roles = roles.map(role => role._id);
      await savedUser.save(); // Use await
      res.send({ message: "User was registered successfully!" });
    } else {
      const role = await Role.findOne({ name: "user" }); // Use await
      if (!role) {
        // This case should ideally be handled by the initial() function in server.js
        // or by ensuring the 'user' role always exists.
        res.status(500).send({ message: "Default 'user' role not found. Please ensure it exists in the database." });
        return;
      }
      savedUser.roles = [role._id];
      await savedUser.save(); // Use await
      res.send({ message: "User was registered successfully!" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message || "An error occurred during user registration." });
  }
};

exports.signin = async (req, res) => { // Made async
  try {
    const user = await User.findOne({ username: req.body.username }).populate("roles", "-__v"); // Use await

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    const token = jwt.sign({ id: user.id },
      config.secret,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true, // Consider if this is truly needed for your security model
        expiresIn: 86400 // 24 hours
      });

    var authorities = [];
    for (let i = 0; i < user.roles.length; i++) {
      authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    }
    res.status(200).send({
      id: user._id,
      username: user.username,
      // email: user.email, // Uncomment if you have email
      roles: authorities,
      accessToken: token
    });
  } catch (err) {
    res.status(500).send({ message: err.message || "An error occurred during sign in." });
  }
};