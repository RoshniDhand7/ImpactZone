import React, { useState } from "react";
import Buttons from "../../../../components/buttons/button";
import DropDown from "../../../../components/dropdown/dropdown";
import Input from "../../../../components/input/input";
import TableData from "../../../../components/cards/dataTable/dataTable";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import EventSetup from "./EventSetups";

const EventSetups = () => {
  const [showEventSetups, setShowEventSetups] = useState(false);
  const ActionEditDelete = () => {
    return (
      <>
        <div className="flex justify-content-end">
          <span className="mx-2">
            <i className="pi pi-pencil"></i>
          </span>

          <span>
            <i className="pi pi-trash"></i>
          </span>
        </div>
      </>
    );
  };
  const SampleText = () => {
    return (
      <>
        <div className="flex ">
          <div className="border-1 border-300 font-grey-200 text-xs p-2 border-round ">
            Sample Text
          </div>
        </div>
      </>
    );
  };
  const eventdata = [
    {
      internaluse: "NO",
      category: "Appointment",
      name: "8 Week Transformation",

      locationtype: "None",
      mappedServices: "Yes",
    },
    {
      internaluse: "NO",
      category: "Appointment",
      name: "3D Week Transformation",

      locationtype: "Club",
      mappedServices: "Yes",
    },
    {
      internaluse: "NO",
      category: "Appointment",
      name: "8 Week Transformation",

      locationtype: "None",
      mappedServices: "Yes",
    },
    {
      internaluse: "NO",
      category: "Appointment",
      name: "8 Week Transformation",

      locationtype: "None",
      mappedServices: "Yes",
    },
  ];

  const Eventcolumn = [
    { field: "internaluse", header: "Internal Use" },
    { field: "category", header: "Category" },
    { field: "name", header: "Name" },
    { field: "colors", header: "Colors", body: SampleText },
    { field: "locationtype", header: "Location Type" },
    { field: "mappedServices", header: "Mapped To Services" },
    { field: "", header: "", body: ActionEditDelete },
  ];

  return (
    <>
      {showEventSetups ? (
        <EventSetup />
      ) : (
        <>
          <div>
            <div className="bg-lightest-blue border-round-lg px-3 py-2 flex justify-content-between align-items-center ">
              <div className=" flex align-items-center">
                <div className="col-4 ">
                  <DropDown title="Status"></DropDown>
                </div>
                <div className="col-4 ">
                  <DropDown title="Type"></DropDown>
                </div>
                <div className="col-4 ">
                  <Input title="Name"></Input>
                </div>
                <div className="">
                  <Buttons
                    label="Search"
                    className="btn-dark border-none"
                    style={{ height: "36px", top: "10px" }}
                  ></Buttons>
                </div>
              </div>
              <div className="mr-2">
                <div className="mr-4">
                  <Buttons
                    onClick={setShowEventSetups}
                    label="Add"
                    className="btn-dark mx-4 border-none  "
                    style={{ height: "36px", top: "10px" }}
                  ></Buttons>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <TableData data={eventdata} columns={Eventcolumn}></TableData>
            </div>
          </div>
          <div className=" m-2 mt-3 flex justify-content-end">
            <div className="">
              <Buttons
                label="Scheduling Options"
                className="btn-dark   border-none"
              ></Buttons>
            </div>
          </div>
        </>
      )}
      <div className="mt-5">
        <RecentCheckIn data={checkInData}></RecentCheckIn>
      </div>
    </>
  );
};

export default EventSetups;
