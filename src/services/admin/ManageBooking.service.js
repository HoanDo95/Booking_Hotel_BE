const Booking = require("../../models/hotel/Booking")
const User = require("../../models/user/User")
const Room = require("../../models/hotel/Room")

class ManageBookingService {
    async getAllBooking(){
        try{
            const dataBooking = await Booking.find({}).populate("user_id").populate("room_id");
            if(!dataBooking){
                throw new Error("Lỗi khi lấy danh sách booking");
            }
            return dataBooking;
        }catch (e) {
            throw new Error(e)
        }
    }

    async createBooking(dataReq){
        try{
            const {userId, roomId, checkin_date, checkout_date, totalPrice, status, breakfast, payment_method, note} = dataReq;
            if(!userId || !roomId || !checkin_date || !checkout_date || !totalPrice){
                throw new Error("All fields are required");
            }
            const checkBooking = await Booking.findOne({user_id: userId, room_id: roomId, check_in: checkin_date, check_out: checkout_date});
            if(checkBooking){
                throw new Error("Booking already exist");
            }
            const newBooking = new Booking({
                user_id: userId,
                room_id: roomId,
                check_in: checkin_date,
                check_out: checkout_date,
                total_price: totalPrice,
                status,
                breakfast,
                payment_method,
                note
            })
            await newBooking.save();
            return newBooking;
        }catch (e) {
            throw new Error(e);
        }
    }

    async updateBooking(dataReq){
        try{
            const {id, userId, roomId, checkin_date, checkout_date, totalPrice, status, breakfast, payment_method, note} = dataReq;
            if(!id, !userId || !roomId || !checkin_date || !checkout_date || !totalPrice){
                throw new Error("All fields are required");
            }
            const checkBooking = await Booking.findOne({user_id: userId, room_id: roomId, check_in: checkin_date, check_out: checkout_date});
            if(checkBooking){
                throw new Error("Booking already exist");
            }
            const updateBooking = await Booking.findByIdAndUpdate(id, {
                user_id: userId,
                room_id: roomId,
                check_in: checkin_date,
                check_out: checkout_date,
                total_price: totalPrice,
                status,
                breakfast,
                payment_method,
                note
            }, {new: true});
            return updateBooking;
        }catch (e) {
            throw new Error(e);
        }
    }

    async deleteBooking(id){
        try{
            await Booking.findByIdAndDelete(id);
            return await Booking.find({});
        }catch (e) {
            throw new Error(e)
        }
    }
}

module.exports = new ManageBookingService();