// app/routes/comment.routes.js
const controller = require("../controllers/comment.controller"); // Placeholder
const { authJwt } = require("../middlewares"); // Placeholder

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new Comment for a Course (Authenticated users)
  // :courseId will be part of req.params
  app.post(
    "/api/courses/:courseId/comments",
    [authJwt.verifyToken],
    controller.create
  );

  // Retrieve all Comments for a Course (Public)
  app.get("/api/courses/:courseId/comments", controller.findAllForCourse);

  // Retrieve all Comments (Global, for admin dashboard)
  app.get("/api/comments", controller.findAll);

  // Delete a Comment by its id (Admin or Comment Owner)
  // You'll need a middleware like authJwt.isOwnerOrAdmin for this
  app.delete(
    "/api/comments/:commentId",
    [authJwt.verifyToken, authJwt.isOwnerOrAdmin],
    controller.delete
  );
};