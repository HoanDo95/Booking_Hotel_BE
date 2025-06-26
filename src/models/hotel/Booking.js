const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Liên kết với model User
    required: true,
  },
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room", // Liên kết với model Room
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  check_in: {
    type: Date,
    required: true,
  },
  check_out: {
    type: Date,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    required: true,
    default: "pending",
  },
  breakfast:{
    type: Boolean,
    required: true,
    default:false
  },
  note:{
    type: String,
    default: "",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Tạo model Booking
const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
