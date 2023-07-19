import React from "react";
import Buttons from "../../../../../../components/buttons/button";
import DropDown from "../../../../../../components/dropdown/dropdown";
import RecentCheckIn from "../../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../../utils/checkInData";
import TableData from "../../../../../../components/cards/dataTable/dataTable";
import { useState } from "react";

const CalendarDefault = ({ setData, data, createEmployee }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const CalendarEvent = [
    {
      name: "Single Client",
    },
    { name: "Service Value" },
  ];
  const actionTemplate = (col) => {
    return (
      <>
        <div className="flex justify-content-end">
          <span>
            <i className="pi pi-minus-circle mr-3"></i>
          </span>
        </div>
      </>
    );
  };

  const manageSecurity = [
    { field: "event", header: "Event", id: "", index: "" },
    { field: "eventType", header: "Event Type", id: "", index: "" },

    { field: "", header: "", body: actionTemplate, id: "", index: "" },
  ];

  const [manageSecurityData] = useState([
    {
      event: "3D Body Scan",
      eventType: "30 min Private",
      id: 1,
    },
    {
      event: "Aga Group 30 Min",
      eventType: "60 min Private",
      id: 2,
    },
    {
      event: "Aga Group 45 Min",
      eventType: "30 min Public",
      id: 3,
    },
  ]);
  return (
    <>
      <div>
        <div className="">
          <div className="col-3 p-0 flex mb-3">
            <div className=" col flex">
              <DropDown
                title="Event"
                options={CalendarEvent}
                optionLabel="name"
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.value)}
                placeholder="Selected Event"
              ></DropDown>
            </div>
            <div className=" col flex">
              <DropDown
                title="Similar To"
                placeholder="Select Event"
              ></DropDown>
            </div>
          </div>
          <div className=" mt-2">
            <TableData
              columns={manageSecurity}
              data={manageSecurityData}
              // delRow={tableRowRemove}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-content-end p-2 ">
        <div className=" mt-3 flex  ">
          <div className=" mx-4">
            <Buttons
              label="Save"
              className="btn-dark mx-3  border-none"
            ></Buttons>
          </div>
          <div className=" ">
            <Buttons
              label="Cancel"
              className="btn-grey    border-none"
            ></Buttons>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <RecentCheckIn data={checkInData}></RecentCheckIn>
      </div>
    </>
  );
};

export default CalendarDefault;
