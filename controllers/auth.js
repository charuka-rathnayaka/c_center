//const mysql=require("mysql");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
/*
const db=mysql.createConnection({
    host:process.env.database_host,
    user:process.env.database_user,
    password:process.env.database_pwd,
    database:process.env.database
});*/

const db=require('../database/database_server.js');
exports.register=(req,res)=>{
    console.log(req.body);
    
    const {firstname,lastname,email,address,city,birthday,contactnumber,password1,password2}=req.body;
    db.query('SELECT email From customer WHERE Email=?',[email],async (error,result)=>{
        if(error){
            console.log(error);
        }
        if(result.length>0){
            return res.render('register',{
                message:"That email is already in use"
            });

        }
        else if(password1!=password2){
            return res.render('register',{
                message:"Passwords does not match"
            });
        }

        let hashedpassword= await bcrypt.hash(password1,8);
        console.log(hashedpassword);

        db.query('INSERT INTO customer SET ?',{Email:email,Firstname:firstname,Lastname:lastname, Address:address, City:city, Birthday:birthday,ContactNumber:contactnumber, Password:hashedpassword},(error,result)=>{
            if(error){
                console.log(error);
            }
            else{
              
                console.log(result);
                const token=jwt.sign({email:email},process.env.JWT_SECRET,{
                    expiresIn:process.env.JWT_Expires_in
                });
                console.log(token);
                const cookieoption={
                    expires: new Date(
                        Date.now()+process.env.JWT_Cookie_expires *24 * 60 * 60 * 1000
                    ),
                    httpOnly:true
                }
                res.cookie('jwt',token,cookieoption);
                res.status(300).redirect("/");
                
            }
        });
        
            
    });

    
}

exports.login=async (req,res)=>{
    try {
        console.log(req.body);
        const email=req.body.email;
        const password=req.body.password;
        //const{email,password}=req.body;
        if(!email || !password){
            return res.status(400).render('login',{
                message:"Please provide and email and password"
            });
        }

        db.query('SELECT * FROM customer WHERE email=?',[email],async(error,result)=>{
            //console.log('email checking');
            console.log(result);
            if(!result){
                res.status(401).render('login',{
                    message:"No such registered email"
                })
            }
            else if(!(await bcrypt.compare(password,result[0].Password))){
                res.status(401).render('login',{
                    message:"Email or password Incorrect"
                })
            }
            else{
                const id=email;
                const token=jwt.sign({email:email,usertype:'customer'},process.env.JWT_SECRET,{
                    expiresIn:process.env.JWT_Expires_in
                });
                console.log(token);
                const cookieoption={
                    expires: new Date(
                        Date.now()+process.env.JWT_Cookie_expires *24 * 60 * 60 * 1000
                    ),
                    httpOnly:true
                }
                res.cookie('jwt',token,cookieoption);
                res.status(300).redirect("/");
            }
        });
    } catch (error) {
        console.log(error);
    }

}

exports.logout=(req,res)=>{
    res.cookie("jwt",'',{maxAge:1});
    res.redirect('/');
}