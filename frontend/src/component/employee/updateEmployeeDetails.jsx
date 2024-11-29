import React, { useState ,useEffect} from "react";
import axios from 'axios';
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

export function UpdateEmployeeDetails(){

    const {empID}= useParams();
    const [data,setData] = useState({});
    const nevigate = useNavigate();
    const formik = useFormik({
      initialValues: {
        emp_id:data?.emp_id ||"",
        name:data?.name || "",
        email: data?.email ||"",
        mobile: data?.mobile ||"",
        desigination:data?.desigination || "",
        gender:data?.gender || "",
        course:data?.course || [],
        profileImg:data?.profileImg || "",
      },
      enableReinitialize:true,
      onSubmit:async (values) => {
        console.log(values);

        const formData = new FormData();

      for (let value in values) {
        formData.append(value, values[value]);
      }
      console.log(formData);

        
       await axios
        .put("http://127.0.0.1:2200/updateEmployeeData", formData)
          .then((res) => {
            console.log(res.data);
            nevigate("/adminDashboard");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });


   
    useEffect(()=>{
        axios.post(`http://127.0.0.1:2200/findEmpID?empID=${empID}`)
        .then(res=>{
            setData(res.data);
            // console.log(res.data);
        }).catch(error=>{
            console.log(error);
        });
      },[]);

      return (
      <>
        <div className="text-end mt-3" style={{marginRight:"20em"}}>
    <button className="btn btn-primary" onClick={()=>{ 
      nevigate("/adminDashboard");}}>Dashboard</button>
        </div>
      <div className="d-flex justify-content-center me-5">
        <div className="w-25 border border-dark rounded mt-2">
          <h4 className="bg-warning rounded p-1">Update Emp_Data</h4>
          <form onSubmit={formik.handleSubmit}>
            <div className="p-2">
            <label className="form-label fw-semibold" htmlFor="">
                Emp_ID
              </label>
              <input
                onChange={formik.handleChange}
                className="form-control"
                type="text"
                name="emp_id"
                placeholder="Emp_ID"
                value={formik.values.emp_id}
                disabled
              />
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
                checked={formik.values.gender === "male"}
              />&nbsp;Male</span>&nbsp;&nbsp;
              <span><input
                onChange={formik.handleChange}
                className=""
                type="radio"
                name="gender"
                value="female"
                checked={formik.values.gender === "female"}
              />&nbsp;Female</span>
              </div>
              <label className="form-label fw-semibold" htmlFor="">
                Course
              </label>
              <div>
  {["MCA", "PGDCA", "BA"].map((course) => (
    <span key={course}>
      <input
        type="checkbox"
        name="course"
        value={course}
        onChange={(e) => {
          const value = e.target.value;
          const isChecked = e.target.checked;

          if (isChecked) {
            formik.setFieldValue("course", [...formik.values.course, value]);
          } else {
            formik.setFieldValue(
              "course",
              formik.values.course.filter((item) => item !== value)
            );
          }
        }}
        checked={formik.values.course.includes(course)}
      />
      &nbsp;{course}
    </span>
  ))}
</div>
              <label className="form-label fw-semibold" htmlFor="">
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
                accept=".png,.jpg"
              />
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
