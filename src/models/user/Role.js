const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Role = new Schema({
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    color: {type: String},
    description: { type: String, default: "" }, // Mô tả vai trò (optional)
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null }
});

module.exports = mongoose.model("Role", Role, "roles");
