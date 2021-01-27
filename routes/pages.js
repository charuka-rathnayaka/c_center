const express=require("express");
const router=express.Router();
const profileController=require("../controllers/profile");
const productController=require("../controllers/products");
const orderController=require("../controllers/order");

router.get('/',productController.get_home_new_products);

router.get('/register',(req,res)=>{
    res.render('register');
});

router.get('/login',(req,res)=>{
    res.render('login');
});
router.get('/mycart',(req,res)=>{
    res.render('mycart');
});
router.get('/myprofile', profileController.get_profile);

router.get('/order',(req,res)=>{
    res.render('order');
});
router.get('/order/delieveryorder',orderController.autofillDelievery);
router.get('/order/pickuporder',orderController.autofillPickup);

module.exports=router;
