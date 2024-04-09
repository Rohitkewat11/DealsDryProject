require("dotenv").config();
const express = require("express");
const cors = require("cors");


const app = express();
app.use(cors());


const port = 2200;
const connectDB = require("./connectDB/connectDB");
app.use(express.urlencoded(({extended:true})));
app.use(express.json());
const adminRouteInfo = require('../backend/route/adminRoute');
const employeeRouteInfo = require("../backend/route/employeeRoute");
app.use('/',adminRouteInfo);
app.use('/',employeeRouteInfo);
app.use(express.static("public"));

const start = async () => {
  try {
    await connectDB(process.env.connectDB_string);
    app.listen(port, () => {
      console.log("server started:2200");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
