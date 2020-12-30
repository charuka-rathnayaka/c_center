const jwt=require('jsonwebtoken');
const db=require('../database/database_server.js');



exports.get_home_new_products=async (req,res)=>{
    //const token=req.cookies.jwt;
    
    /*if(token){
        jwt.verify(token,process.env.JWT_SECRET,async (err,decodedToken)=>{
        
            if(err){
                console.log(err.message);
                res.locals.new_products=null;
                res.status(404);
                //res.redirect('/login');
               
            }else{
                console.log(decodedToken);*/
                await db.query('SELECT * From Product',async (error,result)=>{
                    if(error){
                        console.log(error);
                        res.locals.new_products=null;
                        res.status(404);
                        //res.redirect('/login');
                    }
                   
                    else {
                        console.log("here");
                        //console.log(result[0]);
                        //let new_products={product_id:result[0].Product_ID,product_name:result[0].Product_name, product_desc:result[0].Description, photo_link:result[0].Photo_Link};
                        //let usertype=decodedToken.usertype;
                        var i;
                        var result_len=result.length;
                        let new_products={"new_products":{}};
                        for(i=0; i<8; i++){
                            var newprod = "product" + i;
                            var prodValue = {'ID':result[result_len-1].Product_ID,'name':result[result_len-1].Product_name,'desc':result[result_len-1].Description,'image':result[result_len-1].Photo_Link};
                            result_len=result_len-1;
                            new_products.new_products[newprod] = await prodValue ;

                        }
                        //console.log(new_products);
                        //onsole.log(new_products.new_products.product0.name);
                        res.locals.new_products=new_products;
                        
                        //res.render('index');
                    }
                /*
                    res.locals.firstname,res.locals.lastname=null;
                    res.redirect('/login');*/
            
            });
            
            await db.query('SELECT `product`.Product_name,`product`.`Product_ID`,`product`.`Description`,`product`.`Photo_Link`,COUNT(`cart addition`.`Product_ID`) as Product_count FROM `cart addition` Left JOIN `product` on `cart addition`.Product_ID=`product`.Product_ID GROUP BY Product_ID ORDER By Product_count desc',async (error,result)=>{
                if(error){
                    console.log(error);
                    res.locals.trend_products=null;
                    res.status(404);
                    //res.redirect('/login');
                }
               
                else {
                    console.log("sec here");
                    //console.log(result[0]);
                    //let new_products={product_id:result[0].Product_ID,product_name:result[0].Product_name, product_desc:result[0].Description, photo_link:result[0].Photo_Link};
                    //let usertype=decodedToken.usertype;
                    var j;
                    //var result_len=result.length;
                    let trend_products={"trend_products":{}};
                    for(j=0; j<4; j++){
                        var trendprod = "product" + j;
                        var prodValue = {'ID':result[j].Product_ID,'name':result[j].Product_name,'desc':result[j].Description,'image':result[j].Photo_Link};
                        //result_len=result_len-1;
                        trend_products.trend_products[trendprod] = await prodValue ;

                    }
                    //console.log(new_products);
                    //onsole.log(new_products.new_products.product0.name);
                    res.locals.trend_products=trend_products;
                    console.log(trend_products);
                    res.render('index');
                }
            /*
                res.locals.firstname,res.locals.lastname=null;
                res.redirect('/login');*/
        
        });
            
            
            
            /*
            }
        })
    }else{
        res.locals.new_products=null;
        res.status(404);
    }*/
}
