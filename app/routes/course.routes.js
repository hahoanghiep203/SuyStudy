// app/routes/course.routes.js
const controller = require("../controllers/course.controller"); // Placeholder
const { authJwt } = require("../middlewares"); // Placeholder

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new Course (Admin only)
  app.post(
    "/api/courses",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.create
  );

  // Retrieve all Courses (Public)
  app.get("/api/courses", controller.findAll);

  // Retrieve a single Course by id (Public)
  app.get("/api/courses/:id", controller.findOne);

  // Update a Course by id (Admin only)
  app.put(
    "/api/courses/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update
  );

  // Delete a Course by id (Admin only)
  app.delete(
    "/api/courses/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete
  );
};