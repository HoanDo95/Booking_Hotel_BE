const mongoose = require("mongoose");
const RoomSchema = new mongoose.Schema({
  hotel_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel", // Liên kết với model Hotel
    required: true,
  },
  room_number: {
    type: String,
    required: true,
    maxlength: 20,
  },
  type: {
    type: String,
    enum: ["single", "double", "suite", "family"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  capacity: {
    type: Number,
    required: true,
    min: 1,
  },
  status: {
    type: String,
    enum: ["available", "booked", "maintenance"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  facility_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Facility", // Liên kết với model Hotel
      required: true,
    },
  ],
  images: [{ type: String }],
  isDeleted: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Tạo model Room
const Room = mongoose.model("Room", RoomSchema, "rooms");

module.exports = Room;
