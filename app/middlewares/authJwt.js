// app/middlewares/authJwt.js
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js"); // Your JWT secret
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id; // Save the decoded user ID to the request object
    next();
  });
};

isAdmin = async (req, res, next) => { // Made async
  try {
    const user = await User.findById(req.userId); // Use await
    if (!user) {
      res.status(404).send({ message: "User not found for admin check." });
      return;
    }

    const roles = await Role.find({ _id: { $in: user.roles } }); // Use await
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }

    res.status(403).send({ message: "Require Admin Role!" });
  } catch (err) {
    res.status(500).send({ message: err.message || "Error checking admin role." });
  }
};

isModerator = async (req, res, next) => { // Made async
  try {
    const user = await User.findById(req.userId); // Use await
    if (!user) {
      res.status(404).send({ message: "User not found for moderator check." });
      return;
    }

    const roles = await Role.find({ _id: { $in: user.roles } }); // Use await
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        next();
        return;
      }
    }

    res.status(403).send({ message: "Require Moderator Role!" });
  } catch (err) {
    res.status(500).send({ message: err.message || "Error checking moderator role." });
  }
};

// Middleware: allow if admin or comment owner
isOwnerOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found for permission check." });
    }
    const roles = await Role.find({ _id: { $in: user.roles } });
    const isAdmin = roles.some(role => role.name === "admin");
    if (isAdmin) {
      return next();
    }
    // Only check ownership if not admin
    const commentId = req.params.commentId;
    const Comment = db.comment;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).send({ message: "Comment not found." });
    }
    if (comment.user_id.toString() === req.userId) {
      return next();
    }
    return res.status(403).send({ message: "Require admin or comment owner rights." });
  } catch (err) {
    return res.status(500).send({ message: err.message || "Error checking permissions." });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  isOwnerOrAdmin
};
module.exports = authJwt;
