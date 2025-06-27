const express = require("express");
const router = express.Router();
const AdminController = require("../../controllers/admin/Admin.controller");
const FacilityControllers = require("../../controllers/facility/Facility.controller"); // Controller mới cho facility
const { checkPermission } = require("../../middleware/AuthPermission");

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: API dành cho quản trị viên
 */

/**
 * @swagger
 * /admin/role:
 *   get:
 *     summary: Lấy danh sách vai trò (roles)
 *     tags: [Admin]
 */
router.get("/role", checkPermission(["SUPER", "MANAGER_ROLE_ADMIN"]), AdminController.getRole);

/**
 * @swagger
 * /admin/role:
 *   post:
 *     summary: Thêm mới vai trò (roles)
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "user"
 *               code:
 *                 type: string
 *                 example: "ROLE_CODE"
 *               description:
 *                  type: string
 *                  example: "description"
 *               color:
 *                  type: string
 *                  example: "#ff0000"
 */
router.post("/role", checkPermission(["SUPER", "MANAGER_ROLE_ADMIN"]), AdminController.createRole);

/**
 * @swagger
 * /admin/role:
 *   put:
 *     summary: Cập nhật vai trò (roles)
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "user"
 *               description:
 *                  type: string
 *                  example: "description"
 *               color:
 *                  type: string
 *                  example: "#ff0000"
 */
router.put("/role", checkPermission(["SUPER", "MANAGER_ROLE_ADMIN"]), AdminController.updateRole);

/**
 * @swagger
 * /admin/permission:
 *   get:
 *     summary: Lấy danh sách quyền (permissions)
 *     tags: [Admin]
 */
router.get("/permission", checkPermission(["SUPER", "MANAGER_ROLE_ADMIN"]), AdminController.getPermission);

/**
 * @swagger
 * /admin/permission:
 *   post:
 *     summary: Thêm mới quyền (permission)
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "user can do something"
 *               code:
 *                 type: string
 *                 example: "PERMISSION_CODE"
 *               description:
 *                  type: string
 *                  example: "description"
 */
router.post("/permission", checkPermission(["SUPER", "MANAGER_ROLE_ADMIN"]), AdminController.createPermission);

/**
 * @swagger
 * /admin/rolePermission:
 *   get:
 *     summary: Lấy danh sách quyền theo vai trò (role-permissions)
 *     tags: [Admin]
 */
router.get("/rolePermission", checkPermission(["SUPER", "MANAGER_ROLE_ADMIN"]), AdminController.getRolePermission);

/**
 * @swagger
 * /admin/rolePermission:
 *   put:
 *     summary: Cập nhật quyền cho từng role (role_permission)
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "7671DWA((**&...."
 *               permissions:
 *                 type: array
 *                 example: ["PERMISSION_CODE_1", "PERMISSION_CODE_2"]
 */
router.put("/rolePermission", checkPermission(["SUPER", "MANAGER_ROLE_ADMIN"]), AdminController.updateRolePermission);

/**
 * @swagger
 * /admin/booking:
 *   get:
 *     summary: Lấy tất cả đơn đặt phòng
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Trả về danh sách đơn đặt phòng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   facilityId:
 *                     type: string
 *                   startTime:
 *                     type: string
 *                     format: date-time
 *                   endTime:
 *                     type: string
 *                     format: date-time
 *                   status:
 *                     type: string
 *                     enum: [PENDING, APPROVED, REJECTED, COMPLETED]
 */
router.get("/booking", checkPermission(["SUPER", "MANAGER_BOOKING_ADMIN"]), AdminController.getAllBooking);

/**
 * @swagger
 * /admin/booking:
 *   post:
 *     summary: Tạo mới đơn đặt phòng
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "user123"
 *               facilityId:
 *                 type: string
 *                 example: "facility456"
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-03-21T09:00:00Z"
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-03-21T12:00:00Z"
 *               notes:
 *                 type: string
 *                 example: "Họp ban quản lý"
 *     responses:
 *       201:
 *         description: Tạo mới đơn đặt phòng thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post("/booking", checkPermission(["SUPER", "MANAGER_BOOKING_ADMIN"]), AdminController.createNewBooking);

/**
 * @swagger
 * /admin/booking:
 *   put:
 *     summary: Cập nhật đơn đặt phòng
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "booking789"
 *               status:
 *                 type: string
 *                 enum: [PENDING, APPROVED, REJECTED, COMPLETED]
 *                 example: "APPROVED"
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-03-21T10:00:00Z"
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-03-21T13:00:00Z"
 *               notes:
 *                 type: string
 *                 example: "Cập nhật thời gian họp"
 *     responses:
 *       200:
 *         description: Cập nhật đơn đặt phòng thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy đơn đặt phòng
 */
router.put("/booking", checkPermission(["SUPER", "MANAGER_BOOKING_ADMIN"]), AdminController.updateBooking);

/**
 * @swagger
 * /admin/booking/{id}:
 *   get:
 *     summary: Xóa đơn đặt phòng theo ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của đơn đặt phòng
 *     responses:
 *       200:
 *         description: Xóa đơn đặt phòng thành công
 *       404:
 *         description: Không tìm thấy đơn đặt phòng
 */
router.get("/booking/:id", checkPermission(["SUPER", "MANAGER_BOOKING_ADMIN"]), AdminController.deleteBooking);

// Thêm các route cho quản lý vật tư (facility) cùng với Swagger

/**
 * @swagger
 * /admin/facility:
 *   get:
 *     summary: Lấy danh sách vật tư
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Danh sách vật tư
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 */
router.get("/facility", FacilityControllers.getAllFacilities);

/**
 * @swagger
 * /admin/facility/{id}:
 *   get:
 *     summary: Lấy thông tin vật tư theo ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của vật tư
 *     responses:
 *       200:
 *         description: Thông tin vật tư
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Không tìm thấy vật tư
 */
router.get("/facility/:id", FacilityControllers.getFacilityById);

/**
 * @swagger
 * /admin/facility:
 *   post:
 *     summary: Thêm mới vật tư
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Vật tư A"
 *               description:
 *                 type: string
 *                 example: "Mô tả vật tư A"
 *     responses:
 *       201:
 *         description: Vật tư đã được tạo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Lỗi khi tạo vật tư
 */
router.post("/facility", FacilityControllers.createFacility);

/**
 * @swagger
 * /admin/facility/{id}:
 *   put:
 *     summary: Cập nhật vật tư theo ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của vật tư
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Vật tư A cập nhật"
 *               description:
 *                 type: string
 *                 example: "Mô tả cập nhật"
 *     responses:
 *       200:
 *         description: Vật tư đã được cập nhật
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Không tìm thấy vật tư
 *       400:
 *         description: Lỗi khi cập nhật vật tư
 */
router.put("/facility/:id", FacilityControllers.updateFacility);

/**
 * @swagger
 * /admin/facility/{id}:
 *   delete:
 *     summary: Xóa vật tư theo ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của vật tư
 *     responses:
 *       200:
 *         description: Xóa vật tư thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Xóa vật tư thành công"
 *       404:
 *         description: Không tìm thấy vật tư
 *       500:
 *         description: Lỗi khi xóa vật tư
 */
router.delete("/facility/:id", FacilityControllers.deleteFacility);

module.exports = router;