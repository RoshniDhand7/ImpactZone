import React, { useEffect } from "react";
import Buttons from "../../../../../../components/buttons/button";
import DropDown from "../../../../../../components/dropdown/dropdown";
import RecentCheckIn from "../../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../../utils/checkInData";
import TableData from "../../../../../../components/cards/dataTable/dataTable";
import { useState } from "react";
import MuliSelectDropDown from "../../../../../../components/dropdown/muliSelectDropDown";

const CalendarDefault = ({ setData, data, createEmployee }) => {
  const [selectedEvents, setSelectedEvents] = useState(null);
  const [isPayloadReady, setIsPayloadReady] = useState(false);

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



  const onSelectEvents = (value) => {
    console.log(value)
    value = value.map((item, index) => {
      item = {
        ...item,
        orderNumber: index
      }
      return item;
    })
    setSelectedEvents(value)

    setData(() => {
      return {
        ...data,
        appointmentCalendarDefault: value
      }
    });
  }

  useEffect(() => {
    if(data.appointmentCalendarDefault.length) {
      setSelectedEvents(data.appointmentCalendarDefault)
    }
  }, []);

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
            <div className="mt-4" style={{width: "174px"}}>
              <MuliSelectDropDown
                title="Events"
                options={calendarEvents}
                optionsLabel="event"
                onChange={(e) => {
                  onSelectEvents(e.value);
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
                createEmployee();
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
