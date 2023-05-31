import { HashRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
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

function App() {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <Router>
        <TopBar setIsActive={setIsActive} isActive={isActive} />
        <Routes>
          <Route>
            <Route exact path="/login" element={<Login />} />
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
            <Route exact path="/addEmployee" element={<AddEmployee />} />

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
