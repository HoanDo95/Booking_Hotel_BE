const express = require("express");
const {inputValidationRegister} = require("../../middleware/InputValidation");
const router = express.Router();
const RegisterControllers = require("../../controllers/register/Register.controller");

/**
 * @swagger
 * tags:
 *   name: Register
 *   description: API đăng ký tài khoản
 */

/**
 * @swagger
 * /api/register/account:
 *   post:
 *     summary: Đăng ký tài khoản mới
 *     tags: [Register]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "user123"
 *               password:
 *                 type: string
 *                 example: "Password123!"
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               fullname:
 *                 type: string
 *                 example: "Nguyễn Văn A"
 *               phone:
 *                 type: string
 *                 example: "0912345678"
 *     responses:
 *       201:
 *         description: Đăng ký tài khoản thành công, email xác thực đã được gửi
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc tài khoản đã tồn tại
 *       500:
 *         description: Lỗi server
 */
router.post("/account", inputValidationRegister, RegisterControllers.registerUser);

/**
 * @swagger
 * /api/register/verify/{token}:
 *   get:
 *     summary: Xác thực tài khoản từ email
 *     tags: [Register]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token xác thực từ email
 *     responses:
 *       200:
 *         description: Xác thực tài khoản thành công
 *       400:
 *         description: Token không hợp lệ hoặc đã hết hạn
 *       500:
 *         description: Lỗi server
 */
router.get("/verify/:token", RegisterControllers.verifyUser);

module.exports = router;
