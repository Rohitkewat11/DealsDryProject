import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export function AdminDashboard() {
  const [data, setData] = useState([]);
  const [adminInfo, setAdminInfo] = useState({});
  const [total_Emp, setTotal_Emp] = useState();
  let nevigate = useNavigate();

  // retrive payload from jwt token================>
  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  //function for AdminLogout===============>
  function handleLogout() {
    localStorage.removeItem("token");
    nevigate("/");
  }

  // function for add new employee form//
  function handleAddEmpBtn() {
    nevigate("/createEmployeeData");
  }

  // function for remove Employee Data//
  async function btnRemove(e) {
    const value = { val: e.target.value };
    var flag = window.confirm("delete?\n are your sure.");
    if (flag) {
      await axios.post("http://127.0.0.1:2200/deleteEmployeeData", value);
    }
  }

  // function for update employee data//
  function btnUpdate(e) {
    nevigate(`/updateEmployeeData/${e.target.value}`);
  }

  // function for total pages//
  function totalPages(total_Emp, limit) {
    const page = [];
    for (let i = 1; i <= parseInt(total_Emp / limit); i++) {
      page.push(i);
    }
    return page;
  }

  // variable for pagination//
  const [active, setActive] = useState(1);
  const page = active;
  const limit = 6;

  // function for search Employee by Name,Emp_ID,Email//
  function handleSearchEmp(e){
    if(e.target.value){
      axios
      .get(`http://127.0.0.1:2200/findEmployee?Emp_details=${e.target.value}`)
      .then((res)=>{
        setData(res.data)
    })
    }
    else{
      axios
      .get(`http://127.0.0.1:2200/employee?page=${page}&limit=${limit}`)
      .then((res) => {
        setData(res.data.Emp_data);
        setTotal_Emp(res.data.total_Emp + 6);
      });
    }
  }


  useEffect(() => {
    axios
      .get(`http://127.0.0.1:2200/employee?page=${page}&limit=${limit}`)
      .then((res) => {
        setData(res.data.Emp_data);
        setTotal_Emp(res.data.total_Emp+6);
      });
    const retriveToken = localStorage.getItem("token");
    if (retriveToken) {
      const data = parseJwt(retriveToken);
      setAdminInfo(data.isAdmin);
    } else {
      nevigate("/");
    }
  },[active]);
  
  return (
    <>
      <div className="bg-dark p-1">
        <div className="text-white text-end me-5 align-items-center">
          Welcome!&nbsp;&nbsp;{adminInfo.name}&nbsp;&nbsp;
          <img src={`http://127.0.0.1:2200/profileImages/${adminInfo.profileImg}`} alt="" height={25} />&nbsp;&nbsp;
          <span
            className="bi bi-power text-danger fs-5"
            title="Logout"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          ></span>
        </div>
      </div>

      <div>
        <div className="row ms-5 me-5 mt-4">
          <div className="col-6 h3 fw-bold text-decoration-underline">
            Employee Details:-
          </div>
          <div className="col-6 text-end">
            <button className="btn btn-primary w-25" onClick={handleAddEmpBtn}>
              Add New Employee
            </button>
            <div className="input-group mt-3">
              <input
                className="form-control"
                type="text"
                placeholder="Search by Name, Emp_id, Email"
                onKeyUp={handleSearchEmp}
              />
              <button className="bi bi-search btn btn-warning"></button>
            </div>
          </div>
        </div>
        <table className="table table-striped text-start text-wrap">
          <thead>
            <tr className="text-center">
              <th>Emp_id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Desigination</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Enroll Date</th>
            </tr>
          </thead>
          <tbody style={{height:300+"px"}}>
            {data.map((val) => (
              <tr className="text-center" key={val.emp_id}>
                <td>{val.emp_id}</td>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.mobile}</td>
                <td>{val.desigination}</td>
                <td>{val.gender}</td>
                <td>{val.course}</td>
                <td>{val.enroll}</td>
                <td>
                  <button
                    className="bi bi-pen btn btn-warning me-2"
                    title="Update"
                    value={val.emp_id}
                    onClick={btnUpdate}
                  ></button>
                  <button
                    className="bi bi-trash btn btn-danger"
                    title="Remove"
                    value={val.emp_id}
                    onClick={btnRemove}
                  ></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-end me-4 mt-4">
        <button  style={{visibility:(active===1)?"hidden":"visible"}} className="btn btn-primary bi bi-chevron-left me-2" onClick={()=>setActive(active-1)} >Prev</button>
        {totalPages(total_Emp, limit).map((page) => (
          <span
            key={page}
            onClick={() => setActive(page)}
            className="border btn border-primary me-1"
          >
            {page}
          </span>
        ))}
        <button style={{visibility:(active===totalPages(total_Emp, limit).length)?"hidden":"visible"}} className="btn btn-primary ms-1" onClick={()=>setActive(active+1)}>
          Next<i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </>
  );
}
