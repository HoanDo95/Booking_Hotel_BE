const User = require("../../models/user/User");
const { v4: uuidv4 } = require("uuid");
const secret = require("../../configs/Secrets");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const STATUS_ACCOUNT = require("../../enums/statusAccount");
const Role = require("../../models/user/Role");
require("dotenv").config();

class authService {
  async login(data) {
    try {
      const { username, password } = data;
      const user = await User.findOne({ username }).populate("roleId", "code");

      if (!user) {
        throw new Error("Tài khoản không tồn tại!");
      }

      // Kiểm tra mật khẩu
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Mật khẩu không chính xác!");
      }

      if (user.status === STATUS_ACCOUNT.INACTIVE) {
        throw new Error("Tài khoản chưa được kích hoạt.");
      }

      const token = this.generateToken(user._id, user.roleId.code);
      if (!token) {
        throw new Error("Lỗi khi tạo token!");
      }
      return token;
    } catch (e) {
      throw new Error(e.message);
    }
  }

 

  async getUserByID(userReq) {
    try {
      const user = await User.findById(userReq).populate("roleId", "code name");
      if (!user) {
        throw new Error("Không tìm thấy người dùng!");
      } else {
        return user;
      }
    } catch (e) {
      throw new Error(e);
    }
  }

 

  async updateUsername(id, Data) {
    try {
      const { username } = Data;
      if (!id || !username) {
        throw new Error("All fields are required");
      }
      const data = await User.findById(id);
      if (!data) {
        throw new Error("User is not found");
      }
      const checkdata = await User.findOne({ username: username });
      if (checkdata) {
        throw new Error("username đã tồn tại");
      }
      data.username = username;
      await data.save();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }



  async updateAvatar(id, Data) {
    try {
      const { avatar } = Data;
      if (!id || !avatar) {
        throw new Error("All fields are required");
      }
      const data = await User.findById(id);
      if (!data) {
        throw new Error("User is not found");
      }

      data.avatar = avatar;
      await data.save();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updatePhone(id, Data) {
    try {
      const { phone } = Data;
      if (!id || !phone) {
        throw new Error("All fields are required");
      }
      const data = await User.findById(id);
      if (!data) {
        throw new Error("User is not found");
      }
      const checkdata = await User.findOne({ phone: phone });
      if (checkdata) {
        throw new Error("phone đã tồn tại");
      }
      data.phone = phone;
      await data.save();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateAddress(id, Data) {
    try {
      const { address } = Data;
      if (!id || !address) {
        throw new Error("All fields are required");
      }
      const data = await User.findById(id);
      if (!data) {
        throw new Error("User is not found");
      }

      data.address = address;
      await data.save();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }





}

module.exports = new authService();
