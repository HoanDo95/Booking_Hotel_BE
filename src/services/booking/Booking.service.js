const { sendCancelBookingEmail } = require("../../configs/EmailServices");
const Booking = require("../../models/hotel/Booking");
const Payment = require("../../models/hotel/Payment");
const Room = require("../../models/hotel/Room");

class BookingService {
  generateRandomCode() {
    const prefix = "BKHT-";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomCode = "";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomCode += characters[randomIndex];
    }

    return prefix + randomCode;
  }

  async createBooking(bookingData) {
    try {
      const {
        user_id,
        room_id,
        checkin_date,
        checkout_date,
        totalPrice,
        status,
        breakfast,
        payment_method,
        note,
      } = bookingData;

      if (
        !user_id ||
        !room_id ||
        !checkin_date ||
        !checkout_date ||
        !totalPrice
      ) {
        throw new Error("All fields are required");
      }

      let code;
      let isUnique = false;

      while (!isUnique) {
        code = this.generateRandomCode();
        const existingBooking = await Booking.findOne({ code: code });
        if (!existingBooking) {
          isUnique = true;
        }
      }

      const checkBooking = await Booking.findOne({
        user_id: user_id,
        room_id: room_id,
        checkin_date: { $lte: checkout_date },
        checkout_date: { $gte: checkin_date },
        status: { $ne: "cancelled" },
      });
      if (checkBooking) {
        throw new Error("Room is already booked for the selected dates");
      }

      const newBooking = new Booking({
        user_id: user_id,
        room_id: room_id,
        check_in: checkin_date,
        check_out: checkout_date,
        total_price: totalPrice,
        status: status ? status : "pending",
        breakfast: breakfast ? breakfast : false,
        code: code,
        note: note ? note : "",
      });

      await newBooking.save();

      const newPayment = new Payment({
        booking_id: newBooking._id,
        amount: totalPrice,
        method: payment_method ? payment_method : "vnpayqr",
      });

      await newPayment.save();

      const dataRoom = await Room.findById(room_id);
      dataRoom.status = "booked";
      await dataRoom.save();

      return newBooking;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateStatusBooking(bookingData) {
    try {
      const { id, status } = bookingData;
      if (!id || !status) {
        throw new Error("All fields are required");
      }

      const dataBooking = await Booking.findById(id);
      if (!dataBooking) {
        throw new Error("Booking not found");
      }

      if (status === "cancelled") {
        const room = await Room.findById(dataBooking.room_id);
        if (room) {
          room.status = "available";
          await room.save();
        }
      }

      dataBooking.status = status;
      await dataBooking.save();
      return dataBooking;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updatePaymentStatus(paymentData) {
    try {
      const { id, status } = paymentData;
      if (!id || !status) {
        throw new Error("All fields are required");
      }

      const dataBooking = await Booking.findOne({code: id});

      if (!dataBooking) {
        throw new Error("Booking not found");
      }

      const dataPayment = await Payment.findOne({booking_id: dataBooking._id});
      if (!dataPayment) {
        throw new Error("Payment not found");
      }

      dataPayment.status = status;
      await dataPayment.save();
      return dataPayment;
    } catch (e) {
      throw new Error(e);
    }
  }


  async cancelBooking(bookingData) {
    try {
      if (!bookingData) {
        throw new Error("Booking is required");
      }
      // if (!refundAmount) {
      //   throw new Error("RefundAmount is required");
      // }

      const dataBooking = await Booking.findById(
        bookingData.booking.booking.id
      );
      if (!dataBooking) {
        throw new Error("Booking not found");
      }

      if (bookingData.booking.booking.status === "cancelled") {
        const room = await Room.findById(bookingData.booking.booking.roomId);
        if (room) {
          room.status = "available";
          await room.save();
        }
      }

      dataBooking.status = "cancelled";

      await sendCancelBookingEmail(
        bookingData.booking.booking,
        bookingData.booking.refundAmount
      );
      await dataBooking.save();
      return dataBooking;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getBookingById(id) {
    try {
      const booking = await Booking.findById(id)
        .populate("user_id") // Lấy thông tin user (chỉ username và email)
        .populate("room_id"); // Lấy thông tin phòng (số phòng, loại phòng)

      if (!booking) {
        throw new Error("Booking not found");
      }

      return booking;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getBookingByUser(userId) {
    try {
      if (!userId) {
        throw new Error("User is not found");
      }
      const bookings = await Booking.find({user_id: userId})
          .populate("user_id") // Lấy thông tin user (chỉ username và email)
          .populate({
            path: "room_id",
            populate: [{path: "hotel_id"}, {path: "facility_id"}],
          }); // Lấy thông tin phòng

      if (!bookings) {
        throw new Error("User don't have any booking");
      }
      return bookings;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getBookingByCode(code) {
    try{
      const dataBooking = await Booking.findOne({ code: code })
          .populate("user_id")
          .populate({
            path: "room_id",
            populate: [
              { path: "hotel_id" }, // Populate hotel_id từ room_id
              { path: "facility_id" } // Populate facility_id từ room_id
            ]
          });

      if(!dataBooking){
        throw new Error("Lỗi khi lấy danh sách booking");
      }

      const dataPayment = await Payment.findOne({ booking_id: dataBooking._id });

      if(!dataPayment){
        throw new Error("Khong tim thay thong tin thanh toan")
      }

      let responseData = {
        dataBooking: dataBooking,
        dataPayment: dataPayment
      }
      return responseData;
    }catch (e) {
      throw new Error(e);

    }
  }
}

module.exports = new BookingService();
