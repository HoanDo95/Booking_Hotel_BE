const mongoose = require("mongoose");

const DiscountSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50,
  },
  discount_percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  valid_from: {
    type: Date,
    required: true,
  },
  valid_to: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "expired", "disabled"],
    required: true,
    default: "active",
  }
});

// Tạo model Discount
const Discount = mongoose.model("Discount", DiscountSchema, "discounts");

module.exports = Discount;
