/**
 * @description Booking messages
 */
const BOOKING_MESSAGES = {
  // Success messages
  CREATE_SUCCESS: "Booking created successfully",
  UPDATE_SUCCESS: "Booking updated successfully",
  DELETE_SUCCESS: "Booking deleted successfully",
  GET_ALL_SUCCESS: "Bookings retrieved successfully",
  GET_BY_ID_SUCCESS: "Booking retrieved successfully",

  // Error messages
  CREATE_FAILED: "Failed to create booking",
  UPDATE_FAILED: "Failed to update booking",
  DELETE_FAILED: "Failed to delete booking",
  GET_ALL_FAILED: "Failed to retrieve bookings",
  GET_BY_ID_FAILED: "Failed to retrieve booking",
  NOT_FOUND: "Booking not found",
  INVALID_ID: "Invalid booking ID",
  UNAUTHORIZED: "You are not authorized to access this booking",
  ROOM_NOT_AVAILABLE: "Room is not available for the selected dates",
  INVALID_DATES: "Invalid check-in or check-out dates",
  PAST_DATES: "Cannot book for past dates",
  CHECKOUT_BEFORE_CHECKIN: "Check-out date must be after check-in date",
};

module.exports = {
  BOOKING_MESSAGES,
};
