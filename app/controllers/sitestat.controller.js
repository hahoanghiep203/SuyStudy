// Backend/app/controllers/sitestat.controller.js
const db = require("../models");
const SiteStat = db.siteStat;

// GET /api/sitestats
exports.getStats = async (req, res) => {
  try {
    const stats = await SiteStat.findOne({ identifier: "global_stats" });
    if (!stats) {
      // If not found, create a new one with default values
      const newStats = new SiteStat();
      await newStats.save();
      return res.send(newStats);
    }
    res.send(stats);
  } catch (err) {
    res.status(500).send({ message: err.message || "Error retrieving site stats." });
  }
};

// POST /api/sitestats/increment
exports.incrementViews = async (req, res) => {
  try {
    const updated = await SiteStat.incrementTotalViews();
    res.send(updated);
  } catch (err) {
    res.status(500).send({ message: err.message || "Error incrementing site views." });
  }
};
