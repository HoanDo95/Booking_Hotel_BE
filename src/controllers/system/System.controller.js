const { resExport } = require("../../enums/resExport");
const systemService = require("../../services/system/System.service");
const { MESSAGE } = require("../../messages/message");

class SystemController {
  async getRouter(req, res) {
    try {
      const resData = await systemService.getAllRoute();
      resExport(MESSAGE.SUCCESS.status, MESSAGE.SUCCESS.message, resData, res);
    } catch (e) {
      resExport(MESSAGE.ERROR.status, e.message, null, res);
    }
  }

  async createNewRoute(req, res) {
    try {
      const resData = await systemService.createRoute(req.body);
      resExport(MESSAGE.SUCCESS.status, MESSAGE.SUCCESS.message, resData, res);
    } catch (e) {
      resExport(MESSAGE.ERROR.status, e.message, null, res);
    }
  }

  async updateRoute(req, res) {
    try {
      const resData = await systemService.updateRoute(req.body);
      resExport(MESSAGE.SUCCESS.status, MESSAGE.SUCCESS.message, resData, res);
    } catch (e) {
      resExport(MESSAGE.ERROR.status, e.message, null, res);
    }
  }

  async deleteRoute(req, res) {
    try {
      const resData = await systemService.deleteRoute(req.params.id);
      resExport(MESSAGE.SUCCESS.status, MESSAGE.SUCCESS.message, resData, res);
    } catch (e) {
      resExport(MESSAGE.ERROR.status, e.message, null, res);
    }
  }

  async getLogRequest(req, res) {
    try {
      const resData = await systemService.getLogRequest(req.query);
      resExport(MESSAGE.SUCCESS.status, MESSAGE.SUCCESS.message, resData, res);
    } catch (e) {
      resExport(MESSAGE.ERROR.status, e.message, null, res);
    }
  }

  async getDashboard(req, res) {
    try {
      const resData = await systemService.getDashBoard();
      resExport(MESSAGE.SUCCESS.status, MESSAGE.SUCCESS.message, resData, res);
    } catch (e) {
      resExport(MESSAGE.ERROR.status, e.message, null, res);
    }
  }

  async getAllLogRequest(req, res) {
    try {
      const resData = await systemService.getLogRequest();
      resExport(200, "Thành công", resData, res);
    } catch (e) {
      resExport(500, e.message, null, res);
    }
  }
}

module.exports = new SystemController();
