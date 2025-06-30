require("dotenv").config();
const nodemailer = require("nodemailer");
const RegisterService = require("../../services/register/Register.service");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Role = require("../../models/user/Role"); // Import model Role
const { sendVerificationEmail } = require("../../configs/EmailServices"); // Điều chỉnh đường dẫn nếu cần

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("req", req.body);

    const emailExist = await RegisterService.findUserByEmail(email);
    if (emailExist) return res.status(400).json({ error: "Email đã tồn tại" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationToken = crypto.randomBytes(32).toString("hex");
    // Tìm vai trò "customer"
    const customerRole = await Role.findOne({ code: "GUEST_ROLE_MEMBER" });
    let roleIdToAssign = null; // Khởi tạo roleId

    if (customerRole) {
      roleIdToAssign = customerRole._id; // Lấy ObjectId của vai trò "customer"
    } else {
      // Xử lý nếu không tìm thấy vai trò "customer"
      return res.status(500).json({
        error:
          "Không tìm thấy vai trò 'customer' mặc định. Vui lòng liên hệ quản trị viên.",
      });
    }
    // Tạo người dùng mới
    const userData = {
      username,
      email,
      password: hashedPassword,
      roleId: roleIdToAssign, // Gán ObjectId của vai trò "customer"
      verified: false,
      verificationToken,
      status: "00"
    };

    await RegisterService.createUser(userData);

    const verificationLink = `${req.protocol}://${req.get(
      "host"
    )}/api/register/verify/${verificationToken}`;

    // Gửi email xác minh bằng hàm tái sử dụng
    await sendVerificationEmail(username, email, verificationLink);

    return res.json({
      message:
        "Đăng ký thành công, vui lòng kiểm tra email để xác minh tài khoản",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const { token } = req.params;

    // Tìm người dùng theo token xác minh
    const user = await RegisterService.findUserByToken(token);
    if (!user) return res.status(400).json({ error: "Token không hợp lệ" });

    // Xác minh tài khoản
    user.verified = true;
    user.verificationToken = null; // Xóa token sau khi xác minh
    user.status = "01"; // Xóa token sau khi xác minh
    await user.save();

    res.json({
      message: "Tài khoản đã được xác minh thành công, bạn có thể đăng nhập",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
