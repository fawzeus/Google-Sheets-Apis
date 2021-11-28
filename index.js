const express = require("express");
const {google} = require("googleapis");
var cors = require('cors')


const app=express();
const port = 3000 ;
app.use(cors());
app.options('*', cors());
app.use(express.static("public"))
app.use('/css',express.static(__dirname + 'public/css'));
app.use('/img',express.static(__dirname + 'public/img'));
app.use('/js',express.static(__dirname + 'public/js'));
app.use('/lib',express.static(__dirname + 'public/contactform'));
app.use('/contactform',express.static(__dirname + 'public/lib'));

app.set("view engine", "ejs");
app.set("views","./views");

app.get("/", async (req,res)=>{
    res.render("index");
})

app.post("/", async (req, res) => {
    
    const { name, email,subject,message } = req.body;
    
  
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
  
    // Create client instance for auth
    const client = await auth.getClient();
  
    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });
  
    const spreadsheetId = "1uLu7-xUAhsGu2jTFA6pq8MWCdO1uFHPFSw9GxVv-_2c";
  
    // Get metadata about spreadsheet
    const metaData = await googleSheets.spreadsheets.get({
      auth,
      spreadsheetId,
    });
  
    // Write row(s) to spreadsheet
    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Sheet1",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[name, email,subject,message]],
      },
    });  
    res.send("Successfully submitted! Thank you!");
  });




//app.listen(1234,(req,res)=>console.log("app running on 1234"));
app.listen(process.env.PORT || port, ()=> console.log(`listning on port ${port}`))

