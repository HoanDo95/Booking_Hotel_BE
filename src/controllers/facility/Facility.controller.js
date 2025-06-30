// controllers/facilityController.js
const FacilityService = require("../../services/facility/Facility.service");

const getAllFacilities = async (req, res) => {
  try {
    const facilities = await FacilityService.getAllFacilities();

    res.status(200).json(facilities);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách vật tư", error });
  }
};

const getFacilityById = async (req, res) => {
  try {
    const facility = await FacilityService.getFacilityById(req.params.id);
    if (!facility) {
      return res.status(404).json({ message: "Không tìm thấy vật tư" });
    }
    res.status(200).json(facility);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy thông tin vật tư", error });
  }
};

const createFacility = async (req, res) => {
  try {
    const facility = await FacilityService.createFacility(req.body);
    res.status(201).json(facility);
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi tạo vật tư", error });
  }
};

const updateFacility = async (req, res) => {
  try {
    const facility = await FacilityService.updateFacility(req.params.id, req.body);
    if (!facility) {
      return res.status(404).json({ message: "Không tìm thấy vật tư để cập nhật" });
    }
    res.status(200).json(facility);
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi cập nhật vật tư", error });
  }
};

const deleteFacility = async (req, res) => {
  try {
    const facility = await FacilityService.deleteFacility(req.params.id);
    if (!facility) {
      return res.status(404).json({ message: "Không tìm thấy vật tư để xóa" });
    }
    res.status(200).json({ message: "Xóa vật tư thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa vật tư", error });
  }
};

module.exports = {
  getAllFacilities,
  getFacilityById,
  createFacility,
  updateFacility,
  deleteFacility,
};