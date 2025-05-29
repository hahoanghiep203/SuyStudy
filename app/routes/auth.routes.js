// app/routes/auth.routes.js
const { verifySignUp } = require("../middlewares"); // We'll create this middleware later
const controller = require("../controllers/auth.controller"); // We'll create this controller later

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail, // Middleware to check for duplicate username/email [cite: 89]
      verifySignUp.checkRolesExisted // Middleware to check if specified roles exist [cite: 89]
    ],
    controller.signup // Controller function for signup [cite: 89]
  );

  app.post("/api/auth/signin", controller.signin); // Controller function for signin [cite: 89]
};