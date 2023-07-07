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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AddEmployee = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { securityValidations } = validation();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    isActive: true,
    firstName: "",
    lastName: "",
    middleInitial: "",
    title: null,
    dob: "",
    socialSecurity: "",
    email: "",
    barCode: "",
    accessCode: "",
    multiClubClockIn: null,
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
    state: "",
    zipCode: "",
    emailNotification: true,
    userName: "",
    notes: "",
    department: [],
  });
  const createEmployee = async () => {
    try {
      const res = await api("post", constants.endPoints.CreateEmployee, data);
      console.log(res, "resss");
      if (res.success) {
        dispatch(showToast({ severity: "success", summary: res.message }));
        navigate("/employee");
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="">
        <div className="p-3">
          <Navbar />
        </div>
        <div>
          <div className="  ml-5  ">
            <span className="font-bold text-xl">Add Employee</span>
          </div>
          <div className="p-3 mx-3">
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
                  createEmployee={createEmployee}
                />
              </TabPanel>
              <TabPanel header=" General  ">
                <GeneralAddEmployee
                  setData={setData}
                  data={data}
                  setActiveTabIndex={setActiveTabIndex}
                  createEmployee={createEmployee}
                />
              </TabPanel>
              <TabPanel header="Departments">
                <Department
                  setData={setData}
                  data={data}
                  createEmployee={createEmployee}
                />
              </TabPanel>
              <TabPanel header="Clubs">
                <Clubs
                  setData={setData}
                  data={data}
                  createEmployee={createEmployee}
                ></Clubs>
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
