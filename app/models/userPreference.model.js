// app/models/userPreference.model.js
const mongoose = require("mongoose");

const UserPreferenceSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  learning_goals: [String],
  preferred_skills_to_learn: [String],
  time_commitment_hours_per_week: Number,
  availability_slots: [
    {
      day_of_week: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
      start_time_hours: Number, // 0-23
      end_time_hours: Number   // 0-23
    }
  ],
  preferred_learning_style: { type: String, enum: ['visual', 'auditory', 'reading/writing', 'kinesthetic', 'mixed'], optional: true },
  last_updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("UserPreference", UserPreferenceSchema);