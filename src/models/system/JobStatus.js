const mongoose = require("mongoose");

const jobStatusSchema = new mongoose.Schema({
    lastRunDate: { type: String, required: true }  // Lưu dạng "YYYY-MM-DD"
});

const JobStatus = mongoose.model("JobStatus", jobStatusSchema);

module.exports = JobStatus;
