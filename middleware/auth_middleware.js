const jwt=require('jsonwebtoken');
const db=require('../database/database_server.js');
const jwt_decode= require('jwt-decode');




const checkuser=(req,res,next)=>{
    const token=req.cookies.jwt;
    
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,async (err,decodedToken)=>{
        
            if(err){
                console.log(err.message);
                res.locals.user=null;
                res.locals.usertype=null;
                res.locals.useremail=null;
               // res.redirect('/login');
               next();
            }else{
                console.log(decodedToken);
                await db.query('SELECT * From customer WHERE email=?',[decodedToken.email],async (error,result)=>{
                    if(error){
                        console.log(error);
                        res.locals.user=null;
                        res.locals.usertype=null;
                        res.locals.useremail=null;
                    }
                   
                    else {
                        console.log("here");
                        console.log(result[0]);
                        user=result[0].Firstname;
                        useremail=result[0].Email;
                        usertype=decodedToken.usertype;
                        console.log(user);
                        console.log(usertype);
                        res.locals.user=user;
                        res.locals.usertype=usertype;
                        res.locals.useremail=useremail;
                        return next();
                    }
                
                //res.locals.user=null;
            
               // console.log(user);
            
                next();
            
            });
            }
        })
    }else{
        const guest_token=req.cookies.guest_jwt;
        
        res.locals.user=null;
        res.locals.usertype=null;
        res.locals.useremail=null;
        if(!guest_token){
            db.query('select count(guest_ID) as "guest_count" from guest;',async(error,result)=>{
                //console.log(result[0].guest_count);
                if(error){
                    console.log(error);
                }else{
                    const id=result[0].guest_count+1;
                    const guest_token=jwt.sign({guest_id:id,},process.env.JWT_SECRET,{
                        expiresIn:process.env.JWT_Expires_in
                    });
                    const cookieoption={
                        expires: new Date(
                            Date.now()+process.env.JWT_Cookie_expires *24 *60 *60 * 1000
                        ),
                        httpOnly:true
                    }
                    res.cookie('guest_jwt',guest_token,cookieoption);
                    res.locals.guest_num= id;
                }
            });
        }
        else{
            jwt.verify(guest_token,process.env.JWT_SECRET,async (err,decodedToken)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(decodedToken);
                    id= decodedToken.guest_id;
                    guest_num=id;
                    console.log(guest_num);
                }
            })
        }
        next();
    }
}
module.exports =checkuser;
