const express = require("express");
const { db } = require("../Authen-Author/model/userModel");
const dbConnection = require("./DBConnection/dbConnection");
const router = require("./routers/router");
require("dotenv").config();
const HomeRouter = require("./routers/home-routes");
const adminRouter = require("./routers/admin-routes");
const imageRoutes=require("./routers/upload-image-route")


const app = express();

app.use(express.json());
app.use("/api/v1" ,router)
app.use("/api/home" ,HomeRouter)
app.use("/admin/v1" ,adminRouter)
app.use("/upload" , imageRoutes)


dbConnection();
port = process.env.PORT|| 3000;
app.listen(port , ()=>{
    console.log(`app listen on port no ${port}`)
})