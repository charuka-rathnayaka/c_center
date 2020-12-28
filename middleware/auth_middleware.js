const jwt=require('jsonwebtoken');
const db=require('../database/database_server.js');



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
                        let user=result[0].Firstname;
                        let useremail=result[0].Email;
                        let usertype=decodedToken.usertype;
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
        
        res.locals.user=null;
        res.locals.usertype=null;
        res.locals.useremail=null;
        next();
    }
}
module.exports =checkuser;
