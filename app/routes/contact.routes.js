// app/routes/contact.routes.js
const controller = require("../controllers/contact.controller"); // Placeholder
const { authJwt } = require("../middlewares"); // Placeholder

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Submit a new Contact Form message (Public)
  app.post("/api/contact", controller.submit);

  // Retrieve all Contact Submissions (Admin only)
  app.get(
    "/api/contact-submissions",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findAll
  );

  // Delete a Contact Submission by id (Admin only)
  app.delete(
    "/api/contact-submissions/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete
  );
};