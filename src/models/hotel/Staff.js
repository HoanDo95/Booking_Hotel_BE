const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Liên kết với model User
    required: true,
  },
  hotel_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel", // Liên kết với model Hotel
    required: true,
  },
  position: {
    type: String,
    required: true,
    trim: true,
  },
  salary: {
    type: Number,
    required: true,
    min: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Tạo model Staff
const Staff = mongoose.model("Staff", StaffSchema);

module.exports = Staff;
