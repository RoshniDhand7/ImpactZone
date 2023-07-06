import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="mx-3">
        <nav className=" col-12 p-0 navbar shadow-3 ">
          <ul className=" lg:col-7 md:col-10 nav flex justify-content-between">
            <div className="border-show pb-3 p-2 pl-3 ml-3">
              <NavLink to="/employee" ClassName="nav-bar-link">
                <span className="text-underline"> Manage Employee</span>
              </NavLink>
            </div>

            <div className="border-show pb-3 p-2">
              <NavLink to="/availability" ClassName="nav-bar-link">
                <span className="text-underline">Avaliability</span>
              </NavLink>
            </div>
            <div className="border-show pb-3 p-2">
              <NavLink to="/timesheets" ClassName="nav-bar-link">
                <span className="text-underline">Timesheets</span>
              </NavLink>
            </div>

            <div className="border-show pb-3 p-2">
              <NavLink to="/department" ClassName="nav-bar-link">
                <span className="text-underline">Departments</span>
              </NavLink>
            </div>
            <div className="border-show pb-3 p-2">
              <NavLink to="/securityRoles" ClassName="nav-bar-link">
                <span className="text-underline"> Security Roles</span>
              </NavLink>
            </div>

            <div className="border-show pb-3 p-2">
              <NavLink to="/manageReportSecurity" ClassName="nav-bar-link">
                <span className="text-underline">Report Security </span>
              </NavLink>
            </div>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
