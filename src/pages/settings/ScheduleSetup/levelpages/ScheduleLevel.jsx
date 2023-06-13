import React from "react";
import TableData from "../../../../components/cards/dataTable/dataTable";
import Buttons from "../../../../components/buttons/button";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import Checkbox from "../../../../components/checkbox/checkbox";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import { useState } from "react";
import Input from "../../../../components/input/input";
import { useRef } from "react";
import BlackArrow from "../../../../assets/icons/blackarrow.png";
import DropDown from "../../../../components/dropdown/dropdown";
// import { useDispatch } from "react-redux";
import { OverlayPanel } from "primereact/overlaypanel";

const ScheduleLevel = () => {
  const op = useRef(null);
  const [showLevelTable, setShowTable] = useState(false);
  const [showEmployeeTable, setShowEmployeeTable] = useState(false);

  const showcomponent = () => {
    setShowTable((prev) => !prev);
  };

  // const dispatch = useDispatch();
  const leveldata = [
    {
      name: "1",
      value: "1",
      active: "Yes",
    },
    {
      name: "1",
      value: "1",
      active: "Yes",
      AddLevel: "",
    },
    {
      name: "1",
      value: "1",
      active: "Yes",
      AddLevel: "",
    },
    {
      name: "1",
      value: "1",
      active: "Yes",
      AddLevel: "",
    },
  ];

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
  const levelcolumn = [
    { field: "name", header: "Name", id: "", index: "" },

    { field: "active", header: "Active", id: "", index: "" },
    { field: "", header: "", id: "", index: "" },
    { field: "", header: "", body: actionTemplate, id: "", index: "" },
  ];

  const ScheduleLevel = () => {
    return (
      <>
        <div className="" style={{ minHeight: "475px" }}>
          <div>
            <TableData columns={levelcolumn} data={leveldata} />
          </div>
          <div>
            <div className="flex justify-content-end p-2 ">
              <div className=" mt-3 flex  ">
                <div className="mx-3">
                  <Buttons
                    onClick={showcomponent}
                    label="Add Level"
                    className="btn-dark px-4  border-none"
                  ></Buttons>
                </div>

                <div className=" ">
                  <Buttons
                    label="Scheduling Options"
                    className="btn-dark  border-none"
                  ></Buttons>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const AddLevel = () => {
    return (
      <>
        <div style={{ minHeight: "455px" }}>
          <div>
            <span className="text-xl font-bold text-900 ">Add Level</span>
          </div>
          <div className="p-3 ">
            <Checkbox title="Active"></Checkbox>
          </div>
          <div>
            <CardWithTitle title="Personal">
              <div className="flex justify-content-between p-3">
                <div className=" flex">
                  <div className="col mr-3">
                    <Input title="Name"></Input>
                  </div>
                </div>
              </div>
            </CardWithTitle>
          </div>
          <div className="my-3">
            <CardWithTitle title="Add Employee">
              <div className=" p-4 btn-lightest-blue">
                <div className="ml-4 mb-2">
                  <span className="text-sm text-dark-gray font-semibold ">
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
                    <div className=" mx-3">
                      <div className="">
                        <Buttons
                          onClick={setShowEmployeeTable}
                          label="Add"
                          className="btn-dark border-none "
                        ></Buttons>
                      </div>
                      <div className="my-3">
                        <Buttons
                          label="Remove"
                          className="btn-dark border-none "
                        ></Buttons>
                      </div>

                      <div className="">
                        <Buttons
                          label="Remove All"
                          className="btn-dark border-none"
                        ></Buttons>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardWithTitle>
          </div>
          <div className="flex justify-content-end mt-3 p-2 ">
            <div className=" mx-3">
              <Buttons className="btn-dark border-none" label="Save"></Buttons>
            </div>
            <Buttons
              onClick={showcomponent}
              className="btn-grey border-none"
              label="Cancel"
            ></Buttons>
          </div>
        </div>
      </>
    );
  };
  const AddEmployeeTable = () => {
    return (
      <>
        <div className="bg-lightest-blue border-round-md p-2  flex justify-content-between mb-3">
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
            <Buttons className="btn-dark border-none" label="Add"></Buttons>
          </div>
          <Buttons
            onClick={() => setShowEmployeeTable(false)}
            className="btn-grey border-none"
            label="Cancel"
          ></Buttons>
        </div>
      </>
    );
  };

  const emailIconTemplate = (col) => {
    return col.sendEmail ? <i className="pi pi-envelope"></i> : null;
  };

  const levelEmployeecolumn = [
    { field: "", header: "" },
    { field: "", header: "", body: emailIconTemplate },
    { field: "name", header: "Name" },
    { field: "department", header: "Department" },
    { field: "barcode", header: "Barcode" },
    { field: "addresscity", header: "Address/City/State/Zip" },
    { field: "primaryphone", header: "Primary Phone" },
    { field: "hiredate", header: "Hire Date" },
    { field: "terminationdate", header: "Termination Date" },
    { field: "", header: "", body: actionTemplate },
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

  return (
    <>
      {showEmployeeTable
        ? AddEmployeeTable()
        : showLevelTable
        ? AddLevel()
        : ScheduleLevel()}

      <div className="p-2">
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};

export default ScheduleLevel;
