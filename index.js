const express = require("express");
const {google} = require("googleapis");

const app=express();

app.use(express.static("public"))
app.use('/css',express.static(__dirname + 'public/css'));
app.use('/img',express.static(__dirname + 'public/img'));
app.use('/js',express.static(__dirname + 'public/js'));
app.use('/lib',express.static(__dirname + 'public/lib'));

app.set("view engine", "ejs");
app.set("views","./views");

app.get("/", async (req,res)=>{
    res.render("index");
})

app.listen(1234,(req,res)=>console.log("app running on 1234"));

