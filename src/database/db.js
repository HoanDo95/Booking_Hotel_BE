const mongoose = require('mongoose');
const User = require('../models/user/User');
const RolePermission = require('../models/user/RolePermission');
const Permission = require('../models/user/Permission');
const Role = require('../models/user/Role');
require('dotenv').config()
async function connect(){
  try {
    await mongoose.connect(process.env.URL_DB_DEV);
    console.log("Kết nối cơ sở dữ liệu thành công !!!")
  } catch (error) {
    console.log('Kết nối cơ sở dữ liệu thất bại!!!');
  }
}

async function getPermissionsForUser(userId){
  try {
    const account = await User.findById(userId);
    if(!account){
      return [];
    }
    const rolePermission = await RolePermission.findOne({ roleId: account.roleId }).populate('roleId');
    const permissionId = rolePermission.permissionIds.flat();
    const objectIds = permissionId.map(p => mongoose.Types.ObjectId(p));
    const permissions = await Permission.find({ _id: { $in: objectIds } });
    rolePermission.permissionIds = permissions;
    return permissions.map(p => p.code);
  } catch (error) {
    console.error('Lỗi khi lấy quyền:', error);
    return [];
  }
}

module.exports = {connect, getPermissionsForUser};
