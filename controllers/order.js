const jwt=require('jsonwebtoken');

const db = require('../database/database_server');
const url = require('url');
const { log } = require('console');

exports.gettype = (req, res) => {
    let delieveryMethod = req.body.delieveryMethod;
    console.log(delieveryMethod);
    if (delieveryMethod == "Pickup") {
       
       
          res.redirect('/order/pickuporder');

    }
    else if (delieveryMethod == "Delievery") {
         res.redirect('/order/delieveryorder');
//res.render('delieveryorder');

    }
    else { 
        res.render('order');

    }
}
exports.autofillPickup= (req, res) => { 
      const token=req.cookies.jwt;
    console.log(req.path);
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,async (err,decodedToken)=>{
        
            if(err){
                console.log(err.message);
                res.locals.user_profile = null;
                
                    res.render('pickuporder');
            }else{
               
                await db.query('SELECT * From customer WHERE email=?',[decodedToken.email],async (error,result)=>{
                    if(error){
                        console.log(error);
                        res.locals.user_profile=null;
                         res.render('pickuporder');
                    }
                   
                    else {
                        
                        let date = JSON.stringify(result[0].Birthday)
                        let bdate = date.slice(1, 11)
                        let s1 = result[0].Firstname;
                        let s2 = result[0].Lastname;
                       let re = s1.concat(s2);
                        
                        let user_profile={contactname:re, email:result[0].Email, address:result[0].Address, city:result[0].City,birthday:bdate, contactnumber:result[0].ContactNumber};
                        //let usertype=decodedToken.usertype;
                        
                        res.locals.user_profile=user_profile;
                        
                        res.render('pickuporder');
                    }
                /*
                    res.locals.firstname,res.locals.lastname=null;
                    res.redirect('/login');*/
            
            });
            }
        })
    }else{
        res.locals.user_profile=null;
        res.render('pickuporder');
    }
}

exports.autofillDelievery= (req, res) => { 
      const token=req.cookies.jwt;
    console.log(req.path);
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,async (err,decodedToken)=>{
        
            if(err){
                console.log(err.message);
                res.locals.user_profile = null;
                
                    res.render('delieveryorder');
            }else{
               
                await db.query('SELECT * From customer WHERE email=?',[decodedToken.email],async (error,result)=>{
                    if(error){
                        console.log(error);
                        res.locals.user_profile=null;
                         res.render('delieveryorder');
                    }
                   
                    else {
                        
                        let date = JSON.stringify(result[0].Birthday)
                        let bdate = date.slice(1, 11)
                        let s1 = result[0].Firstname;
                        let s2 = result[0].Lastname;
                       let re = s1.concat(s2);
                        
                        let user_profile={contactname:re, email:result[0].Email, address:result[0].Address, city:result[0].City,birthday:bdate, contactnumber:result[0].ContactNumber};
                        //let usertype=decodedToken.usertype;
                        
                        res.locals.user_profile=user_profile;
                        
                        res.render('delieveryorder');
                    }
                /*
                    res.locals.firstname,res.locals.lastname=null;
                    res.redirect('/login');*/
            
            });
            }
        })
    }else{
        res.locals.user_profile=null;
       res.render('delieveryorder');
    }
}

exports.pickupOrder = (req, res) => { 
    const {ContactName, contactnumber,pickupdate,payment}=req.body;
    console.log(req.body);
    
     db.beginTransaction(function(err) {
  if (err) { throw err; }
  db.query('INSERT INTO `order` SET ?', {Cart_ID:4,Delivery_Method:"Pickup"}, function(err, result) {
      if (err) {
          db.rollback(function () {
              throw err;
          });
      }
      
      var order_id = result.insertId;      
        
      
 
   
 
    db.query('INSERT INTO `pickup order` SET ?',{Order_ID:order_id,Pickup_Date:pickupdate,ContactNumber:contactnumber,ContactName:ContactName}, function(err, result) {
      if (err) { 
        db.rollback(function() {
          throw err;
        });
        } 
        db.query('INSERT INTO `payment` SET ?',{Order_ID:order_id,Payment_Method:payment}, function(err, result) {
      if (err) { 
        db.rollback(function() {
          throw err;
        });
        } 
       
      db.commit(function(err) {
        if (err) { 
          db.rollback(function() {
            throw err;
          });
        }
        console.log('Transaction Complete.');
       
      });
    });
     
    });
  });
});
/* End transaction */
    res.render("index");
}
exports.delieveryorder= (req, res) => { 
    console.log(req.body);
       res.render("index");
}
