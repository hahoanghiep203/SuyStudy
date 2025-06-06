// app/models/siteStat.model.js
const mongoose = require("mongoose");

const SiteStatSchema = new mongoose.Schema({
  // Using a specific document ID for singleton-like behavior
  identifier: { type: String, default: "global_stats", unique: true },
  total_website_views: { type: Number, default: 0 },
  // You might add more detailed stats later if needed
  last_updated: { type: Date, default: Date.now }
});

// Method to increment total views
SiteStatSchema.statics.incrementTotalViews = async function() {
  return this.findOneAndUpdate(
    { identifier: "global_stats" },
    { $inc: { total_website_views: 1 }, $set: { last_updated: new Date() } },
    { upsert: true, new: true } // upsert creates if doesn't exist
  );
};

module.exports = mongoose.model("SiteStat", SiteStatSchema);