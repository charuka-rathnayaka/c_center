const express=require('express');
//const mysql=require("mysql");
const path=require("path");


const dotenv=require('dotenv');
const cookieParser=require("cookie-parser");
dotenv.config({path:'./.env'});
const checkuser=require('./middleware/auth_middleware.js');
const app=express();
//from out 
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

//here


const hbs = require('hbs');
var fs = require('fs');


app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
/*
const db=mysql.createConnection({
    host:process.env.database_host,
    user:process.env.database_user,
    password:process.env.database_pwd,
    database:process.env.database
});*/
const public_directory = path.join(__dirname,'./public');
app.use(express.static(public_directory));


app.set('view engine','hbs');
const db=require('./database/database_server.js');
/*
db.connect((error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log('database connected');
    }
});*/


//partial
//hbs.registerPartial('partial', fs.readFileSync(__dirname + '/views/partial.hbs', 'utf8'));
hbs.registerPartials(__dirname + '/views/partials');
//end partial
app.use('*',checkuser);
//console.log(user);
app.use('/',require("./routes/pages"));

app.use("/auth", require("./routes/auth"));

app.use("/order",require("./routes/order"));
//app.get('*',checkuser);

//app.use("/product",require("./routes/product"));

app.listen(5000,()=>{
    console.log('Server started');
})