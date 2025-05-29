// app/routes/advertisement.routes.js
const controller = require("../controllers/advertisement.controller"); // Placeholder
const { authJwt } = require("../middlewares"); // Placeholder

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new Advertisement (Admin only)
  app.post(
    "/api/advertisements",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.create
  );

  // Retrieve the active Advertisement for popup (Public)
  app.get("/api/advertisements/active", controller.findActive);

  // Retrieve all Advertisements (Admin only - for management)
  app.get(
     "/api/advertisements",
     [authJwt.verifyToken, authJwt.isAdmin],
     controller.findAll
   );

  // Update an Advertisement by id (Admin only)
  app.put(
    "/api/advertisements/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update
  );

  // Delete an Advertisement by id (Admin only)
  app.delete(
    "/api/advertisements/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete
  );
};