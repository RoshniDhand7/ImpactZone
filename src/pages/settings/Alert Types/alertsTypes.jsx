import React from "react";
import DropDown from "../../../components/dropdown/dropdown";
import Buttons from "../../../components/buttons/button";
import TableData from "../../../components/cards/dataTable/dataTable";
import { useState } from "react";
import RecentCheckIn from "../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../utils/checkInData";
import PopUp from "../../../components/popup/popup";
import { PickList } from "primereact/picklist";
import CardWithTitle from "../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../components/input/input";
import { ColorPicker } from "primereact/colorpicker";

const AlertsTypes = () => {
  const [isActive, setIsActive] = useState(false);
  const [colorHEX, setColorHEX] = useState("00000");
  const [showAddAlert, setShowAddAlert] = useState(false);

  const onClickChangeDiv = () => {
    setShowAddAlert((prev) => !prev);
  };

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
  const [popUp, setPopUp] = useState({
    title: "",
    show: null,
  });
  const showPopUp = async (title, data) => {
    setPopUp({
      title: title,
      show: data,
    });
    setIsActive(true);
  };

  // POP UP display page
  const SortAlertTypes = () => {
    const itemTemplates = (item) => {
      return (
        <div className="flex flex-wrap p-2 align-items-center gap-3">
          <div className="flex-1 flex flex-column gap-2">
            <span className="font-bold">{item.name}</span>
            <div className="flex align-items-center gap-2"></div>
          </div>
        </div>
      );
    };
    return (
      <>
        <div>
          <div className="">
            <div className="picklistbutton card p-3 ">
              <PickList
                // source={reportDataSource}
                // target={reportDatatarget}
                // onChange={onReportChange}
                // itemTemplate={itemTemplate}
                breakpoint=""
                sourceHeader="Inactive"
                targetHeader="Active"
                sourceStyle={{ height: "20rem" }}
                targetStyle={{ height: "20rem" }}
              />
            </div>
          </div>
          <div className="flex justify-content-end mx-4">
            <div className=" p-2 mt-2 text-black-900">
              <Buttons className="btn-dark border-none" label="OK"></Buttons>
            </div>
            <div className="flex justify-content-end p-2 mt-2 text-black-900">
              <Buttons
                className="btn-grey border-none"
                label="Cancel"
              ></Buttons>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Add Alert Page
  const AddAlert = () => {
    return (
      <>
        <div className="p-2 m-3">
          <CardWithTitle title="Add Alert">
            <div className="p-3">
              <div className="flex">
                <div className="col">
                  <DropDown title="ABC Code "></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Text "></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Sound "></DropDown>
                </div>
              </div>
              <div
                className="flex my-3"
                onClick={(e) => {
                  document
                    .getElementById("pickcolor")
                    .getElementsByTagName("input")[0]
                    .click();
                }}
              >
                <div className="col flex flex-column gap-2">
                  <label
                    htmlFor=""
                    className="text-xs text-dark-gray flex justify-content-between  font-semibold"
                  >
                    Color
                  </label>
                  <div
                    className="border-1 border-grey-100 flex align-items-center pl-2 border-round"
                    style={{
                      border: "1px solid #D8DEE9",
                      background: "#fff",
                      height: "38px",
                    }}
                  >
                    <ColorPicker
                      id="pickcolor"
                      format="hex"
                      value={colorHEX}
                      onChange={(e) => setColorHEX(e.value)}
                    />
                    <div>
                      <span>{colorHEX ? "  #" + colorHEX : ""}</span>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <DropDown title="Level"></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Acknowledge"></DropDown>
                </div>
              </div>
              <div className="flex">
                <div className="col-4">
                  <DropDown title="Allow Door Access"></DropDown>
                </div>
              </div>
            </div>
          </CardWithTitle>
          <div>
          <div className="flex justify-content-end p-2 ">
          <div className=" mt-3 flex">
           
            <div className="mr-4">
              <Buttons
                label="Save"
                className="btn-dark mx-3 border-none"

              ></Buttons>
            </div>
            <div className=" ">
              <Buttons
                label="Cancel"
                className="btn-grey  border-none"
              ></Buttons>
            </div>
          </div>
        </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {showAddAlert ? (
        AddAlert()
      ) : (
        <div className="p-3 mx-3">
          <div>
            <div className="font-semibold text-xl mb-3">
              Manage Alerts Types
            </div>
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
                      onClick={() =>
                        showPopUp("Sort Alert Types", SortAlertTypes)
                      }
                    ></Buttons>
                  </div>
                  <div className="mx-3">
                    <Buttons
                      style={{ width: "118px", height: "37px" }}
                      icon="pi pi-plus-circle"
                      label="Add Alert"
                      className="border-none btn-dark"
                      onClick={onClickChangeDiv}
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
          <div className="flex justify-content-end p-2 mt-2 text-black-900">
            <Buttons
              className="btn-lightest-gray border-none text-900"
              label="Close"
            ></Buttons>
          </div>
        </div>
      )}

      <div className="mx-3 p-2">
        <RecentCheckIn data={checkInData}></RecentCheckIn>
      </div>
      <PopUp
        setIsActive={setIsActive}
        title={popUp.title}
        isActive={isActive}
        data={popUp.show ? popUp.show() : null}
      />
    </>
  );
};

export default AlertsTypes;
