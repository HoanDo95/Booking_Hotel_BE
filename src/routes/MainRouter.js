const express = require("express");
const router = express.Router();
const authRouter = require("./auth/Auth.route");
const ProfileRoute = require("./user/Profile.route");
const DiscountRouter = require("./admin/Discount.route");
const adminRouter = require("./admin/Admin.route");
const paymentRouter = require("./payment/Payment.route");
const systemRouter = require("./system/System.route");
const roomRouter = require("./room/Room.route");
const RegisterRouter = require("./register/Register.route");
const bookingRouter = require("./booking/Booking.route");

router.use("/api/admin", adminRouter);
router.use("/api/admin_discount", DiscountRouter);
router.use("/api/auth", authRouter);
router.use("/api/user", ProfileRoute);
router.use("/api/payment", paymentRouter);
router.use("/api/system", systemRouter);
router.use("/api/room", roomRouter);
router.use("/api/register", RegisterRouter);
router.use("/api/booking", bookingRouter);

module.exports = router;
