const jwt=require('jsonwebtoken');
const db=require('../database/database_server.js');



exports.get_profile=(req,res)=>{
    const token=req.cookies.jwt;
    
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,async (err,decodedToken)=>{
        
            if(err){
                console.log(err.message);
                res.locals.user_profile=null;
                res.redirect('/login');
               
            }else{
                console.log(decodedToken);
                await db.query('SELECT * From customer WHERE email=?',[decodedToken.email],async (error,result)=>{
                    if(error){
                        console.log(error);
                        res.locals.user_profile=null;
                        res.redirect('/login');
                    }
                   
                    else {
                        console.log("here");
                        console.log(result[0]);
                        let date = JSON.stringify(result[0].Birthday)
                        let bdate = date.slice(1,11)
                        let user_profile={lastname:result[0].Lastname,firstname:result[0].Firstname, email:result[0].Email, address:result[0].Address, city:result[0].City,birthday:bdate, contactnumber:result[0].ContactNumber};
                        //let usertype=decodedToken.usertype;
                        
                        res.locals.user_profile=user_profile;
                        
                        res.render('myprofile');
                    }
                /*
                    res.locals.firstname,res.locals.lastname=null;
                    res.redirect('/login');*/
            
            });
            }
        })
    }else{
        res.locals.user_profile=null;
        res.redirect('/login');
    }
}
