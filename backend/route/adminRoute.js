const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');


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
  

const {getAdminList,addAdmin,adminLogin} = require('../controller/adminController');


// Admin Routes//
router.route("/admin").get(getAdminList);
router.route("/createAdmin").post(upload.single('profileImg'),addAdmin);
router.route("/adminLogin").post(adminLogin);



module.exports = router;