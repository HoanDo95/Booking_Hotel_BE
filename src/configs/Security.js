const setupSessionMiddleware = require('../middleware/SessionMiddleware');
const { routePermissionMiddleware, initializeRoutePermissions } = require('../middleware/RoutePermissionMiddleware');


/**
 * Cấu hình bảo mật cho ứng dụng
 * @param {Express} app - Express application instance
 * @returns {Promise<void>}
 */
const security = async (app) => {
  // Thiết lập session và các middleware cơ bản
  setupSessionMiddleware(app);
  
  // Khởi tạo và cấu hình route permissions
  await initializeRoutePermissions();
  
  // Áp dụng middleware kiểm tra quyền truy cập route
  app.use(routePermissionMiddleware);

  // Sử dụng express-session
  // app.use(
  //   session({
  //     secret: secret.JWT_SECRET_KEY, // Thay bằng một chuỗi bí mật
  //     resave: false,
  //     saveUninitialized: true,
  //     cookie: {
  //       secure: false,
  //       maxAge: 60 * 60 * 1000, // 1 tieng
  //     }, // Đặt secure: true nếu sử dụng HTTPS
  //   })
  // );
  // app.use(passport.initialize());
  // app.use(passport.session());

  // // cac routes phai co token moi co the truy cap duoc
  //   app.use((req, res, next) => {
  //     const noAuthPaths = ["/auth/login", "/register"];
  //       if (noAuthPaths.includes(req.path) || req.path.startsWith("/register")) {
  //           next();
  //       } else {
  //           authMiddleware(req, res, next);
  //       }
  //   });
};

module.exports = security;
