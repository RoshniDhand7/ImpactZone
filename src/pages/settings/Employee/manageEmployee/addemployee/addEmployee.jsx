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
import constants from "../../../../../utils/constants";
import { showToast } from "../../../../../redux/actions/toastAction";
import validation from "../../../../../utils/Validation";
import api from "../../../../../services/api";

const AddEmployee = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { securityValidations } = validation();
  const [errors, setErrors] = useState({});

  const [data, setData] = useState({
    isActive: true,
    firstName: "",
    lastName: "",
    middleInitial: "",
    title: "",
    dob: "",
    socialSecurity: "",
    email: "",
    barCode: "",
    accessCode: "",
    multiClubClockIn: "",
    hireDate: "",
    adpId: "",
    primaryPhone: "",
    workPhone: "",
    workPhoneExt: "",
    mobilePhone: "",
    faxPhone: "",
    emergencyPhone: "",
    emergencyPhoneExt: "",
    street: "",
    city: "",
    state: "punjab",
    zipCode: "",
    emailNotification: "true",
    userName: "",
    notes: "",
  });
  // const createEmployee = async () => {
  //   let validate = await securityValidations(data);
  //   if (
  //     validate.firstName ||
  //     validate.lastName ||
  //     validate.barCode ||
  //     validate.email
  //   ) {
  //     setErrors(validate);
  //   } else {
  //     const res = await api("post", constants.endPoints.CreateEmployee, data);
  //     console.log(res, "resss");
  //     if (res.success) {
  //       // setActiveTabIndex(1);
  //       dispatchEvent(showToast({ severity: "success", summary: res.message }));
  //     } else {
  //       console.log(validate, "vvvvvvvv");
  //     }
  //   }
  // };
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
              onTabChange={(e) => {
                setActiveTabIndex(e.index);
                // createEmployee();
              }}
            >
              <TabPanel header="Security">
                <Security
                  setData={setData}
                  data={data}
                  setActiveTabIndex={setActiveTabIndex}
                />
              </TabPanel>
              <TabPanel header=" General  ">
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
