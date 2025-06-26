class MessageSuccess{
  constructor(status, message){
    this.status = status;
    this.message = message;
  }
}

const Success = {
  CREATE_SUCCESS: new MessageSuccess(200, 'Create success.'),
  UPDATE_SUCCESS: new MessageSuccess(200, 'Update success.'),
  DELETE_SUCCESS: new MessageSuccess(200, 'Delete success.'),
  GET_DATA: new MessageSuccess(200, 'Get data success.'),
  REGISTER_SUCCESS: new MessageSuccess(200, 'Register success.'),
  LOGIN_SUCCESS: new MessageSuccess(200, 'Login success.'),
  LOGOUT_SUCCESS: new MessageSuccess(200, 'Logout success.'),
  LOAD_ID_BY_TOKEN: new MessageSuccess(200, 'Load id by token success.'),
}

module.exports = Success;
