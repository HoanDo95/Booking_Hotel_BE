const {resExport} = require("../../enums/resExport");
const PaymentService = require("../../services/payment/Payment.service");
const Payment = require("../../models/hotel/Payment")
const Booking = require("../../models/hotel/Booking")
class PaymentController{
     async getAllPaymetns(req, res) {
        try {
          const payments = await Payment.find().populate({
            path: 'booking_id',
            populate: { path: 'user_id' }
        });
        

          const format = payments.map(payment => ({
            id: payment._id,
            user: payment.booking_id?.user_id?.username || null,
            amount: payment.amount,
            method: payment.method,
            status: payment.status,
            payment_date: payment.payment_date
          }))
          if (!payments) {
            return res.status(404).json({ message: "Can not get list room" });
          }
    
          return res
            .status(200)
            .json({ message: "Get list room successfully", data: format });
        } catch (error) {
          console.error("Lỗi khi lấy danh sách phòng:", error);
          throw error;
        }
      }


      async deletePayment(req, res) {
        try {
            const { id } = req.params;
            const deletedPayment = await Payment.findByIdAndDelete(id);
    
            if (!deletedPayment) {
                return res.status(404).json({ message: "Không tìm thấy thanh toán để xóa" });
            }
    
            return res.status(200).json({ message: "Xóa thanh toán thành công" });
        } catch (error) {
            console.error("Lỗi khi xóa thanh toán:", error);
            return res.status(500).json({ message: "Lỗi máy chủ", error });
        }
    }


    async getPaymentsByUserId(req, res) {
      try {
          const { userId } = req.params;
  
          const payments = await Payment.find()
              .populate({
                  path: 'booking_id',
                  populate: [
                      { path: 'user_id' },
                      { path: 'room_id' }
                  ]
              })
              .then(payments =>
                  payments.filter(payment => payment.booking_id?.user_id?._id.toString() === userId)
              );
  
          if (!payments.length) {
              return res.status(404).json({ message: "Không tìm thấy thanh toán cho người dùng này" });
          }
  
          const format = payments.map(payment => ({
              id: payment._id,
              user: payment.booking_id?.user_id?.username || null,
              room: payment.booking_id?.room_id?.type|| null,
              amount: payment.amount,
              method: payment.method,
              status: payment.status,
              payment_date: payment.payment_date
          }));
  
          return res.status(200).json({ message: "Lấy danh sách thanh toán thành công", data: format });
      } catch (error) {
          console.error("Lỗi khi lấy danh sách thanh toán:", error);
          return res.status(500).json({ message: "Lỗi máy chủ", error });
      }
  }

    
    createPayment(req, res){
        try{
            const resData = PaymentService.createPaymentUrl(req);
            resExport(200, "Thành công", resData, res);
        }catch (e) {
            resExport(500, e.message, null, res);
        }
    }
}

module.exports = new PaymentController();
