const express=require("express");
const orderController=require("../controllers/order");
const router = express.Router();

router.post('/',orderController.gettype);
router.post('/delieveryorder', orderController.delieveryorder);
router.post('/pickuporder',orderController.pickupOrder);
module.exports=router;