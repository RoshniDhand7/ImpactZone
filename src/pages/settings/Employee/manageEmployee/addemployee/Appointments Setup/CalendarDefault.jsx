import React from "react";
import Buttons from "../../../../../../components/buttons/button";
import DropDown from "../../../../../../components/dropdown/dropdown";
import RecentCheckIn from "../../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../../utils/checkInData";
import TableData from "../../../../../../components/cards/dataTable/dataTable";
import { useState } from "react";
import MuliSelectDropDown from "../../../../../../components/dropdown/muliSelectDropDown";

const CalendarDefault = ({ setData, data, createEmployee }) => {
  const [selectedEvents, setSelectedEvents] = useState(null);
  const calendarEvents = [
    {
      id: 1,
      event: "Cardio",
      orderNumber: null,
      eventType: "30 min Private",
    },
    {
      id: 2,
      event: "Yoga",
      orderNumber: null,
      eventType: "60 min Private",
    },
    {
      id: 3,
      event: "Bhangra",
      orderNumber: null,
      eventType: "60 min Public",
    },
  ];
  const actionTemplate = (col) => {
    return (
      <>
        <div className="flex justify-content-end" onClick={() => removeRow(col)}>
          <span>
            <i className="pi pi-minus-circle mr-3"></i>
          </span>
        </div>
      </>
    );
  };

  const removeRow = (item) => {
    const index = selectedEvents.indexOf(item);
    selectedEvents.splice(index, 1); // 2nd parameter means remove one item only
    setSelectedEvents([...selectedEvents]);
  }

  const eventsHeaders = [
    { field: "event", header: "Event"},
    { field: "eventType", header: "Event Type"},

    { field: "", header: "", body: actionTemplate},
  ];

  return (
    <>
      <div>
        <div className="">
          <div className="col-3 p-0 flex">
          <div className=" col flex">
              <DropDown
                title="Similar To"
                placeholder="Select Employee"
              ></DropDown>
            </div>
          </div>
          <div className="col-3 p-0 flex mb-3">
          <div className="col flex">
            <div className="mt-4">
              <MuliSelectDropDown
                title="Events"
                options={calendarEvents}
                optionsLabel="event"
                onChange={(e) => {
                  setSelectedEvents(e.value);
                }}
                key={"id"}
                placeholder="Select Events"
                value={selectedEvents}
              ></MuliSelectDropDown>
              </div>
            </div>
            </div>
          <div className=" mt-2">
            <TableData
              columns={eventsHeaders}
              data={selectedEvents}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-content-end p-2 ">
        <div className=" mt-3 flex  ">
          <div className=" mx-4">
            <Buttons
              label="Save"
              className="btn-dark mx-3 border-none"
              onClick={() => {
                const selectedEventsClone = JSON.parse(JSON.stringify(selectedEvents));
                setData(() => {
                  return {
                    ...data,
                    appointmentCalendarDefault: selectedEventsClone.map((item, index) => {
                      item.orderNumber = index + 1;
                      delete item.id;
                      return item;
                    })
                  }
                });
                console.log(selectedEvents)
                return createEmployee();
              }}
            ></Buttons>
          </div>
          <div className=" ">
            <Buttons
              label="Cancel"
              className="btn-grey border-none"
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
