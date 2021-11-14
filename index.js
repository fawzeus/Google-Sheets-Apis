const express = require("express");
const {google} = require("googleapis");

const app=express();

app.get("/", async (req,res)=>{
    const auth = new google.auth.GoogleAuth(
        {
            keyFile :"credentials.json",
            scopes : "https://googleapis.com/auth/spreadsheets",
        }
    )
    // create client instance for auth
    const client = await auth.getClient();

    //instance of Googlesheets API
    const googlesheets = google.sheets({version:"v4",auth:client});
    
    res.send("hello world");
});

app.listen(1234,(req,res)=>console.log("app running on 1234"));

