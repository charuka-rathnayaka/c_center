const mysql=require("mysql");


const db=mysql.createConnection({
    host:process.env.database_host,
    user:process.env.database_user,
    password:process.env.database_pwd,
    database:process.env.database
});
db.connect(function(err) {
    if (err) throw err;
});

module.exports=db;