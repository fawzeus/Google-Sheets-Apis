const express = require("express");
const {google} = require("googleapis");

const app=express();

app.get("/",(req,res)=>{
    res.send("hello world");
});

app.listen(1234,(req,res)=>console.log("app running on 1234"));

