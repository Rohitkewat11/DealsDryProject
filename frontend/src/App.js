import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "./component/homepage/homepage";
import { AdminLogin } from "./component/admin/adminLogin";
import { CreateAdmin } from "./component/admin/createAdmin";
import { AdminDashboard } from "./component/admin/adminDashboard";
import { CreateEmployee } from "./component/employee/createEmployee";
import { UpdateEmployeeDetails } from "./component/employee/updateEmployeeDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}>
          <Route path="/" element={<AdminLogin />} />
          <Route path="loginAdmin" element={<AdminLogin />} />
          <Route path="addAdmin" element={<CreateAdmin />} />
          <Route path="adminDashboard" element={<AdminDashboard />}/>
          <Route path="createEmployeeData" element={<CreateEmployee />} />
          <Route path="updateEmployeeData/:empID" element={<UpdateEmployeeDetails />}/>
        </Route>
        <Route
          path="*"
          element={
            <>
              <h2>Invalid Requested.</h2>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
