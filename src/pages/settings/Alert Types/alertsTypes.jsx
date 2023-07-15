import React from "react";
import DropDown from "../../../components/dropdown/dropdown";
import Buttons from "../../../components/buttons/button";
import TableData from "../../../components/cards/dataTable/dataTable";
import { useState } from "react";
import RecentCheckIn from "../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../utils/checkInData";

const AlertsTypes = () => {
  const actionTemplate = (col) => {
    // console.log(col._id, "collllll");
    return (
      <>
        <div className="flex justify-content-end">
          <span>
            <i className="pi pi-pencil mr-3 cursor-pointer"></i>
          </span>
          {/* <span onClick={() => }> */}
          <span
          // onClick={() => {
          //   setVisible(true);
          //   setDeleteRow({ ...deleteRow, id: col._id });
          // }}
          >
            <i className="pi pi-trash cursor-pointer"></i>
          </span>
        </div>
      </>
    );
  };
  const alertsTableColumn = [
    {
      field: "text",
      header: "Text",
    },
    {
      field: "abccode",
      header: "ABC Code",
    },
    {
      field: "acknowledge",
      header: "Acknowledge",
    },
    {
      field: "level",
      header: "Level",
    },
    {
      field: "agreement",
      header: "Agreement",
    },
    {
      field: "time",
      header: "Time",
    },
    {
      field: "",
      header: "",
      body: actionTemplate,
    },
  ];
  const [alertsTableData, setAlertsTableData] = useState([
    {
      text: "alertsTableColumn",
      abccode: "Return For Collection",
      acknowledge: "Yes",
      level: "Excludes Optional",
      agreement: "Yes",
      time: "",
    },
    {
      text: "alertsTableColumn",
      abccode: "Return For Collection",
      acknowledge: "Yes",
      level: "Excludes Optional",
      agreement: "Yes",
      time: "",
    },
    {
      text: "alertsTableColumn",
      abccode: "Return For Collection",
      acknowledge: "Yes",
      level: "Excludes Optional",
      agreement: "Yes",
      time: "",
    },
    {
      text: "alertsTableColumn",
      abccode: "Return For Collection",
      acknowledge: "Yes",
      level: "Excludes Optional",
      agreement: "Yes",
      time: "",
    },
    {
      text: "alertsTableColumn",
      abccode: "Return For Collection",
      acknowledge: "Yes",
      level: "Excludes Optional",
      agreement: "Yes",
      time: "",
    },
  ]);

  return (
    <>
      <div className="p-3 mx-3">
        <div>
          <div className="font-semibold text-xl mb-3">Manage Alerts Types</div>
          <div className="bg-lightest-blue border-round-lg p-2 ">
            <div className="flex justify-content-between ">
              <div className="flex justify-content-between align-items-center ">
                <div className="col-7">
                  <DropDown title="Status"></DropDown>
                </div>
                <div className="col-7">
                  <DropDown title="Club"></DropDown>
                </div>
                <div className=" pt-3 mt-2">
                  <Buttons
                    style={{ width: "118px", height: "37px" }}
                    label="Search"
                    className="border-none btn-dark"
                  ></Buttons>
                </div>
              </div>
              <div className="flex mt-5 ">
                <div>
                  <Buttons
                    style={{ width: "118px", height: "37px" }}
                    label="Sort"
                    className="border-none btn-dark"
                  ></Buttons>
                </div>
                <div className="mx-3">
                  <Buttons
                    style={{ width: "118px", height: "37px" }}
                    icon="pi pi-plus-circle"
                    label="Add Alert"
                    className="border-none btn-dark"
                  ></Buttons>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <TableData
            className=""
            columns={alertsTableColumn}
            data={alertsTableData}
          ></TableData>
        </div>
        <div className="flex justify-content-end p-2 mt-2">
          <Buttons
            className="btn-lightest-gray border-none "
            label="Close"
          ></Buttons>
        </div>
      </div>
      <div className="mx-3 p-2">
        <RecentCheckIn data={checkInData}></RecentCheckIn>
      </div>
    </>
  );
};

export default AlertsTypes;
