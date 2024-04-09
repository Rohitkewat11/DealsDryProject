const express = require('express');
const router = express.Router();
const multer = require("multer");
const path   = require("path");

const {getAllEmployee, addEmployee, findEmployee,updateEmployeeData,deleteEmployeeData} = require("../controller/employeeController");


// function for uploading profile Images=========>

const storage = multer.diskStorage({
    destination:(req, file, cb)=> {
      cb(null, "public/profileImages");
    },
    filename:(req, file, cb) => {
      cb(null,file.fieldname +"_"+ Date.now()+path.extname(file.originalname));
    },
  
  });
  
  const upload = multer({
    storage:storage
  });



//API route for Employee //
router.get("/employee",getAllEmployee);
router.post("/addEmployee",upload.single('profileImg'),addEmployee);
router.get("/findEmployee",findEmployee);
router.put("/updateEmployeeData",updateEmployeeData);
router.post("/deleteEmployeeData",deleteEmployeeData);


module.exports = router;