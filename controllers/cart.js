const db = require('../database/database_server');

exports.get_cart=async (req,res)=>{
    try {
        useremail;
    } catch (error) {
        useremail='null';
    }
    try {
        guest_num
    } catch (error) {
        guest_num='Deleted';
    }
    if(useremail!='null'){
        await db.query('select cc.Customer_Cart_ID,cc.Cart_ID,cc.Email,ca.Product_ID,p.Product_name,p.Description,p.Photo_Link from `customer cart` as cc left outer join cart as c using(Cart_ID) inner join `cart addition` as ca using(Cart_ID) inner join product as p using(Product_ID) where cc.Email=?',[useremail],async(error,result)=>{
            if(error){
                console.log(error);
            }else{
                console.log('OK CART');
                var i;
                var result_len= result.length;
                let cart_items= {"cart_item":[]};
                for(i=0;i<result_len;i++){
                    var cartitem= {'Customer_Cart_ID':result[i].Customer_Cart_ID,'Cart_ID':result[i].Cart_ID,'Email':result[i].Email,'Product_ID':result[i].Product_ID,'Product_name':result[i].Product_name,'Description':result[i].Description,'link':result[i].Photo_Link};
                    cart_items.cart_item[i]=await cartitem;
                }
                res.locals.cart_items=cart_items;
                res.locals.cart=result;
                console.log(useremail);
                console.log(cart_items.cart_item);
                res.render('mycart',{data:result}); 
            }
        });
    }else{
        await db.query('select gc.Guest_Cart_ID,gc.Cart_ID,ca.Product_ID,p.Product_name,p.Photo_Link from `guest cart` as gc left outer join cart as c using(Cart_ID) inner join `cart addition` as ca using(Cart_ID) inner join product as p using(Product_ID) where gc.Guest_ID=?',[guest_num],async(error,result)=>{
            if(error){
                console.log(error);
            }else{
                console.log('OK CART');
                var i;
                var result_len= result.length;
                let cart_items= {"cart_item":[]};
                for(i=0;i<result_len;i++){
                    var cartitem= {'Customer_Cart_ID':result[i].Customer_Cart_ID,'Cart_ID':result[i].Cart_ID,'Email':result[i].Email,'Product_ID':result[i].Product_ID,'Product_name':result[i].Product_name,'Description':result[i].Description,'link':result[i].Photo_Link};
                    cart_items.cart_item[i]=await cartitem;
                }
                res.locals.cart_items=cart_items;
                res.locals.cart=result;
                console.log(useremail);
                console.log(cart_items.cart_item);
                res.render('mycart',{data:result}); 
            }
        });
    }

    
}