require("dotenv").config();
const nodemailer = require("nodemailer");

// Khởi tạo transporter để gửi email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Hàm gửi email xác minh
const sendVerificationEmail = async (username, email, verificationLink) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Xác minh tài khoản",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <div style="text-align: center; padding-bottom: 20px;">
          <img src="" alt="LuxStay Logo" style="width: 150px; height: auto;" />
        </div>
        <div style="background-color: #ffffff; padding: 20px; border-radius: 8px;">
          <h2 style="color: #2988BC; text-align: center;">Xác minh tài khoản</h2>
          <p style="color: #333; font-size: 16px; text-align: center;">
            Xin chào <strong>${username}</strong>,
          </p>
          <p style="color: #333; font-size: 16px; text-align: center;">
            Cảm ơn bạn đã đăng ký tại LuxStay. Để hoàn tất quá trình đăng ký, vui lòng nhấp vào nút bên dưới để xác minh địa chỉ email của bạn.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}" style="background-color: #2988BC; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">Xác minh ngay</a>
          </div>
          <p style="color: #333; font-size: 14px; text-align: center;">
            Nếu bạn không thực hiện đăng ký, vui lòng bỏ qua email này.
          </p>
        </div>
        <div style="text-align: center; padding-top: 20px; color: #999; font-size: 12px;">
          <p>&copy; 2024 LuxStay. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email xác minh đã được gửi tới:", email);
  } catch (error) {
    throw new Error("Không thể gửi email xác minh: " + error.message);
  }
};

// Hàm gửi mail hủy phòng
const sendCancelBookingEmail = async (booking, refundAmount) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: booking.email,
    subject: "Hủy phòng",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <div style="text-align: center; padding-bottom: 20px;">
          <img src="" alt="LuxStay Logo" style="width: 150px; height: auto;" />
        </div>
        <div style="background-color: #ffffff; padding: 20px; border-radius: 8px;">
          <h2 style="color: #2988BC; text-align: center;">Thông tin hủy phòng</h2>
          <p style="color: #333; font-size: 16px; text-align: center;">
            Xin chào <strong>${booking.customerName}</strong>,
          </p>
          <p style="color: #333; font-size: 16px; text-align: center;">
            Đặt phòng của bạn tại <strong>${
              booking.hotelName
            }</strong> đã được hủy thành công.
          </p>
          <p style="color: #333; font-size: 16px; text-align: center;">
            Ngày nhận phòng: <strong>${booking.checkIn}</strong><br />
            Ngày trả phòng: <strong>${booking.checkOut}</strong><br />
            Loại phòng: <strong>${booking.roomType}</strong>
          </p>
          <p style="color: #333; font-size: 16px; text-align: center;">
            Số tiền bạn đã thanh toán: <strong>${
              booking.totalAmount
            } VND</strong><br />
            
            Quý khách đã yêu cầu hủy đặt phòng ${
              booking.code
            }. Theo chính sách của chúng tôi, chúng tôi sẽ hoàn lại <strong>${
      refundAmount ? refundAmount : 0
    } VND</strong> tiền đặt cọc vào tài khoản/thẻ thanh toán trong vòng 3-5 ngày làm việc.
            Phương thức thanh toán: <strong>${booking.paymentMethod}</strong>
          </p>
          <p style="color: #333; font-size: 14px; text-align: center;">
            Số tiền sẽ được hoàn vào tài khoản bạn đã sử dụng để thanh toán.
          </p>
        </div>
        <div style="text-align: center; padding-top: 20px; color: #999; font-size: 12px;">
          <p>&copy; 2024 LuxStay. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    `,
  };

  try {
    console.log("Email hủy phòng đã được gửi tới:", booking.email);
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Không thể gửi email hủy phòng: " + error.message);
  }
};

module.exports = { sendVerificationEmail, sendCancelBookingEmail };
