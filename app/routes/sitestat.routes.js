// Backend/app/routes/sitestat.routes.js
const controller = require("../controllers/sitestat.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Get global site stats (total views, etc.)
  app.get("/api/sitestats", controller.getStats);

  // Increment website view count
  app.post("/api/sitestats/increment", controller.incrementViews);
};
