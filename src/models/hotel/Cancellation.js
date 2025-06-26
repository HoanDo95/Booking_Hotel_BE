const mongoose = require("mongoose");

const CancellationSchema = new mongoose.Schema({
  booking_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  cancelled_at: {
    type: Date,
    default: Date.now,
  },
});

// Tạo model Cancellation
const Cancellation = mongoose.model("Cancellation", CancellationSchema);

module.exports = Cancellation;
