import React from "react";
import DropDown from "../../../../components/dropdown/dropdown";
import Buttons from "../../../../components/buttons/button";
import { useState } from "react";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import AddDeparment from "./addDeparment";
import Navbar from "../../../../layout/Navbar";
import TableData from "../../../../components/cards/dataTable/dataTable";

const Department = () => {
  const [addDepartment, setAddDeparment] = useState(false);

  const showAddDeparment = () => {
    setAddDeparment(true);
  };
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

  const deparmentList = () => {
    return (
      <div className="p-3">
        <Navbar />
        <div className=" mt-2 bg-lightest-blue border-round-lg p-2 flex justify-content-between">
          <div className="col-3 ">
            <DropDown title="Status"></DropDown>
          </div>
          <div className=" px-3 flex justify-content-center align-items-center ">
            <Buttons
              onClick={showAddDeparment}
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
            {/* <DataTable
              value={departmentData}
              selection={selectedPos}
              onSelectionChange={(e) => setSelectedPos(e.value)}
              dataKey="id"
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column
                selectionMode="multiple"
                headerStyle={{ width: "3rem" }}
              ></Column>
              <Column field="name" header="Name"></Column>
              <Column field="Showincalendar" header="Show in Calendar"></Column>
              <Column field="visibleonline" header="Visible Online"></Column>
              <Column
                field="salespersononline"
                header="Sales Person Online"
              ></Column>
            </DataTable> */}
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
      {addDepartment ? <AddDeparment /> : deparmentList()}
      <div className="mt-3">
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};

export default Department;
