const User = require("../../models/user/User");
const { v4: uuidv4 } = require("uuid");
const secret = require("../../configs/Secrets");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const STATUS_ACCOUNT = require("../../enums/statusAccount");
const Role = require("../../models/user/Role");
require('dotenv').config();

class authService {
  async login(data) {
    try {
      const { username, password } = data;
      const user = await User.findOne({ username }).populate("roleId", "code");
      
      if (!user) {
        throw new Error("Tài khoản không tồn tại!");
      }
      
      // Kiểm tra mật khẩu
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Mật khẩu không chính xác!");
      }
      
      if (user.status === STATUS_ACCOUNT.INACTIVE) {
        throw new Error("Tài khoản chưa được kích hoạt.");
      }
      
      const token = this.generateToken(user._id, user.roleId.code);
      if (!token) {
        throw new Error("Lỗi khi tạo token!");
      }
      return token;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async loginWithGoogle(data){
    try{
      const {email, googleToken} = data;
      
      // TODO: Verify Google token using Google API
      // const verifyEndpoint = `https://oauth2.googleapis.com/tokeninfo?id_token=${googleToken}`;
      // const response = await axios.get(verifyEndpoint);
      // if (!response.data || response.data.email !== email) {
      //   throw new Error("Token Google không hợp lệ!");
      // }
      
      const user = await User.findOne({email: email}).populate("roleId", "code");
      if(!user){
        throw new Error("Tài khoản không tồn tại, vui lòng đăng ký tài khoản!");
      }
      
      if (user.status === STATUS_ACCOUNT.INACTIVE) {
        throw new Error("Tài khoản chưa được kích hoạt.");
      }
      
      const token = this.generateToken(user._id, user.roleId.code);
      if(!token){
        throw new Error("Lỗi khi tạo token!");
      }
      return token;
    }catch(e){
      throw new Error(e.message);
    }
  }

  async getUserByID(userReq) {
    try {
      const user = await User.findById(userReq).populate("roleId", "code name");
      if (!user) {
        throw new Error("Không tìm thấy người dùng!");
      } else {
        return user;
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateNameUser(id,Data) {
    try {
      const {  first_name, last_name } = Data;
      if ( !first_name|| !last_name) {
        throw new Error("All fields are required");
      }

      const data = await User.findById(id);
      if (!data) {
        throw new Error("User is not found");
      }

     

      data.first_name = first_name;
      data.last_name = last_name;
      await data.save();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUsername(id, Data){
    try {
      
      const {username} = Data;
      if(!id || !username){
        throw new Error("All fields are required");
      }
      const data = await User.findById(id);
      if (!data) {
        throw new Error("User is not found");
      }
      const checkdata = await User.findOne({username: username});
      if(checkdata){
        throw new Error("username đã tồn tại");
      }
      data.username = username;
      await data.save();
      return data;

      
      
    } catch (error) {
      throw new Error(error);
      
    }
  }

  async updateEmail(id, Data){
    try {
      const { email} = Data;
      if(!id || !email){
        throw new Error("All fields are required");
      }
      const data = await User.findById(id);
      if (!data) {
        throw new Error("User is not found");
      }
      const checkdata = await User.findOne({email: email});
      if(checkdata){
        throw new Error("email đã tồn tại");
      }
      data.email = email;
      await data.save();
      return data;

      
      
    } catch (error) {
      throw new Error(error);
      
    }
  }

  async updateAvatar(id, Data){
    try {
      const { avatar} = Data;
      if(!id || !avatar){
        throw new Error("All fields are required");
      }
      const data = await User.findById(id);
      if (!data) {
        throw new Error("User is not found");
      }
      
      data.avatar = avatar;
      await data.save();
      return data;

      
      
    } catch (error) {
      throw new Error(error);
      
    }
  }

  

  async updatePhone(id, Data){
    try {
      const { phone} = Data;
      if(!id || !phone){
        throw new Error("All fields are required");
      }
      const data = await User.findById(id);
      if (!data) {
        throw new Error("User is not found");
      }
      const checkdata = await User.findOne({phone: phone});
      if(checkdata){
        throw new Error("phone đã tồn tại");
      }
      data.phone = phone;
      await data.save();
      return data;

      
      
    } catch (error) {
      throw new Error(error);
      
    }
  }

  async updateAddress(id, Data){
    try {
      const { address} = Data;
      if(!id || !address){
        throw new Error("All fields are required");
      }
      const data = await User.findById(id);
      if (!data) {
        throw new Error("User is not found");
      }
     
      data.address = address;
      await data.save();
      return data;

      
      
    } catch (error) {
      throw new Error(error);
      
    }
  }

  async updateDob(id,Data){
    try {
      const { dateOfBirth} = Data;
      if(!id || !dateOfBirth){
        throw new Error("All fields are required");
      }
      const data = await User.findById(id);
      if (!data) {
        throw new Error("User is not found");
      }
     
      data.dateOfBirth = dateOfBirth;
      await data.save();
      return data;
      
    } catch (error) {
      throw new Error(error);
      
    }
  }

  async updateGender(id, Data){
    try {
      const { gender} = Data;
      if(!id || !gender){
        throw new Error("All fields are required");
      }
      const data = await User.findById(id);
      if (!data) {
        throw new Error("User is not found");
      }
     
      data.gender = gender;
      await data.save();
      return data;
      
    } catch (error) {
      throw new Error(error);
      
    }
  }

  generateToken(userId, role) {
    const token = jwt.sign({ userId, role }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    return token;
  }
}

module.exports = new authService();
