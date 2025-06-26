const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  address: {
    type: String,
    required: true,
    maxlength: 255,
  },
  city: {
    type: String,
    required: true,
    maxlength: 100,
  },
  phone: {
    type: String,
    required: true,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
    match: [/^\S+@\S+\.\S+$/, "Email không hợp lệ"], // Kiểm tra email hợp lệ
  },
  rating: {
    type: Number,
    required: false,
    min: 0,
    max: 10, // Giới hạn rating tối đa là 10
  },
  description: {
    type: String,
  },
  images: [{ type: String }],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Tạo model Hotel
module.exports = mongoose.model("Hotel", HotelSchema, "hotels");
