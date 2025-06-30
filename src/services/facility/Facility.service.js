// services/facilityService.js
const Facility = require("../../models/hotel/Facility");

const getAllFacilities = async () => {
  return await Facility.find({});
};

const getFacilityById = async (id) => {
  return await Facility.findById(id);
};

const createFacility = async (facilityData) => {
  const facility = new Facility(facilityData);
  return await facility.save();
};

const updateFacility = async (id, facilityData) => {
  return await Facility.findByIdAndUpdate(id, facilityData, {
    new: true,
    runValidators: true,
  });
};

const deleteFacility = async (id) => {
  return await Facility.findByIdAndDelete(id);
};

module.exports = {
  getAllFacilities,
  getFacilityById,
  createFacility,
  updateFacility,
  deleteFacility,
};