const { resExport } = require("../../enums/resExport");
const User = require("../../models/user/User");
const Role = require("../../models/user/Role");
const bcrypt = require('bcryptjs');
class ProfileController {
    async getProfile(req, res) {
        try {
            const resData = await User.find().populate('roleId');
            const formattedProfile = resData.map(e => {
                return {
                    Id: e._id,
                    Name: e.username,
                    Role: e.roleId.name,
                    email: e.email ? e.email : null,
                    phone: e.phone ? e.phone : null,
                    dob: e.dateOfBirth ? e.dateOfBirth : null,
                    gender: e.gender,
                    address: e.address ? e.address : null,
                    avatar: e.avatar ? e.avatar : null,
                };
            });

            res.status(200).json(formattedProfile);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getProfileById(req, res) {
        try {
            const { id } = req.params;
            
            const profile = await User.findById(id);
            
            if (!profile) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            const response = {
                Id: e._id,
                    Name: e.username,
                    Role: e.roleId.name,
                    email: e.email ? e.email : null,
                    phone: e.phone ? e.phone : null,
                    dob: e.dateOfBirth ? e.dateOfBirth : null,
                    gender: e.gender,
                    address: e.address ? e.address : null,
                    avatar: e.avatar ? e.avatar : null,
            };
            
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateProfile(dataReq){
            try{
                const {id, username, email,phone, address, avatar, dateOfBirth, gender, } = dataReq;
                if(!id, !username, !email){
                    throw new Error("Thông tin không hợp lệ !!!");
                }
                const profile = await Role.findById(id);
                if(!profile) throw new Error("Lỗi khi lấy quyền !");
                profile.username = username;
                profile.email = email;
                profile.phone = phone;
                profile.address = address;
                profile.avatar = avatar;
                profile.dateOfBirth = dateOfBirth;
                profile.gender = gender;
                await profile.save();
                return profile;
            }catch (e) {
                throw new Error(e);
            }
        }
}

module.exports = new ProfileController();