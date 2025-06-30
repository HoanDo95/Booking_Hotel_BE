const {resExport} = require("../../enums/resExport");
const DiscountService = require("../../services/admin/Discount.service");

class DiscountController {
    async getDiscount (req, res){
        try{
            const resData = await DiscountService.getAllDiscount();
            resExport(200, "Thành công", resData, res)
        }catch (e) {
            resExport(500, e.message, null, res);
        }
    }

    async createDiscount (req, res){
        try{
            const resData = await DiscountService.createDiscount(req.body);
            resExport(200, "Thành công", resData, res)
        }catch (e) {
            resExport(500, e.message, null, res);
        }
    }

    async updateDiscount (req, res){
        try{
            const resData = await DiscountService.updateDiscount(req.body);
            resExport(200, "Thành công", resData, res)
        }catch (e) {
            resExport(500, e.message, null, res);
        }
    }

    async getDiscountById (req, res){
        try{
            const { id } = req.params;
            const resData = await DiscountService.detailDiscount(id);
            resExport(200, "Thành công", resData, res)
        }catch (e) {
            resExport(500, e.message, null, res);
        }
    }

  
    async deleteDiscount (req, res){
        try{
            const { id } = req.params;
            const resData = await DiscountService.deleteDiscount(id);
            resExport(200, "Thành công", resData, res)
        }catch (e) {
            resExport(500, e.message, null, res);
        }
    }


}

module.exports = new DiscountController();