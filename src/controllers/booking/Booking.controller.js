const { resExport } = require("../../enums/resExport");
const BookingService = require("../../services/booking/Booking.service");

class BookingController {
  async createBooking(req, res) {
    try {
      const resData = await BookingService.createBooking(req.body);
      resExport(200, "Booking created successfully", resData, res);
    } catch (error) {
      resExport(500, error.message, null, res);
    }
  }

  
}

module.exports = new BookingController();
