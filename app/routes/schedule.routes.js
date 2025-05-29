// app/routes/schedule.routes.js
const controller = require("../controllers/schedule.controller"); // Placeholder
const { authJwt } = require("../middlewares"); // Placeholder

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new Schedule item for the logged-in user (Authenticated users)
  app.post(
    "/api/schedules",
    [authJwt.verifyToken],
    controller.create
  );

  // Retrieve all Schedule items for the logged-in user (Authenticated users)
  app.get(
    "/api/schedules/me", // "me" indicates current authenticated user
    [authJwt.verifyToken],
    controller.findAllForUser
  );

  // Update a Schedule item by id (Authenticated user - owner)
  app.put(
    "/api/schedules/:id",
    [authJwt.verifyToken /*, authJwt.isOwner */], // Middleware to check ownership
    controller.update
  );

  // Delete a Schedule item by id (Authenticated user - owner)
  app.delete(
    "/api/schedules/:id",
    [authJwt.verifyToken /*, authJwt.isOwner */], // Middleware to check ownership
    controller.delete
  );
};