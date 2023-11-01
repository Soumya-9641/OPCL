const express= require('express');
require("./db/connection");
const cors = require('cors');
const user=require('./router/User')
const admin = require("./router/admin")
const test= require("./router/test")
const response = require("./router/response")
const app= express();

app.use(express.json())
app.use(cors());
app.use("/user",user);
app.use("/admin",admin);
app.use("/test",test);
app.use("/response",response);
app.get("/",(req,res)=>{
    res.send("hello world");
})

app.listen(5000,()=>{
    console.log("app is running on port 5000");
})