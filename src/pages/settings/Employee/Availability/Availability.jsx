import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import DropDown from "../../../../components/dropdown/dropdown";
import { Calendar } from "primereact/calendar";
import Buttons from "../../../../components/buttons/button";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import timeGridPlugin from "@fullcalendar/timegrid";
import FullCalendar from "@fullcalendar/react";

const Availability = () => {
  const [dates, setDates] = useState(null);

  return (
    <>
      <div>
        <div className=" bg-lightest-blue border-round-md p-2">
          <div className="col flex justify-content-between">
            <div className="">
              <div className=" mt-2 flex flex-column gap-2">
                <label className="text-xs text-dark-gray   font-semibold">
                  Employee Search
                </label>
                <span className="p-input-icon-right">
                  <i className="pi pi-search" />
                  <InputText placeholder="Search" />
                </span>
              </div>
            </div>
            <div className="col-4">
              <DropDown title="Club" placeholder="Club 30591"></DropDown>
            </div>
            <div className="col-4">
              <DropDown title="Track Avalibility" placeholder="Yes"></DropDown>
            </div>
          </div>
          <div className=" col-12 flex justify-content-between">
            {/* <span className="p-input-icon-right">
              <i className="pi pi-search" />
              <InputText placeholder="Search" />
            </span> */}
            <div className=" m-2 flex flex-column gap-2">
              <label className="text-xs text-dark-gray   font-semibold">
                Date
              </label>
              {/* <span className="p-input-icon-left">
        <i className="pi pi-search" /> */}
              <Calendar
                value={dates}
                onChange={(e) => setDates(e.value)}
                selectionMode="range"
                readOnlyInput
              />
              {/* </span> */}
            </div>

            <div className="col-4">
              <DropDown title="Duration:" placeholder="15minutes"></DropDown>
            </div>
            <div className="col-4">
              <DropDown
                title="Avalibility"
                placeholder="Avalibility"
              ></DropDown>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <div className=" bg-lightest-blue border-round-md p-2">
          <div>
            <FullCalendar
              plugins={[timeGridPlugin]}
              initialView="timeGridFourDay"
              views={{
                timeGridFourDay: {
                  type: "timeGrid",
                  duration: { days: 4 },
                },
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-3 flex justify-content-end col-12">
        <div className="flex   ">
          <div>
            {" "}
            <Buttons
              label="Clear Week"
              className="btn-dark p-3 border-none"
            ></Buttons>
          </div>
          <div className="mx-2 ">
            <Buttons
              label="Copy Week"
              className="btn-dark p-3 border-none"
            ></Buttons>
          </div>
          <div>
            <Buttons
              label="Save"
              className="btn-dark border-none p-3"
            ></Buttons>
          </div>
          <div className="ml-2">
            <Buttons
              label="Cancel"
              className="btn-grey ml-2 p-3  border-none"
            ></Buttons>
          </div>
        </div>
      </div>

      <div>
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};
export default Availability;
