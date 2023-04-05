require("dotenv").config({ path: "./.env" });
const express = require("express");
const session = require("express-session");
const app = express();
var cors = require('cors')
const PORT = process.env.PORT || 4000;
const connectDatabase = require("./models/db");
const indexRouter  =  require('./routes/indexRoute')
const path = require("path");

const corsOptions = {
    origin: "*",
  };

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "/views/build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/build/index.html"));
});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.listen(PORT, () =>{
    connectDatabase();
 console.log(`server running on port: ${PORT}`)
})