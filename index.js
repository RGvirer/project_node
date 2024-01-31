import express from "express";
import { config } from "dotenv";
import {connectDB} from "./config/dbConfig.js"
import productRouter from "./routes/product.js"; 
import userRouter from "./routes/user.js"; 
import orderRouter from "./routes/order.js"; 
import morgan from "morgan";
import cors from "cors"
import { erroHandling } from "./middlewares/erroHandling.js"

config();
connectDB();

const app=express();
app.use(express.static('images'));
app.use(morgan("common"));
app.use(express.json());
app.use(cors({origin:"https://storeserver-uoax.onrender.com"}));
app.use("/api/products",productRouter);
app.use("/api/users",userRouter);
app.use("/api/orders",orderRouter);
app.use(erroHandling)//בלי סוגריים
app.use((err,req,res,next)=>{
    res.status(res.status||500).send(err.message||"a fault has occurred");
})
let port=process.env.PORT||6000
app.listen(port,()=>{
    console.log("listening on port "+port);
});