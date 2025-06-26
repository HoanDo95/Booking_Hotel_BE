const mongoose = require("mongoose");

const routerManageSchema = new mongoose.Schema({
  method: {type: String, required: true},
  path: {type: String, required: true},
  requireToken: {type: Boolean, default: false},
  status: {type: String, default: "01"},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date},
  deletedAt: {type: Date},
});

module.exports = mongoose.model("RouterManage", routerManageSchema, "router_manage");
