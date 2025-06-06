// app/routes/user.routes.js
const { authJwt } = require("../middlewares"); // We'll create this middleware later
const controller = require("../controllers/user.controller"); // We'll create this controller later

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess); // Publicly accessible content [cite: 91]

  app.get(
    "/api/test/user",
    [authJwt.verifyToken], // Requires a valid token to access [cite: 92]
    controller.userBoard // For users with any role (user, moderator, admin) [cite: 90]
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator], // Requires token and moderator role [cite: 92]
    controller.moderatorBoard // For users with moderator role [cite: 90]
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin], // Requires token and admin role [cite: 92]
    controller.adminBoard // For users with admin role [cite: 90]
  );
};