const {resExport} = require("../../enums/resExport");
const AdminService = require("../../services/admin/Admin.service");
const ManagerBookingService = require("../../services/admin/ManageBooking.service");
const {MESSAGE} = require("../../messages/message");

class AdminController {
    async getRole (req, res){
        try{
            const resData = await AdminService.getAllRole();
            resExport(MESSAGE.SUCCESS.status, MESSAGE.SUCCESS.message, resData, res)
        }catch (e) {
            resExport(MESSAGE.ERROR.status, e.message, null, res);
        }
    }

    async createRole (req, res){
        try{
            const resData = await AdminService.createRole(req.body);
            resExport(MESSAGE.SUCCESS.status, MESSAGE.SUCCESS.message, resData, res)
        }catch (e) {
            resExport(MESSAGE.ERROR.status, e.message, null, res);
        }
    }

    async updateRole (req, res){
        try{
            const resData = await AdminService.updateRole(req.body);
            resExport(MESSAGE.SUCCESS.status, MESSAGE.SUCCESS.message, resData, res)
        }catch (e) {
            resExport(MESSAGE.ERROR.status, e.message, null, res);
        }
    }

    async getRolePermission (req, res){
        try{
            const resData = await AdminService.getRolePermission();
            resExport(MESSAGE.SUCCESS.status, MESSAGE.SUCCESS.message, resData, res)
        }catch (e) {
            resExport(MESSAGE.ERROR.status, e.message, null, res);
        }
    }

    async updateRolePermission (req, res){
        try{
            const resData = await AdminService.updateRolePermission(req.body);
            resExport(MESSAGE.SUCCESS.status, MESSAGE.SUCCESS.message, resData, res)
        }catch (e) {
            resExport(MESSAGE.ERROR.status, e.message, null, res);
        }
    }

    async getPermission (req, res){
        try{
            const resData = await AdminService.getAllPermission();
            resExport(MESSAGE.SUCCESS.status, MESSAGE.SUCCESS.message, resData, res)
        }catch (e) {
            resExport(MESSAGE.ERROR.status, e.message, null, res);
        }
    }

    async createPermission(req, res){
        try{
            const resData = await AdminService.createPermission(req.body);
            resExport(MESSAGE.SUCCESS.status, MESSAGE.SUCCESS.message, resData, res)
        }catch (e) {
            resExport(MESSAGE.ERROR.status, e.message, null, res);
        }
    }

    async getAllBooking(req, res){
        try{
            const resData = await ManagerBookingService.getAllBooking();
            resExport(MESSAGE.SUCCESS.status, MESSAGE.SUCCESS.message, resData, res)
        }catch (e) {
            resExport(MESSAGE.ERROR.status, e.message, null, res);
        }
    }

    async createNewBooking(req, res){
        try{
            const resData = await ManagerBookingService.createBooking(req.body);
            resExport(MESSAGE.SUCCESS.status, MESSAGE.SUCCESS.message, resData, res)
        }catch (e) {
            resExport(MESSAGE.ERROR.status, e.message, null, res);
        }
    }

    async updateBooking(req, res){
        try{
            const resData = await ManagerBookingService.updateBooking(req.body);
            resExport(MESSAGE.SUCCESS.status, MESSAGE.SUCCESS.message, resData, res)
        }catch (e) {
            resExport(MESSAGE.ERROR.status, e.message, null, res);
        }
    }

    async deleteBooking(req, res){
        try{
            const resData = await ManagerBookingService.deleteBooking(req.params.id);
            resExport(MESSAGE.SUCCESS.status, MESSAGE.SUCCESS.message, resData, res)
        }catch (e) {
            resExport(MESSAGE.ERROR.status, e.message, null, res);
        }
    }
}

module.exports = new AdminController();