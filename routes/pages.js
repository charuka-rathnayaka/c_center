const express=require("express");
const router=express.Router();
const profileController=require("../controllers/profile");

router.get('/',(req,res)=>{
    console.log(req.locals);
    res.render('index');
});

router.get('/register',(req,res)=>{
    res.render('register');
});

router.get('/login',(req,res)=>{
    res.render('login');
});
router.get('/mycart',(req,res)=>{
    res.render('mycart');
});
router.get('/myprofile',profileController.get_profile);

module.exports=router;