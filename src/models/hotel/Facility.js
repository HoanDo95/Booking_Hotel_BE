const mongoose = require("mongoose");

const FacilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Tạo model Facility
const Facility = mongoose.model("Facility", FacilitySchema, "facilities");

module.exports = Facility;
