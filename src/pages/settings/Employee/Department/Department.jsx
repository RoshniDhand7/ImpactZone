import React from "react";
import DropDown from "../../../../components/dropdown/dropdown";
import Buttons from "../../../../components/buttons/button";
import { useState } from "react";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import Navbar from "../../../../layout/Navbar";
import BlackArrow from "../../../../assets/icons/blackarrow.png";
import TableData from "../../../../components/cards/dataTable/dataTable";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../components/input/input";
import { Link } from "react-router-dom";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";

const Department = () => {
  const op = useRef(null);
  const [addDepartment, setAddDeparment] = useState(false);
  const [showDepartmentTable, setShowDepartmentTable] = useState(false);

  const actionTemplate = (col) => {
    return (
      <>
        <div className="flex justify-content-end">
          <span>
            <i className="pi pi-pencil mr-3 "></i>
          </span>
          <span>
            <i className="pi pi-trash"></i>
          </span>
        </div>
      </>
    );
  };

  const department = [
    { field: "name", header: "Name", id: "", index: "" },
    { field: "Showincalendar", header: "Show in Calendar", id: "", index: "" },
    { field: "visibleonline", header: "Visible Online", id: "", index: "" },
    {
      field: "salespersononline",
      header: "Sales Person Online",
      id: "",
      index: "",
    },
    { field: "", header: "", body: actionTemplate, id: "", index: "" },
  ];

  const [departmentData, setManagaEmplyoee] = useState([
    {
      name: "Front Desk",
      Showincalendar: "",
      visibleonline: "",
      salespersononline: "",
    },
    {
      name: "Instructors",
      Showincalendar: "Yes",
      visibleonline: "Yes",
      salespersononline: "",
    },
    {
      name: "Maintenance",
      Showincalendar: "",
      visibleonline: "",
      salespersononline: "",
    },
    {
      name: "Management",
      Showincalendar: "",
      visibleonline: "",
      salespersononline: "",
    },
    {
      name: "Sales",
      Showincalendar: "Yes",
      visibleonline: "Yes",
      salespersononline: "",
    },
  ]);

  const showcomponent = () => {
    setAddDeparment((prev) => !prev);
  };
  // const dispatch = useDispatch();
  const levelEmployeecolumn = [
    { field: "", header: "" },
    { field: "name", header: "Name", sorting: true },
    { field: "department", header: "Department" },
    { field: "barcode", header: "Barcode" },
    { field: "addresscity", header: "Address/City/State/Zip" },
    { field: "primaryphone", header: "Primary Phone" },
    { field: "hiredate", header: "Hire Date" },
    { field: "terminationdate", header: "Termination Date" },
  ];

  const levelEmployeeTable = [
    {
      name: "ABC Employee",
      department: "-",
      barcode: "abcemployee",
      address: "-",
      primaryphone: "(551) 206-4043",
      hiredate: "March-12- 2023",
      terminationdate: "",
      sendEmail: "true",
    },
    {
      name: "Aga Klecha",
      department: "Trainers",
      barcode: "abcemployee",
      address: "aklecha30591",
      primaryphone: "(551) 206-4043",
      hiredate: "March-12- 2023",
      terminationdate: "",
      sendEmail: "true",
    },
    {
      name: "ABC Employee",
      department: "-",
      barcode: "abcemployee",
      address: "-",
      primaryphone: "(551) 206-4043",
      hiredate: "March-12- 2023",
      terminationdate: "",
      sendEmail: "true",
    },
  ];

  const addDepartmentTable = () => {
    return (
      <>
        <div className="p-3">
          <Navbar />
          <div className="bg-lightest-blue border-round-md p-2 mt-3 flex justify-content-between mb-3">
            <div className="flex p-2 justify-content-between">
              <div
                style={{ width: "297px", height: "40px" }}
                onClick={(e) => op.current.toggle(e)}
                className=" bg-white p-2  cursor-pointer border-round flex justify-content-between align-items-center "
              >
                <div className=" text-sm text-900 ">Filter</div>
                <div className="ml-3">
                  <img
                    style={{ width: "8px", height: "7.25px" }}
                    src={BlackArrow}
                    alt=""
                  />
                </div>
                <OverlayPanel ref={op} dismissable={false}>
                  <div className="flex ">
                    <div className="col-6">
                      <div className=" ">
                        <DropDown
                          title="Training Level"
                          placeholder="All"
                        ></DropDown>
                      </div>
                      <div className="my-2">
                        <DropDown title="Email Address"></DropDown>
                      </div>
                      <div className="">
                        <DropDown title="Status"></DropDown>
                      </div>
                      <div className="mt-2">
                        <DropDown title="Club"></DropDown>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className=" ">
                        <DropDown title="Department"></DropDown>
                      </div>
                      <div className="my-2">
                        <DropDown title="Commission Level"></DropDown>
                      </div>
                      <div className="">
                        <DropDown title="Visible Online:"></DropDown>
                      </div>
                      <div className="mt-2">
                        <Input type="date" title="Hire Date Range"></Input>
                      </div>
                    </div>
                  </div>
                  <div className=" flex justify-content-end border-none px-3 ">
                    <div className="border-none pt-2 ">
                      <Buttons
                        label="Apply"
                        className="btn-dark border-none"
                        style={{}}
                      ></Buttons>
                    </div>
                  </div>
                </OverlayPanel>
              </div>
            </div>
            <div className=" flex justify-content-center align-items-center ">
              <div className=" px-3">
                <Input icon="pi pi-search" placeholder="Search"></Input>
              </div>
            </div>
          </div>
          <div>
            <div>
              <TableData
                selectionMode
                data={levelEmployeeTable}
                columns={levelEmployeecolumn}
              ></TableData>
            </div>
          </div>

          <div className="flex justify-content-end mt-3 p-2 ">
            <div className=" mx-3">
              <Buttons className="btn-dark border-none" label="Save"></Buttons>
            </div>
            <Buttons
              onClick={() => setShowDepartmentTable(false)}
              className="btn-grey border-none"
              label="Cancel"
            ></Buttons>
          </div>
        </div>
      </>
    );
  };

  const AddDeparment = () => {
    return (
      <>
        <div className="p-3">
          <Navbar />
          <div>
            <p className="my-3 font-semibold text-xl ">Add Departments</p>
          </div>
          <div className="mt-2">
            <CardWithTitle title="General">
              <div className="p-2 flex">
                <div className="col">
                  <Input title="Name" placeholder=""></Input>
                </div>
                <div className="col">
                  <DropDown
                    title="Show in Calendar"
                    placeholder="No"
                  ></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Visible Online" placeholder="No"></DropDown>
                </div>
              </div>
              <div className="col-12 flex">
                <div className="col-4">
                  <DropDown
                    title="Sales Person Online"
                    placeholder="No"
                  ></DropDown>
                </div>
                <div className="col-4">
                  <Input title="Department Code" placeholder=""></Input>
                </div>
              </div>
            </CardWithTitle>
          </div>
          <div className="mt-3">
            <CardWithTitle title="Add Employee">
              <div className=" p-4 btn-lightest-blue">
                <div className="ml-4 mb-2">
                  <span className="text-xs font-semibold  text-dark-gray">
                    Name
                  </span>
                </div>

                <div className="bg-white col-12 border-round-md ">
                  <div
                    className="flex justify-content-between align-items-center "
                    style={{ height: "190px" }}
                  >
                    <div className="">
                      <span className=""></span>
                    </div>
                    <div className="flex align-content-center justify-content-center">
                      <div className="text-xs font-semibold">None Found</div>
                    </div>
                    <div className=" flex flex-column  justify-content-between mx-3 ">
                      <div className=" ">
                        <Buttons
                          onClick={setShowDepartmentTable}
                          label="Add"
                          className="btn-dark border-none  "
                        ></Buttons>
                      </div>

                      <div className="mt-3">
                        <Buttons
                          label="Remove All"
                          className="btn-dark border-none "
                        ></Buttons>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardWithTitle>
          </div>
          <div className=" mt-3 px-3 pt-3 flex justify-content-end">
            <div className="  ">
              <Buttons
                label="Save"
                className="btn-dark mx-4  border-none"
              ></Buttons>
            </div>
            <div className=" ml-4">
              <Buttons
                onClick={showcomponent}
                label="Cancel"
                className="btn-grey  mx-3 border-none"
              ></Buttons>
            </div>
          </div>
        </div>
      </>
    );
  };

  const departmentList = () => {
    return (
      <div className="p-3">
        <Navbar />
        <div className=" mt-2 bg-lightest-blue border-round-lg p-2 flex justify-content-between">
          <div className="col-3 ">
            <DropDown title="Status"></DropDown>
          </div>
          <div className=" px-3 flex justify-content-center align-items-center ">
            <Buttons
              onClick={showcomponent}
              label="Add Deparment"
              icon="pi pi-plus-circle "
              className=" btn-custom border-none btn-dark"
            >
              <i className="pi pi-plus-circle" /> Add Deparment
            </Buttons>
          </div>
        </div>
        <div>
          <div className="mt-3 ">
            <TableData
              columns={department}
              data={departmentData}
              // delRow={tableRowRemove}
            />
          </div>
        </div>
        <div className=" mt-3 flex justify-content-end">
          <div className="col-1">
            <Buttons label="Save" className="btn-dark  border-none"></Buttons>
          </div>
          <div className="col-1">
            <Buttons label="Cancel" className="btn-grey  border-none"></Buttons>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {showDepartmentTable
        ? addDepartmentTable()
        : addDepartment
        ? AddDeparment()
        : departmentList()}
      <div className=" p-3 mt-3">
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};

export default Department;
