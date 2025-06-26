class Error{
  constructor(status, message){
    this.status = status;
    this.message = message;
  }
}

const errors = {
  NOT_FOUND_STUDENT_ID: new Error(412, 'Not found student by id.'),
  ERROR_SYSTEM: new Error(505, 'System error.'),
  CREATE_STUDENT_FAIL: new Error(420, 'Create student fail.'),
  NOT_FOUND_STUDENT: new Error(412, 'Not found student.'),
  NOT_FOUND_TEACHER: new Error(412, 'Not found teacher.'),
  CREATE_TEACHER_FAIL: new Error(421, 'Create teacher fail.'),
  NOT_FOUND_TEACHER_ID: new Error(412, 'Not found teacher by id.'),
  LOGIN_FAIL: new Error(422, 'Login fail.'),
  PASSWORD_INCORECT: new Error(410, 'Mật khẩu không đúng !'),
  USER_INVALID: new Error(410, 'Tài khoản chưa tồn tại !'),
}

module.exports =  errors ;
