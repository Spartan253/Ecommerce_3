const express=require('express');
const app=express();
const dotenv=require('dotenv');
const cookieParser=require("cookie-parser");
const cors=require("cors");
const database=require("./config/database");

require("dotenv").config();
const PORT=process.env.PORT || 4000;

//database connect 
database.connect();

app.use(cors({
  origin: [ "https://ecommerce-3-tau.vercel.app"],
  credentials: true,
}));



// middleware 
app.use(express.json());
app.use(cookieParser());

//routes
const UserRoutes=require('./routes/user');
const OrderRoutes=require('./routes/order');
const ProductRoutes=require("./routes/product");
//mount
app.use("/api/v1/auth",UserRoutes);
app.use("/api/v1/order",OrderRoutes);
app.use("/api/v1/product",ProductRoutes);


//default routes
app.get('/',(req,res)=>{
    return res.json({
        success:true,
        message:"youe server is running succesfully",
    })
})

app.listen(PORT,(err)=>{
    if(err){
        console.log(`error in the ${err.message}`);

    }
    else{
        console.log(`app is running at ${PORT}`);
    }
})