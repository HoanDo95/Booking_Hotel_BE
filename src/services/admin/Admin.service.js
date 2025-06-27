const Role = require("../../models/user/Role")
const RolePermission = require("../../models/user/RolePermission")
const Permission = require("../../models/user/Permission")
class AdminService {
    async getAllRole(){
        try{
            const roleList = await Role.find({});
            if(!roleList) throw new Error("Lỗi khi lấy quyền !");
            return roleList;
        }catch (e) {
            throw new Error(e);
        }
    }

    async createRole(data){
        try{
            const {name, code, description, color} = data;
            if(!name || !code){
                throw new Error("Thông tin không hợp lệ !!!");
            }
            const role = await Role.findOne({code: code});
            if(role){
                throw new Error("Mã quyền đã tồn tại !!!");
            }
            const newRole = new Role({name, code, description, color});
            await newRole.save();
            const newRolePermission = new RolePermission({roleId: newRole._id});
            await newRolePermission.save();
            return newRole;
        }catch (e) {
            throw new Error(e);
        }
    }

    async updateRole(dataReq){
        try{
            const {id, name, description, color} = dataReq;
            if(!id || !name){
                throw new Error("Thông tin không hợp lệ !!!");
            }
            const role = await Role.findById(id);
            if(!role) throw new Error("Lỗi khi lấy quyền !");
            role.name = name;
            role.description = description;
            role.color = color;
            role.updatedAt = Date.now();
            await role.save();
            return role;
        }catch (e) {
            throw new Error(e);
        }
    }

    async getAllPermission(){
        try{
            const permissionList = await Permission.find({});
            if(!permissionList) throw new Error("Lỗi khi lấy quyền !");
            return permissionList;
        }catch (e) {
            throw new Error(e);
        }
    }

    async createPermission(data) {
        try{
            const {name, code, description} = data;
            if(!name || !code){
                throw new Error("Thông tin không hợp lệ !!!");
            }
            const permission = await Permission.findOne({code: code});
            if(permission){
                throw new Error("Mã quyền đã tồn tại !!!");
            }
            const newPermission = new Permission({
                name, code, description
            });

            await newPermission.save();
            return newPermission;
        }catch (e) {
            throw new Error(e);
        }
    }

    async getRolePermission(){
        try{
            const rolePermissionList = await RolePermission.find({})
            if(!rolePermissionList) throw new Error("Lỗi khi lấy quyền !")
            return rolePermissionList;
        }catch (e) {
            throw new Error(e);
        }
    }

    async updateRolePermission(data){
        try{
            const {id, permissions} = data;
            const rolePermission = await RolePermission.findById(id);
            if(!rolePermission) throw new Error("Lỗi khi lấy quyền !")
            rolePermission.permissionIds = permissions;
            rolePermission.updatedAt = Date.now();
            await rolePermission.save();
            return rolePermission;
        }catch (e) {
            throw new Error(e);
        }
    }

}

module.exports = new AdminService();