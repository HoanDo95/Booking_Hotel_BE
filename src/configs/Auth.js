const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user/User');
const bcrypt = require('bcryptjs');


passport.use(
  new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await User.findOne({username: username});
        if(!user){
          return done(null, false, {message: 'Tài khoản không tồn tại!'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
          return done(null, false, {message: 'Mật khẩu không đúng!'});
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
})
