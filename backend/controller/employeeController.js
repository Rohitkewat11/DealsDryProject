const EmployeeData = require("../model/employeeSchema");


//  API for fetching all employee data==================>
const getAllEmployee = async(req,res)=>{

  const page = parseInt(req.query.page)||0;
  const limit =parseInt(req.query.limit)||0;
  const skip = (page-1)*limit;
  
    const total_Emp =await EmployeeData.countDocuments();
    const Emp_data = await EmployeeData.find().skip(skip).limit(limit);
    res.status(200).json({
      Emp_data,total_Emp
    });
};

//  API for creating new employee data=====================>
const addEmployee =async (req, res) => {
    const {name, email, mobile, desigination, gender,course } = req.body;
    const courseArray = typeof course === "string" ? course.split(",") : course;
    
    try {
      // validating employee already exist or not//
      const employeeEmailExist = await EmployeeData.findOne({ email: email });
      
      if(name==""||email==""||mobile==""||desigination==""||gender==""||course==""||req.file.filename==""){
        return res.status(200).send("All fields are required");
      }
      else if (employeeEmailExist) {
        console.log(employeeEmailExist);
        return res.status(200).send("E-mail Already Exist:Try Another");
        }
      else{
        // for creating employee unique ID//
        var Emp_Count = 1;
        var isEmpID = await EmployeeData.findOne({ emp_id: `DDPL${Emp_Count}`});
            
        // if Emp_id is exist in DB, creating new one//
        while (isEmpID) {
            Emp_Count = Emp_Count + 1;
            isEmpID = await EmployeeData.findOne({ emp_id: `DDPL${Emp_Count}`});
        }
        // creating current date while register new employee//
        const currentDate = new Date();
        const month=['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec'];
        const yyyy = currentDate.getFullYear();
        const mm = currentDate.getMonth();
        const dd = currentDate.getDate();

        const Emp_Data = {
            emp_id:`DDPL${Emp_Count}`,
            name: name,
            email: email,
            mobile:mobile,
            desigination:desigination,
            gender:gender,
            course:courseArray,
            enroll:`${dd}-${month[mm]}-${yyyy}`,
            profileImg: req.file.filename,
        };
  
      //if user not exist just create it new user//
      await EmployeeData.create(Emp_Data);
      res.status(200).send("New Employee Added Succeessfully");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }

// API for find EMP based on EMp_id=========================>
  const findEmpID = async(req,res)=>{
    const EmpID = req.query.empID;

    try {
      const emp_data =await EmployeeData.findOne({emp_id:EmpID});
      res.status(200).send(emp_data)
    } catch (error) {
      res.status(404).send(error);
    }
  }

//   API for find specific Employee Data====================>
  const findEmployee = async (req,res)=>{
    const Emp_details = req.query.Emp_details;
    
    try {
      const employeeExist = await EmployeeData.find({$or:[{email:Emp_details},{name:Emp_details},{emp_id:Emp_details}]});
      if (employeeExist) {
        res.status(200).send(employeeExist);
      }else{
        res.status(404).send("Data not found: Employee not exist");
      }
    } catch (error) {
        res.status(500).send(error);
    }
  };

//   API for updating employee data===================>
  const updateEmployeeData = async (req,res)=>{
    
    const {emp_id, name, email, mobile, desigination, gender,course } = req.body;
    
    
    const updatedEmpData = {
      emp_id:emp_id,
      name:name,
      email:email,
      mobile:mobile,
      desigination:desigination,
      gender:gender,
      course:course,
      profileImg: req.file.filename,
    }
    
    console.log(updatedEmpData);
    try {
        await EmployeeData.findOneAndUpdate({ emp_id: emp_id }, { $set: updatedEmpData });
            res.status(200).send("Employee data updated successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
  };

//  API for delete specipic employee data=================>

  const deleteEmployeeData = async(req,res)=>{
    const emp_id = req.body.val;
    try {
        const employeeEmailExist = await EmployeeData.findOne({emp_id:emp_id});
        if (employeeEmailExist) {
            await EmployeeData.findOneAndDelete({emp_id:emp_id});
          res.status(200).send("Employee data delete successfully");
        }else{
          res.status(404).send("Data not found: Employee not exist");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
  };

module.exports = {getAllEmployee,addEmployee,findEmpID,findEmployee,updateEmployeeData,deleteEmployeeData};