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
import Certifications from "./Certifications/Certification";
import Navbar from "../../../../../layout/Navbar";

const AddEmployee = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [data, setData] = useState({
    isActive: true,
    personalInfo: {
      firstName: "manvir",
      lastName: "Singh",
      middleInitial: "",
      title: "6488785897e657a7a583d2ee",
      dob: "",
      socialSecurity: "unkonwn",
    },
    systemInfo: {
      email: "manvir@yopmail.com",
      barCode: "",
      accessCode: "2703",
      multiClubClockIn: "true",
    },
    employmentInfo: {
      hireDate: "2023-09-13",
      adpId: "21",
    },
    contactInfo: {
      primaryPhone: "8835561210",
      workPhone: "321654789",
      workPhoneExt: "4",
      mobilePhone: "7894561230",
      faxPhone: "",
      emergencyPhone: "784561230",
      emergencyPhoneExt: "78494561",
      street: "mohali",
      city: "Jalandhar",
      state: "punjab",
      zipCode: "160055",
      emailNotification: "true",
    },
    onlineInfo: {
      userName: "mavir",
      notes: "its wake up",
    },
  });

  return (
    <>
      <div>
        <div className="p-3">
          <Navbar />
        </div>
        <div>
          <div className="mx-3  ">
            <span className="font-bold text-xl">Add Employee</span>
          </div>
          <div className="p-3">
            <TabView
              activeIndex={activeTabIndex}
              onTabChange={(e) => setActiveTabIndex(e.index)}
            >
              <TabPanel header="Security">
                <Security
                  setData={setData}
                  data={data}
                  setActiveTabIndex={setActiveTabIndex}
                />
              </TabPanel>
              <TabPanel header=" General ">
                <GeneralAddEmployee
                  setData={setData}
                  data={data}
                  setActiveTabIndex={setActiveTabIndex}
                />
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
