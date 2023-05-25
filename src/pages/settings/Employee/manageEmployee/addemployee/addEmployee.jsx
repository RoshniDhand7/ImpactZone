import { TabView, TabPanel } from "primereact/tabview";
import React from "react";
import { useState } from "react";
import GeneralAddEmployee from "./general";
import Department from "./Department";
import Security from "./security";
import Clubs from "./Clubs";
import ClassesSetup from "./classesSetup/ClassesSetup";
import ServiceSetup from "./Services Setup/ServiceSetup";
import SalesCommission from "./Salescommission/SalesCommission";
import Notes from "./Notes";
import Certifications from "./Certification";

const AddEmployee = () => {
  const [activeIndex2, setActiveIndex2] = useState(0);
  return (
    <>
      <div>
        <div>
          <div className="mx-3 mt-3 ">
            <span className="font-bold text-xl">Add Employee</span>
          </div>
          <div className="p-3">
            <TabView
              activeIndex={activeIndex2}
              onTabChange={(e) => setActiveIndex2(e.index)}
            >
              <TabPanel header="General">
                <GeneralAddEmployee />
              </TabPanel>
              <TabPanel header="Security">
                <Security />
              </TabPanel>
              <TabPanel header="Departments">
                <Department />
              </TabPanel>
              <TabPanel header="Clubs">
                <Clubs></Clubs>
              </TabPanel>
              <TabPanel header="Classes Setup ">
                <ClassesSetup />
              </TabPanel>
              <TabPanel header="Services Setup">
                <ServiceSetup />
              </TabPanel>
              <TabPanel header="Sales Commission">
                <SalesCommission />
              </TabPanel>
              <TabPanel header="Time Sheet"></TabPanel>
              <TabPanel header="Notes">
                <Notes />
              </TabPanel>
              <TabPanel header="Certifications">
                <Certifications />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
