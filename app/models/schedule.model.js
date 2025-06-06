// app/models/schedule.model.js
const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  task_title: { type: String, required: true },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'skipped_by_user', 'rescheduled_by_ai'],
    default: 'pending'
  },
  is_ai_generated: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Schedule", ScheduleSchema);