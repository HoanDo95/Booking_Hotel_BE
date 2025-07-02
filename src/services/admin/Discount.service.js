const Discount = require("../../models/hotel/Discount")
class DiscountService {
    async getAllDiscount() {
        try {
            const discountList = await Discount.find({});
            if (!discountList) throw new Error("Lỗi khi lấy quyền !");
            return discountList;
        } catch (e) {
            throw new Error(e);
        }
    }

    async createDiscount(data) {
        try {
            const { code, discount_percentage, valid_from, valid_to, status } = data;
            if (!code || !discount_percentage) {
                throw new Error("Thông tin không hợp lệ !!!");
            }
            const discount = await Discount.findOne({ code: code });
            if (discount) {
                throw new Error("Mã quyền đã tồn tại !!!");
            }
            const newDiscount = new Discount({ code, discount_percentage, valid_from, valid_to, status });
            await newDiscount.save();

            return newDiscount;
        } catch (e) {
            throw new Error(e);
        }
    }

     async updateDiscount (id, disCountData) {
        return await Discount.findByIdAndUpdate(id, disCountData, {
            new: true,
            runValidators: true,
        });
    };

    async deleteDiscount(id) {
        try {
            if (!id) {
                throw new Error("ID không hợp lệ !!!");
            }

            const discount = await Discount.findById(id);
            if (!discount) {
                throw new Error("Không tìm thấy mã giảm giá !");
            }

            await Discount.findByIdAndDelete(id);

            return { message: "Xóa mã giảm giá thành công !" };
        } catch (e) {
            throw new Error(e.message || "Lỗi khi xóa mã giảm giá !");
        }
    }


    async detailDiscount(id) {
        try {
            if (!id) {
                throw new Error("ID không hợp lệ !!!");
            }

            const discount = await Discount.findById(id);
            if (!discount) {
                throw new Error("Không tìm thấy mã giảm giá !");
            }

            return discount;
        } catch (e) {
            throw new Error(e.message || "Lỗi khi lấy chi tiết mã giảm giá !");
        }
    }



}

module.exports = new DiscountService();