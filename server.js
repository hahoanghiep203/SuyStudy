// server.js
const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081" // Adjust for your frontend
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    // useNewUrlParser: true, // Deprecated
    // useUnifiedTopology: true // Deprecated
  })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    initial(); // Creates roles if DB is empty
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the website backend." });
});

// ROUTES
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app); // Example routes from tutorial
require('./app/routes/course.routes')(app); // New
require('./app/routes/comment.routes')(app); // New
require('./app/routes/advertisement.routes')(app); // New
require('./app/routes/contact.routes')(app); // New
require('./app/routes/schedule.routes')(app); // New
require('./app/routes/userPreference.routes')(app); // New
require('./app/routes/sitestat.routes')(app);

async function initial() { // Modified to use async/await
  try {
    const count = await Role.estimatedDocumentCount();
    if (count === 0) {
      // Use Promise.all to handle multiple save operations concurrently
      await Promise.all(db.ROLES.map(roleName => {
        return new Role({ name: roleName }).save();
      }));
      console.log("Added initial roles to roles collection");
      db.ROLES.forEach(roleName => {
        console.log(`added '${roleName}' to roles collection`);
      });
    }
  } catch (err) {
    console.log("error during initial role setup", err);
  }
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});