const AdminData = require("../model/adminSchema");
const bcrypt = require("bcrypt");     // for hashing password//
const jwt = require("jsonwebtoken"); // import jsonWebToken library//


// API for featching all Admin list========================>
const getAdminList = async (req, res) => {
  try {
    const myData = await AdminData.find({});
    res.status(200).json(myData);
  } catch (error) {
    res.status(200).send(error);
  }
};

// API for creating new admin===========================>
const addAdmin = async (req, res) => {
  const { name, email, password } = req.body;


  try {
    // validating user already exist or not//
    const adminEmailExist = await AdminData.findOne({ email: email.toLowerCase()});
    
    if((name=="") || (email == "") || (password == "")){
      res.status(200).send("All field are required*");
    }

    else if(adminEmailExist) {
        res.status(200).send(" E-mail Already Exist:Try Another");
    }
    else{ 
      // hashing passsword with bcrypt library//
      const salt = 10;
      const hash_password = await bcrypt.hash(password, salt);
      
      const adminData = {
        name: name.toUpperCase(),
        email: email.toLowerCase(),
        password: hash_password,
        profileImg: req.file.filename,
      };
      
      //if user not exist just create it new user//
      await AdminData.create(adminData);
      res.status(200).send("New Admin Added Succeessfully");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// API for Admin Login=========================>
const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const jwtSecretKey = process.env.jwt_secret_key;
  
  try {
    // checking Admin email is available or not//
    const isAdmin = await AdminData.findOne({ email: email.toLowerCase() });
    // console.log(isAdmin);
    if((email == "") || (password == "")){
      res.status(200).send("All field are required*");
    }

   else if (isAdmin) {
      // compaire user given password with DB increpted password//
      const isMatchPassword = await bcrypt.compare(password, isAdmin.password);

      if (isMatchPassword) {
        // create JWT token//
        let jwttoken = await jwt.sign({ isAdmin }, jwtSecretKey);

        
        await AdminData.findOneAndUpdate(
            { email: isAdmin.email },
            { $set: { token: jwttoken } }
          );

          await res.status(200).send(jwttoken);
      } else {
        res.status(200).send("invalid credetial: password wrong");
      }
    } else {
      res.status(200).send("Invalid user:Email not found");
    }
  } catch (error) {
    res.status(200).send(error);
  }
};

// import all API function //
module.exports = { getAdminList, addAdmin, adminLogin };
