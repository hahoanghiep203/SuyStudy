// app/models/course.model.js (or content.model.js)
const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  // 'ma_noi_dung' can be the _id or a custom unique field
  content_code: { type: String, unique: true, sparse: true }, // Optional custom ID
  description: String,
  body: String, // For article content or detailed product description
  // Fields from AI learning plan
  skill_tags: [String],
  estimated_total_duration_hours: Number,
  lessons: [ // If it's a course structure
    {
      lesson_title: { type: String, required: true },
      lesson_content_link: String,
      estimated_lesson_duration_minutes: Number,
    }
  ],
  view_count: { type: Number, default: 0 }, // For "Hiển thị số lượng view"
  author_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Link to creator
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Course", CourseSchema);