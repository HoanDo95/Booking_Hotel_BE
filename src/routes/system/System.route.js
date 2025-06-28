const express = require("express");
const router = express.Router();
const SystemController = require("../../controllers/system/System.controller");
const { checkPermission } = require("../../middleware/AuthPermission");

/**
 * @swagger
 * tags:
 *   name: System
 *   description: API quản lý hệ thống
 */

/**
 * @swagger
 * /api/system/get-all-route:
 *   get:
 *     summary: Lấy danh sách tất cả các route trong hệ thống
 *     tags: [System]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách route thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   path:
 *                     type: string
 *                   method:
 *                     type: string
 *                   requireToken:
 *                     type: boolean
 *                   status:
 *                     type: string
 *       401:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */
router.get(
  "/get-all-route",
  checkPermission(["SUPER", "MANAGER_ROUTER_ADMIN"]),
  SystemController.getRouter
);

/**
 * @swagger
 * /api/system/create-route:
 *   post:
 *     summary: Tạo route mới trong hệ thống
 *     tags: [System]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               path:
 *                 type: string
 *                 example: "/api/example"
 *               method:
 *                 type: string
 *                 example: "GET"
 *                 description: Phương thức HTTP (GET, POST, PUT, DELETE, PATCH hoặc * cho tất cả)
 *               requireToken:
 *                 type: boolean
 *                 example: true
 *                 description: Route có yêu cầu xác thực token hay không
 *     responses:
 *       200:
 *         description: Tạo route thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 path:
 *                   type: string
 *                 method:
 *                   type: string
 *                 requireToken:
 *                   type: boolean
 *                 status:
 *                   type: string
 *       400:
 *         description: Đường dẫn đã tồn tại hoặc dữ liệu không hợp lệ
 *       401:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */
router.post(
  "/create-route",
  checkPermission(["SUPER", "MANAGER_ROUTER_ADMIN"]),
  SystemController.createNewRoute
);

/**
 * @swagger
 * /api/system/update-route:
 *   put:
 *     summary: Cập nhật thông tin route trong hệ thống
 *     tags: [System]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "route123"
 *                 description: ID của route cần cập nhật
 *               path:
 *                 type: string
 *                 example: "/api/example-updated"
 *               method:
 *                 type: string
 *                 example: "POST"
 *                 description: Phương thức HTTP (GET, POST, PUT, DELETE, PATCH hoặc * cho tất cả)
 *               requireToken:
 *                 type: boolean
 *                 example: false
 *                 description: Route có yêu cầu xác thực token hay không
 *               status:
 *                 type: string
 *                 example: "ACTIVE"
 *                 description: Trạng thái của route (ACTIVE, INACTIVE)
 *     responses:
 *       200:
 *         description: Cập nhật route thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 path:
 *                   type: string
 *                 method:
 *                   type: string
 *                 requireToken:
 *                   type: boolean
 *                 status:
 *                   type: string
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Không có quyền truy cập
 *       404:
 *         description: Không tìm thấy route
 *       500:
 *         description: Lỗi server
 */
router.put(
  "/update-route",
  checkPermission(["SUPER", "MANAGER_ROUTER_ADMIN"]),
  SystemController.updateRoute
);

/**
 * @swagger
 * /api/system/delete-route/{id}:
 *   delete:
 *     summary: Xóa route trong hệ thống
 *     tags: [System]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của route cần xóa
 *     responses:
 *       200:
 *         description: Xóa route thành công
 *       401:
 *         description: Không có quyền truy cập
 *       404:
 *         description: Không tìm thấy route
 *       500:
 *         description: Lỗi server
 */
router.delete(
  "/delete-route/:id",
  checkPermission(["SUPER", "MANAGER_ROUTER_ADMIN"]),
  SystemController.deleteRoute
);

/**
 * @swagger
 * /api/system/get-log:
 *   get:
 *     summary: Lấy nhật ký yêu cầu trong hệ thống
 *     tags: [System]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Số trang
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Số lượng bản ghi mỗi trang
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Ngày bắt đầu lọc (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Ngày kết thúc lọc (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Lấy nhật ký yêu cầu thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       userId:
 *                         type: string
 *                       method:
 *                         type: string
 *                       path:
 *                         type: string
 *                       statusCode:
 *                         type: integer
 *                       ipAddress:
 *                         type: string
 *                       userAgent:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */
router.get(
  "/get-log",
  checkPermission(["SUPER"]),
  SystemController.getLogRequest
);

/**
 * @swagger
 * /api/system/dashboard:
 *   get:
 *     summary: Lấy dữ liệu tổng quan cho bảng điều khiển
 *     tags: [System]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy dữ liệu dashboard thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: integer
 *                   description: Tổng số người dùng
 *                 totalActiveUsers:
 *                   type: integer
 *                   description: Tổng số người dùng đang hoạt động
 *                 totalRequests:
 *                   type: object
 *                   properties:
 *                     today:
 *                       type: integer
 *                     week:
 *                       type: integer
 *                     month:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                 topRoutes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       path:
 *                         type: string
 *                       count:
 *                         type: integer
 *                 userGrowth:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                       count:
 *                         type: integer
 *       401:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */
router.get(
  "/dashboard",
  checkPermission(["SUPER"]),
  SystemController.getDashboard
);

router.get(
  "/logRequest/get",
  checkPermission(["SUPER"]),
  SystemController.getAllLogRequest
);

module.exports = router;
