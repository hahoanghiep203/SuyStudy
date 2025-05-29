// app/models/advertisement.model.js
const mongoose = require("mongoose");

const AdvertisementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image_url: String,
  target_url: String, // Link the ad leads to
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }, // If ad is for a specific "Course/Product"
  is_active: { type: Boolean, default: true }, // To enable/disable ads
  display_count: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Advertisement", AdvertisementSchema);