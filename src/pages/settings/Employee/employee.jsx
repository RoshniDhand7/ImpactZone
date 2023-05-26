import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useState } from "react";
import Employee from "./manageEmployee/manageEmployee";

const ManageEmployee = () => {
  const [activeIndex1, setActiveIndex1] = useState(0);
  return (
    <>
      <div className="">
        <div className="p-3">
          <TabView
            activeIndex={activeIndex1}
            onTabChange={(e) => setActiveIndex1(e.index)}
          >
            <TabPanel header="Manage Employee">
              <Employee />
            </TabPanel>
            <TabPanel header="Avaliability"></TabPanel>
            <TabPanel header="Timesheets"></TabPanel>
            <TabPanel header="Departments"></TabPanel>
            <TabPanel header="Security Roles"></TabPanel>
            <TabPanel header="Report Security"></TabPanel>
          </TabView>
        </div>
      </div>
    </>
  );
};

export default ManageEmployee;
