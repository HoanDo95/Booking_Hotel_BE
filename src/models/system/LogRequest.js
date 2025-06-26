const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogRequestSchema = new Schema({
    method: { type: String, required: true }, // GET, POST, PUT, DELETE
    url: { type: String, required: true }, // Endpoint được truy cập
    statusCode: { type: Number, required: true }, // Mã trạng thái HTTP (200, 400, 500,...)
    ip: { type: String, required: true }, // Địa chỉ IP của user
    userAgent: { type: String }, // Thông tin trình duyệt, thiết bị
    headers: { type: Object }, // Lưu header của request (nếu cần)
    requestBody: { type: Object, default: {} }, // Dữ liệu body gửi lên
    responseBody: { type: Object, default: {} }, // Dữ liệu response gửi về
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // ID người dùng (nếu có)
    createdAt: { type: Date, default: Date.now }, // Thời gian request
});

module.exports = mongoose.model("LogRequest", LogRequestSchema, "log_requests");
