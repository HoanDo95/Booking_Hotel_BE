const {
  loadRoutePermissions,
} = require("../../middleware/RoutePermissionMiddleware");
const RouteManage = require("../../models/system/RouterManage");
const LogRequest = require("../../models/system/LogRequest");
const User = require("../../models/user/User");
const Booking = require("../../models/hotel/Booking");

class SystemService {
  async getAllRoute() {
    try {
      const routes = await RouteManage.find({});
      if (!routes) {
        throw new Error("Không tìm thấy dữ liệu");
      }

      const sortedRoutes = routes.sort((a, b) => {
        const pathA = a.path.split("/").filter(Boolean);
        const pathB = b.path.split("/").filter(Boolean);

        for (let i = 0; i < Math.min(pathA.length, pathB.length); i++) {
          if (pathA[i] !== pathB[i]) {
            return pathA[i].localeCompare(pathB[i]);
          }
        }

        return pathA.length - pathB.length;
      });

      return sortedRoutes;
    } catch (e) {
      throw new Error(e);
    }
  }

  async createRoute(dataReq) {
    try {
      const { path, method, requireToken } = dataReq;
      const checkRoute = await RouteManage.findOne({ path, method });
      if (checkRoute) {
        throw new Error("Đường dẫn đã tồn tại");
      }
      const newRoute = new RouteManage({
        path,
        method,
        requireToken,
      });
      await newRoute.save();
      await loadRoutePermissions();
      return newRoute;
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateRoute(dataReq) {
    try {
      const { id, path, method, requireToken } = dataReq;
      const checkRoute = await RouteManage.findById(id);
      if (!checkRoute) {
        throw new Error("Không tìm thấy dữ liệu");
      }
      checkRoute.path = path;
      checkRoute.method = method;
      checkRoute.requireToken = requireToken;
      await checkRoute.save();
      await loadRoutePermissions();
      return checkRoute;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteRoute(id) {
    try {
      await RouteManage.findByIdAndDelete(id);
      return await RouteManage.find({});
    } catch (e) {
      throw new Error(e);
    }
  }

  async getLogRequest() {
    try {
      const logRequestList = await LogRequest.find({});
      if (logRequestList.length < 1)
        throw new Error("Không tìm thấy request !");
      return logRequestList;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getDashBoard() {
    try {
      // Basic counts
      const totalRoute = await RouteManage.countDocuments({});
      const totalLog = await LogRequest.countDocuments({});
      const totalUser = await User.countDocuments({});
      const totalBooking = await Booking.countDocuments({});

      // User statistics
      const usersByMonth = await User.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]);

      // Booking static
      const bookingsByMonth = await Booking.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]);

      // Booking status distribution
      const bookingsByStatus = await Booking.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]);

      // Format the data for charts
      const userChartData = usersByMonth.map((item) => ({
        period: `${item._id.year}-${item._id.month}`,
        count: item.count,
      }));

      const bookingChartData = bookingsByMonth.map((item) => ({
        period: `${item._id.year}-${item._id.month}`,
        count: item.count,
      }));

      const response = {
        // Basic counts
        totalRoute,
        totalLog,
        totalUser,
        totalBooking,

        // Chart data
        userChartData,
        bookingChartData,
        bookingsByStatus,
      };

      return response;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = new SystemService();
const {
  loadRoutePermissions,
} = require("../../middleware/RoutePermissionMiddleware");
const RouteManage = require("../../models/system/RouterManage");
const LogRequest = require("../../models/system/LogRequest");
const User = require("../../models/user/User");
const Booking = require("../../models/hotel/Booking");

class SystemService {
  async getAllRoute() {
    try {
      const routes = await RouteManage.find({});
      if (!routes) {
        throw new Error("Không tìm thấy dữ liệu");
      }

      const sortedRoutes = routes.sort((a, b) => {
        const pathA = a.path.split("/").filter(Boolean);
        const pathB = b.path.split("/").filter(Boolean);

        for (let i = 0; i < Math.min(pathA.length, pathB.length); i++) {
          if (pathA[i] !== pathB[i]) {
            return pathA[i].localeCompare(pathB[i]);
          }
        }

        return pathA.length - pathB.length;
      });

      return sortedRoutes;
    } catch (e) {
      throw new Error(e);
    }
  }

  async createRoute(dataReq) {
    try {
      const { path, method, requireToken } = dataReq;
      const checkRoute = await RouteManage.findOne({ path, method });
      if (checkRoute) {
        throw new Error("Đường dẫn đã tồn tại");
      }
      const newRoute = new RouteManage({
        path,
        method,
        requireToken,
      });
      await newRoute.save();
      await loadRoutePermissions();
      return newRoute;
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateRoute(dataReq) {
    try {
      const { id, path, method, requireToken } = dataReq;
      const checkRoute = await RouteManage.findById(id);
      if (!checkRoute) {
        throw new Error("Không tìm thấy dữ liệu");
      }
      checkRoute.path = path;
      checkRoute.method = method;
      checkRoute.requireToken = requireToken;
      await checkRoute.save();
      await loadRoutePermissions();
      return checkRoute;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteRoute(id) {
    try {
      await RouteManage.findByIdAndDelete(id);
      return await RouteManage.find({});
    } catch (e) {
      throw new Error(e);
    }
  }

  async getLogRequest() {
    try {
      const logRequestList = await LogRequest.find({});
      if (logRequestList.length < 1)
        throw new Error("Không tìm thấy yêu cầu !");
      return logRequestList;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getDashBoard() {
    try {
      // Basic counts
      const totalRoute = await RouteManage.countDocuments({});
      const totalLog = await LogRequest.countDocuments({});
      const totalUser = await User.countDocuments({});
      const totalBooking = await Booking.countDocuments({});

      // User statistics
      const usersByMonth = await User.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]);

      // Booking statistics
      const bookingsByMonth = await Booking.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]);

      // Booking status distribution
      const bookingsByStatus = await Booking.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]);

      // Format the data for charts
      const userChartData = usersByMonth.map((item) => ({
        period: `${item._id.year}-${item._id.month}`,
        count: item.count,
      }));

      const bookingChartData = bookingsByMonth.map((item) => ({
        period: `${item._id.year}-${item._id.month}`,
        count: item.count,
      }));

      const response = {
        // Basic counts
        totalRoute,
        totalLog,
        totalUser,
        totalBooking,

        // Chart data
        userChartData,
        bookingChartData,
        bookingsByStatus,
      };

      return response;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = new SystemService();
