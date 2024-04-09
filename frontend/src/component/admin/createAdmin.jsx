import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";

export function CreateAdmin() {
  const [errorMsg, setErrorMsg] = useState();
  let nevigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      profileImg: "",
    },

    onSubmit: async (values) => {
      const formData = new FormData();

      for (let value in values) {
        formData.append(value, values[value]);
      }
      console.log(formData);
      await axios
        .post("http://127.0.0.1:2200/createAdmin", formData)
        .then((res) => {
          if ("New Admin Added Succeessfully" === res.data) {
            setErrorMsg("");
            nevigate("/");
          } else {
            setErrorMsg(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  return (
    <>
      <div className="d-flex justify-content-end me-5">
        <div className="w-25 border border-dark rounded mt-5">
          <h3 className="bg-warning rounded p-1">Create Account</h3>
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
              <label className="form-label fw-semibold" htmlFor="">
                Password
              </label>
              <input
                onChange={formik.handleChange}
                className="form-control"
                type="text"
                name="password"
                placeholder="Password"
              />
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
              />
              <div className="text-danger">{errorMsg}</div>
              <button
                type="submit"
                className="btn btn-primary mt-3 form-control "
              >
                Submit
              </button>
              <p>
                Have Account? <Link to="/loginAdmin">login.</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
