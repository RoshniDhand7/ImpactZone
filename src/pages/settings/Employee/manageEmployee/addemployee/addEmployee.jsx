import { TabView, TabPanel } from "primereact/tabview";
import React from "react";
import { useState } from "react";
import { General } from "../../../BusinessSettings/company/general";
import GeneralAddEmployee from "./general";

const AddEmployee = () => {
  const [activeIndex2, setActiveIndex2] = useState(0);
  return (
    <>
      <div>
        <div className="m-3 ">
          <span className="font-bold">Add Employee</span>
        </div>
        <div>
          <div className="p-3">
            <TabView
              activeIndex={activeIndex2}
              onTabChange={(e) => setActiveIndex2(e.index)}
            >
              <TabPanel header="General">
                <GeneralAddEmployee />
              </TabPanel>
              <TabPanel header="Security"></TabPanel>
              <TabPanel header="Departments"></TabPanel>
              <TabPanel header="Clubs"></TabPanel>
              <TabPanel header="Services Setup"></TabPanel>
              <TabPanel header="Sales Commission"></TabPanel>
              <TabPanel header="Time Sheet"></TabPanel>
              <TabPanel header="Notes"></TabPanel>
              <TabPanel header="Certifications"></TabPanel>
            </TabView>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
