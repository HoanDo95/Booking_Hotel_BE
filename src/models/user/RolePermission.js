const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RolePermissionSchema = new Schema({
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
    permissionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null }
});

module.exports = mongoose.model("RolePermission", RolePermissionSchema, "role_permissions");
