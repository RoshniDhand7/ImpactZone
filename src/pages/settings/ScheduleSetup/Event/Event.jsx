import React, { useState } from "react";
import Buttons from "../../../../components/buttons/button";
import DropDown from "../../../../components/dropdown/dropdown";
import Input from "../../../../components/input/input";
import TableData from "../../../../components/cards/dataTable/dataTable";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import EventSetup from "./EventSetups";
import EventContainer from "./EventContainer";

const EventSetups = () => {
  const {EventData,Eventcolumn,addEventData,handleChange,serviceSelectHandle,setLevelIndex,serviceHandleChange,serviceAddRow,selectedRow,isActiveHandle,submit,setIndexFunc,
    serviceIndex,
    serviceDetailIndex,deployhandle,clubSource,DeleteService,changePosition} = EventContainer()
  const [showEventSetups, setShowEventSetups] = useState(false);
 
  // const eventdata = [
  //   {
  //     internaluse: "NO",
  //     category: "Appointment",
  //     name: "8 Week Transformation",

  //     locationtype: "None",
  //     mappedServices: "Yes",
  //   },
  //   {
  //     internaluse: "NO",
  //     category: "Appointment",
  //     name: "3D Week Transformation",

  //     locationtype: "Club",
  //     mappedServices: "Yes",
  //   },
  //   {
  //     internaluse: "NO",
  //     category: "Appointment",
  //     name: "8 Week Transformation",

  //     locationtype: "None",
  //     mappedServices: "Yes",
  //   },
  //   {
  //     internaluse: "NO",
  //     category: "Appointment",
  //     name: "8 Week Transformation",

  //     locationtype: "None",
  //     mappedServices: "Yes",
  //   },
  // ];

  // const Eventcolumn = [
  //   { field: "internaluse", header: "Internal Use" },
  //   { field: "category", header: "Category" },
  //   { field: "name", header: "Name" },
  //   { field: "colors", header: "Colors", body: SampleText },
  //   { field: "locationtype", header: "Location Type" },
  //   { field: "mappedServices", header: "Mapped To Services" },
  //   { field: "", header: "", body: ActionEditDelete },
  // ];

  return (
    <>
      {showEventSetups ? (
        <EventSetup addEventData={addEventData} handleChange={handleChange} serviceSelectHandle={serviceSelectHandle} setLevelIndex={setLevelIndex} serviceHandleChange={serviceHandleChange} serviceAddRow={serviceAddRow} selectedRow={selectedRow} isActiveHandle={isActiveHandle} submit={submit}  setIndexFunc={setIndexFunc} serviceIndex={serviceIndex} serviceDetailIndex={serviceDetailIndex} deployhandle={deployhandle} clubSource={clubSource} DeleteService={DeleteService} changePosition={changePosition}/>
      ) : (
        <>
          <div>
            <div className="bg-lightest-blue border-round-lg px-3 py-2 flex justify-content-between align-items-center ">
              <div className=" flex align-items-center">
                <div className="col-6 ">
                  <DropDown title="Status"></DropDown>
                </div>
                <div className="col-6 ">
                  <DropDown title="Type"></DropDown>
                </div>
                <div className="col-6 ">
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
              <TableData data={EventData} columns={Eventcolumn}></TableData>
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
