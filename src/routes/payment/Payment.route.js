const express = require("express");
const router = express.Router();
const PaymentController = require("../../controllers/payment/Payment.controller");
const { checkPermission } = require("../../middleware/AuthPermission");

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: API thanh toán
 */

/**
 * @swagger
 * /api/payment/create-url-vnpay:
 *   post:
 *     summary: Tạo URL thanh toán VNPay
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Số tiền cần thanh toán
 *                 example: 1500000
 *               bookingId:
 *                 type: integer
 *                 description: ID của đơn đặt phòng
 *                 example: 1
 *               description:
 *                 type: string
 *                 description: Mô tả thanh toán
 *                 example: "Thanh toán đặt phòng #1"
 *               ipAddress:
 *                 type: string
 *                 description: Địa chỉ IP của người dùng
 *                 example: "127.0.0.1"
 *     responses:
 *       200:
 *         description: Tạo URL thanh toán thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 paymentUrl:
 *                   type: string
 *                   description: URL thanh toán VNPay
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi server
 */
router.post("/create-url-vnpay", PaymentController.createPayment)



router.get("/", PaymentController.getAllPaymetns);

router.delete('/:id',PaymentController.deletePayment);

router.get('/user/:userId', PaymentController.getPaymentsByUserId);


module.exports = router;
