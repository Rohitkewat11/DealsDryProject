import React, { useState ,useEffect} from "react";
import axios from 'axios';
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

export function UpdateEmployeeDetails(){

    const {empID}= useParams();
    const [data,setData] = useState({});
    const male = useState(data.gender=="male"?true:false);
    console.log(male);
    const formik = useFormik({
      initialValues: {
        name:data.name,
        email: data.email,
        mobile: data.mobile,
        desigination:data.desigination,
        gender:data.gender?data.gender:"",
        course:data.course,
      //   profileImg: "",
      },
      enableReinitialize:true,
      // onSubmit:async (values) => {
      //  await axios
      //   .post("http://127.0.0.1:2200/addEmployee", values)
      //     .then((res) => {
      //       if (res.data ==="New Employee Added Succeessfully") {
      //         // setErrorMsg("");
      //         alert("New Employee Added Succeessfully");
      //         // nevigate("/adminDashboard");
      //       } else {
      //         // setErrorMsg(res.data);
      //       }
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      // }
    });

    useEffect(()=>{
        axios.post("http://127.0.0.1:2200/findEmployee",{empID})
        .then(res=>{
            setData(res.data);
        }).catch(error=>{
            console.log(error);
        });
      },[]);
      console.log(data);
      return (
      <>
        {/* <div className="text-end mt-3" style={{marginRight:"20em"}}>
          <button className="btn btn-primary" onClick={handlegotoDashboard}>Dashboard</button>
        </div> */}
      <div className="d-flex justify-content-center me-5">
        <div className="w-25 border border-dark rounded mt-2">
          <h4 className="bg-warning rounded p-1">Update Emp_Data</h4>
          <form onSubmit={formik.handleSubmit}>
            <div className="p-2">
              <label className="form-label fw-semibold" htmlFor="">
                Name
              </label>
              <input
                onChange={formik.handleChange}
                className="form-control"
                type="text"
                name="name"
                placeholder="Full Name"
                value={formik.values.name}
              />
              <label className="form-label fw-semibold" htmlFor="">
                E-mail
              </label>
              <input
                onChange={formik.handleChange}
                className="form-control"
                type="text"
                name="email"
                placeholder="Email"
                value={formik.values.email}
              />
              <label className="form-label fw-semibold" htmlFor="">
                Mobile
              </label>
              <input
                onChange={formik.handleChange}
                className="form-control"
                type="text"
                name="mobile"
                placeholder="Mobile"
                value={formik.values.mobile}
              />
              <label className="form-label fw-semibold" htmlFor="">
                Desigination
              </label>
              <select name="desigination" className="form-control" onChange={formik.handleChange} value={formik.values.desigination}>
                <option>Select option</option>
                <option>Manager</option>
                <option>Hr</option>
                <option>Sales</option>
              </select>
              <label className="form-label fw-semibold" htmlFor="">
                Gender
              </label>
              <div>
              <span><input
                onChange={formik.handleChange}
                className=""
                type="radio"
                name="gender"
                value="male"
                // checked=`${male}`
              />&nbsp;Male</span>&nbsp;&nbsp;
              <span><input
                onChange={formik.handleChange}
                className=""
                type="radio"
                name="gender"
                value="Female"
              />&nbsp;Female</span>
              </div>
              <label className="form-label fw-semibold" htmlFor="">
                Course
              </label>
              <div>
                <span><input
                onChange={formik.handleChange}
                className=""
                type="checkbox"
                name="course"
                value="MCA"
              />&nbsp;MCA</span>&nbsp;&nbsp;
              <span><input
                onChange={formik.handleChange}
                className=""
                type="checkbox"
                name="course"
                value="PGDCA"
              />&nbsp;PGDCA</span>&nbsp;&nbsp;
              <span><input
                onChange={formik.handleChange}
                className=""
                type="checkbox"
                name="course"
                value="BA"
              />&nbsp;BA</span>
              </div>
              {/* <label className="form-label fw-semibold" htmlFor="">
                Profile
              </label>
              <input
                onChange={(event) => {
                  formik.setFieldValue(
                    "profileImg",
                    event.currentTarget.files[0]
                  );
                }}
                className="form-control"
                type="file"
                name="profileImg"
              /> */}
              {/* <div className="text-danger">{errorMsg}</div> */}
              <button
                type="submit"
                className="btn btn-primary mt-3 form-control "
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      </>
      )
  
}
