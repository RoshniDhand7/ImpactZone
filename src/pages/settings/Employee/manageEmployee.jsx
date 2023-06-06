import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useState } from "react";
import Employee from "./manageEmployee/manageEmployee";
import Availability from "./Availability/Availability";
import TimeSheets from "./TimeSheets/TimeSheets";
import Department from "./Department/Department";
import SecurityRoles from "./Security Roles/securityRoles";
import ManageReportSecurity from "./ReportSecurity/ManageReportSecurity";
import Navbar from "../../../layout/Navbar";

const ManageEmployee = () => {
  // const [activeIndex1, setActiveIndex1] = useState(0);
  return (
    <>
      <div className="">
        <div className="p-3">
          <Navbar />
          {/* <TabView
            activeIndex={activeIndex1}
            onTabChange={(e) => setActiveIndex1(e.index)}
          >
            <TabPanel header="Manage Employee">
              <Employee />
            </TabPanel>
            <TabPanel header="Avaliability">
              <Availability />
            </TabPanel>
            <TabPanel header="Timesheets">
              <TimeSheets />
            </TabPanel>
            <TabPanel header="Departments">
              <Department />
            </TabPanel>
            <TabPanel header="Security Roles">
              <SecurityRoles />
            </TabPanel>
            <TabPanel header="Report Security">
              <ManageReportSecurity />
            </TabPanel>
          </TabView> */}
        </div>
      </div>
    </>
  );
};

export default ManageEmployee;
