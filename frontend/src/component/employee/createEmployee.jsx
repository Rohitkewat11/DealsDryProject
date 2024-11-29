import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";



export function CreateEmployee() {
  const [errorMsg, setErrorMsg] = useState();
  let nevigate = useNavigate();
  const validation = Yup.object({
    email: Yup.string().email(),
    mobile:Yup.number(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      desigination:"",
      gender:"",
      course:[],
      profileImg: "",
    },
    validationSchema:validation,
    onSubmit:async (values) => {
      console.log(values);
      
      const formData = new FormData();

      for (let value in values) {
        formData.append(value, values[value]);
      }
      console.log(formData);

     await axios
      .post("http://127.0.0.1:2200/addEmployee",formData)
        .then((res) => {
          console.log(res.data);
          if (res.data ==="New Employee Added Succeessfully") {
            setErrorMsg("");
            nevigate("/adminDashboard");
          } else {
            setErrorMsg(res.data);
          }
        })
        .catch((error) => {
          console.log(error); 
          alert("error");
        });
    }
  });

  // function for goto dashboard//
  function handlegotoDashboardBtn(){
    nevigate("/adminDashboard");
  }
  return (
    <>
        <div className="text-end mt-1" style={{marginRight:"20em"}}>
          <button className="btn btn-primary" onClick={handlegotoDashboardBtn}>Dashboard</button>
        </div>
      <div className="d-flex justify-content-center me-5">
        <div className="w-25 border border-dark rounded mt-2">
          <h4 className="bg-warning rounded p-1">Add Employee</h4>
          <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
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
              />
              <p className="text-red-500">{formik.errors.email}</p>
              <label className="form-label fw-semibold" htmlFor="">
                Mobile
              </label>
              <input
                onChange={formik.handleChange}
                className="form-control"
                type="text"
                name="mobile"
                placeholder="Mobile"
              />
              <p className="text-red-500">{formik.errors.mobile}</p>
              <label className="form-label fw-semibold" htmlFor="">
                Desigination
              </label>
              <select name="desigination" className="form-control" onChange={formik.handleChange}>
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
              />&nbsp;Male</span>&nbsp;&nbsp;
              <span><input
                onChange={formik.handleChange}
                className=""
                type="radio"
                name="gender"
                value="female"
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
              <div className="text-danger">{errorMsg}</div>
              <button
                type="submit"
                className="btn btn-primary mt-3 form-control"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
