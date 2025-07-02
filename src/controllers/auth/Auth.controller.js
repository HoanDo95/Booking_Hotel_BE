const authServices = require("../../services/auth/Auth.service");
const { resExport } = require("../../enums/resExport");
const { MESSAGE } = require("../../messages/message");
const auth = require("../../middleware/AuthMiddleware");

class AuthController {
  async login(req, res) {
    try {
      const resData = await authServices.login(req.body);
      resExport(MESSAGE.SUCCESS.status, MESSAGE.SUCCESS.message, resData, res);
    } catch (e) {
      resExport(500, e.message, null, res);
    }
  }

  async loginGoogle(req, res) {
    try {
      const resData = await authServices.loginWithGoogle(req.body);
      resExport(MESSAGE.SUCCESS.status, MESSAGE.SUCCESS.message, resData, res);
    } catch (e) {
      resExport(500, e.message, null, res);
    }
  }

  async logout(req, res) {
    try {
      const token = req.header("Authorization");
      await auth.invalidateToken(token);
      resExport(MESSAGE.SUCCESS.status, "Đăng xuất thành công", null, res);
    } catch (e) {
      resExport(500, e.message, null, res);
    }
  }

  async updateNameUser(req, res) {
    try {
      const resData = await authServices.updateNameUser(
        req.params.id,
        req.body
      );
      resExport(200, "full name updated successfully", resData, res);
    } catch (error) {
      resExport(500, error.message, null, res);
    }
  }

  async updateUsername(req, res) {
    try {
      const resData = await authServices.updateUsername(
        req.params.id,
        req.body
      );
      resExport(200, "username updated successfully", resData, res);
    } catch (error) {
      resExport(500, error.message, null, res);
    }
  }

  async updateAvatar(req, res) {
    try {
      const resData = await authServices.updateAvatar(req.params.id, req.body);
      resExport(200, "Avatar updated successfully", resData, res);
    } catch (error) {
      resExport(500, error.message, null, res);
    }
  }

  async updateGender(req, res) {
    try {
      const resData = await authServices.updateGender(req.params.id, req.body);
      resExport(200, "Gender updated successfully", resData, res);
    } catch (error) {
      resExport(500, error.message, null, res);
    }
  }
}

module.exports = new AuthController();
