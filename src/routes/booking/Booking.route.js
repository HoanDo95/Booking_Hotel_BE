const express = require("express");
const router = express.Router();
const BookingController = require("../../controllers/booking/Booking.controller");

/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: API quản lý đặt phòng
 */

/**
 * @swagger
 * /api/booking/{userId}:
 *   get:
 *     summary: Lấy danh sách đặt phòng của người dùng
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của người dùng
 *         example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách đặt phòng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   userId:
 *                     type: integer
 *                   roomId:
 *                     type: integer
 *                   checkInDate:
 *                     type: string
 *                     format: date
 *                   checkOutDate:
 *                     type: string
 *                     format: date
 *                   status:
 *                     type: string
 *                   totalPrice:
 *                     type: number
 *                   room:
 *                     type: object
 *       401:
 *         description: Không có quyền truy cập
 *       404:
 *         description: Không tìm thấy thông tin đặt phòng
 *       500:
 *         description: Lỗi server
 */
router.get("/user/:userId", BookingController.getBookingByUser);

/**
 * @swagger
 * /api/booking/{id}:
 *   get:
 *     summary: Lấy thông tin đặt phòng theo ID
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của đơn đặt phòng
 *         example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy thông tin đặt phòng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 userId:
 *                   type: integer
 *                 roomId:
 *                   type: integer
 *                 checkInDate:
 *                   type: string
 *                   format: date
 *                 checkOutDate:
 *                   type: string
 *                   format: date
 *                 status:
 *                   type: string
 *                 totalPrice:
 *                   type: number
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Không có quyền truy cập
 *       404:
 *         description: Không tìm thấy thông tin đặt phòng
 *       500:
 *         description: Lỗi server
 */
router.get("/:id", BookingController.getBoookingById);

/**
 * @swagger
 * /api/booking/create:
 *   post:
 *     summary: Tạo đơn đặt phòng mới
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               roomId:
 *                 type: integer
 *                 example: 2
 *               checkInDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-06-01"
 *               checkOutDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-06-05"
 *               guestCount:
 *                 type: integer
 *                 example: 2
 *               discountCode:
 *                 type: string
 *                 example: "SUMMER2023"
 *     responses:
 *       201:
 *         description: Tạo đơn đặt phòng thành công
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc phòng không còn trống
 *       401:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */
router.post("/create", BookingController.createBooking);

/**
 * @swagger
 * /api/booking/update-status:
 *   put:
 *     summary: Cập nhật trạng thái đơn đặt phòng
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookingId:
 *                 type: integer
 *                 example: 1
 *               status:
 *                 type: string
 *                 example: "CONFIRMED"
 *     responses:
 *       200:
 *         description: Cập nhật trạng thái thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Không có quyền truy cập
 *       404:
 *         description: Không tìm thấy đơn đặt phòng
 *       500:
 *         description: Lỗi server
 */
router.put("/update-status", BookingController.updateStatusBooking);

/**
 * @route PUT /api/booking/cancel-booking
 * @description Cancel booking after user book room
 * @access Private (Admin or Owner)
 */
router.put("/cancel-booking", BookingController.cancelBooking);
router.get("/getByCode/:code", BookingController.getBookingByCode)

router.post("/updatePayment", BookingController.updatePaymentStatus)

module.exports = router;
