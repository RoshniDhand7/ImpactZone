import {
  HashRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import React, { useEffect } from "react";
import { useState } from "react";
import "./styles.scss";
import TopBar from "./layout/Topbar";
import Login from "./pages/login/login";
import Forgotpassword from "./pages/forgotPassword/forgotPassword";
import DashBoard from "./pages/dashboard/DashBoard";
import FastAdd from "./pages/popups/fastAdd";
import UserMember from "./pages/checkIn/userMember";
import Settings from "./pages/settings/settings";
import Company from "./pages/settings/BusinessSettings/company/company";
import ReasonCode from "./pages/settings/BusinessSettings/reason Code/reasonCode";
import AddReasonCode from "./pages/settings/BusinessSettings/reason Code/addResonCode";
import BusinessSettings from "./pages/settings/BusinessSettings/BusinessSettings";
import ManageEmployee from "./pages/settings/Employee/manageEmployee";
import AddEmployee from "./pages/settings/Employee/manageEmployee/addemployee/addEmployee";
import Availability from "./pages/settings/Employee/Availability/Availability";
import TimeSheets from "./pages/settings/Employee/TimeSheets/TimeSheets";
import Department from "./pages/settings/Employee/Department/Department";
import SecurityRoles from "./pages/settings/Employee/Security Roles/securityRoles";
import ManageReportSecurity from "./pages/settings/Employee/ReportSecurity/ManageReportSecurity";
import Employee from "./pages/settings/Employee/manageEmployee/manageEmployee";
import ScheduleSetup from "./pages/settings/ScheduleSetup/ScheduleSetup";
import Loader from "./components/loader";
import SchedulingOptions from "./pages/settings/ScheduleSetup/Schedulingoptions";
import ToastContainer from "./components/toast";
import MemberSetup from "./pages/settings/MemberSetup/MemberSetup";

function App() {
  const [isActive, setIsActive] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogged(true);
    }
  }, []);

  return (
    <>
      <Loader />
      <ToastContainer />
      <Router>
        {isLogged ? (
          <TopBar
            setIsActive={setIsActive}
            isActive={isActive}
            isLogged={isLogged}
            setIsLogged={setIsLogged}
          />
        ) : null}
        <Routes>
          <Route>
            <Route
              exact
              path="/login"
              element={<Login setIsLogged={setIsLogged} />}
            />
            <Route exact path="/user-member" element={<UserMember />} />
            <Route exact path="/fastadd" element={<FastAdd />} />
            <Route exact path="/forgotpassword" element={<Forgotpassword />} />
            <Route
              exact
              path="/businessSettings"
              element={<BusinessSettings />}
            />
            <Route exact path="/company" element={<Company />} />
            <Route exact path="/reasonCode" element={<ReasonCode />} />
            <Route exact path="/addReasonCode" element={<AddReasonCode />} />
            <Route exact path="/manageEmployee" element={<ManageEmployee />} />
            <Route exact path="/employee" element={<Employee />} />
            <Route exact path="/availability" element={<Availability />} />
            <Route exact path="/timesheets" element={<TimeSheets />} />
            <Route exact path="/department" element={<Department />} />
            <Route exact path="/securityRoles" element={<SecurityRoles />} />
            <Route exact path="/manageSetup" element={<MemberSetup />} />

            <Route
              exact
              path="/schedulingoptions"
              element={<SchedulingOptions />}
            />
            <Route
              exact
              path="/manageReportSecurity"
              element={<ManageReportSecurity />}
            />
            <Route exact path="/addEmployee" element={<AddEmployee />} />
            <Route exact path="/scheduleSetup" element={<ScheduleSetup />} />
            <Route exact path="/settings" element={<Settings />} />
            <Route
              exact
              path="/"
              element={
                <DashBoard setIsActive={setIsActive} isActive={isActive} />
              }
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
export default App;
