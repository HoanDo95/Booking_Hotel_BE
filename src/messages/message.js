class Message {
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }
}

const MESSAGE = {
    SUCCESS: new Message(200, 'Thành công!!'),
    FAIL: new Message(201, 'Thất bại!!'),
    ERROR: new Message(500, 'Lỗi!!!!!!'),
};

const MESSAGE_SUCCESS = {
    LOGIN: new Message(200, 'Đăng nhập thành công'),
    REGISTER: new Message(200, 'Đăng ký tài khoản thành công'),
    ACTIVE_ACCOUNT: new Message(200, 'Kích hoạt tài khoản thành công'),
    CHANGE_PASSWORD: new Message(200, 'Đổi mật khẩu thành công'),
    UPDATE_ACCOUNT: new Message(200, 'Cập nhật thông tin tài khoản thành công'),
    DELETE_ACCOUNT: new Message(200, 'Xóa tài khoản thành công'),
    CREATE_ROLE: new Message(200, 'Tạo mới role thành công'),
    UPDATE_ROLE: new Message(200, 'Cập nhật role thành công'),
    DELETE_ROLE: new Message(200, 'Xóa role thành công'),
    CREATE_PERMISSION: new Message(200, 'Tạo mới permission thành công'),
    UPDATE_PERMISSION: new Message(200, 'Cập nhật permission thành công'),
    DELETE_PERMISSION: new Message(200, 'Xóa permission thành công'),
    CREATE_ROLE_PERMISSION: new Message(200, 'Tạo mới role permission thành công'),
    UPDATE_ROLE_PERMISSION: new Message(200, 'Cập nhật role permission thành công'),
    DELETE_ROLE_PERMISSION: new Message(200, 'Xóa role permission thành công'),
    CREATE_PASS_CONFIG: new Message(200, 'Tạo mới pass config thành công'),
    UPDATE_PASS_CONFIG: new Message(200, 'Cập nhật pass config thành công'),
    DELETE_PASS_CONFIG: new Message(200, 'Xóa pass config thành công'),
    CREATE_LOG: new Message(200, 'Tạo mới log thành công'),
    DELETE_LOG: new Message(200, 'Xóa log thành công'),
    CREATE_REQUEST_LOG: new Message(200, 'Tạo mới request log thành công'),
    DELETE_REQUEST_LOG: new Message(200, 'Xóa request log thành công'),
    CREATE_ACCOUNT: new Message(200, 'Tạo mới account thành công'),
    DELETE_ACCOUNT: new Message(200, 'Xóa account thành công'),
};

const MESSAGE_FAIL = {
    LOGIN: new Message(401, 'Thất bại!!!'),
    REGISTER: new Message(400, 'Listring!!!'),
    ACTIVE_ACCOUNT: new Message(400, 'Kích hoạt tài khoản thất bại'),
    CHANGE_PASSWORD: new Message(400, 'Đổi mật khẩu thất bại'),
    UPDATE_ACCOUNT: new Message(400, 'Cập nhật thông tin tài khoản thất bại'),
    DELETE_ACCOUNT: new Message(400, 'Xóa tài khoản thất bại'),
    CREATE_ROLE: new Message(400, 'Tạo mới role thất bại'),
    UPDATE_ROLE: new Message(400, 'Cập nhật role thất bại'),
    DELETE_ROLE: new Message(400, 'Xóa role thất bại'),
    CREATE_PERMISSION: new Message(400, 'Tạo mới permission thất bại'),
    UPDATE_PERMISSION: new Message(400, 'Cập nhật permission thất bại'),
    DELETE_PERMISSION: new Message(400, 'Xóa permission thất bại'),
    CREATE_ROLE_PERMISSION: new Message(400, 'Tạo mới role permission thất bại'),
    UPDATE_ROLE_PERMISSION: new Message(400, 'Cập nhật role permission thất bại'),
    DELETE_ROLE_PERMISSION: new Message(400, 'Xóa role permission thất bại'),
    CREATE_PASS_CONFIG: new Message(400, 'Tạo mới pass config thất bại'),
    UPDATE_PASS_CONFIG: new Message(400, 'Cập nhật pass config thất bại'),
    DELETE_PASS_CONFIG: new Message(400, 'Xóa pass config thất bại'),
    CREATE_LOG: new Message(400, 'Tạo mới log thất bại'),
    DELETE_LOG: new Message(400, 'Xóa log thất bại'),
    CREATE_REQUEST_LOG: new Message(400, 'Tạo mới request log thất bại'),
    DELETE_REQUEST_LOG: new Message(400, 'Xóa request log thất bại'),
    CREATE_ACCOUNT: new Message(400, 'Tạo mới account thất bại'),
    DELETE_ACCOUNT: new Message(400, 'Xóa account thất bại'),
};

// Export tất cả các đối tượng dưới một đối tượng duy nhất
module.exports = {
    MESSAGE,
    MESSAGE_SUCCESS,
    MESSAGE_FAIL
};
