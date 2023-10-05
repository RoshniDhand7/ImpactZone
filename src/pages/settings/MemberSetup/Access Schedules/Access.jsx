import React from "react";
import DropDown from "../../../../components/dropdown/dropdown";
import timeGridPlugin from "@fullcalendar/timegrid";
import FullCalendar from "@fullcalendar/react";
import { useState } from "react";
import Buttons from "../../../../components/buttons/button";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import AccessCalendar from "./AccessCalendar";

const Access = () => {
  const [date, setDate] = useState(null);
  return (
    <div>
      <div className="bg-lightest-blue border-round-md p-2 flex justify-content-between ">
        <div className="col-4">
          <DropDown title="Durations"></DropDown>
        </div>
        <div className="col-8">
          <div className=" p-2 mt-4 bg-lightest-blue border-round-md shadow-3">
            <span>
              <i
                className="pi pi-info-circle  mx-3"
                style={{ color: " rgba(50, 155, 234, 1)" }}
              ></i>
            </span>
            <span
              className="mx-3  "
              style={{ color: " rgba(50, 155, 234, 1)" }}
            >
              Click a cell to toggle hours from on/off.
            </span>
          </div>
        </div>
      </div>
      <div>
        <div className=" bg-lightest-blue border-round-md mt-3 p-2">
          <AccessCalendar></AccessCalendar>
        </div>
      </div>
      <div className=" m-2 mt-3 flex justify-content-end">
        <div className="mx-3">
          <Buttons
            label="All Access"
            className="btn-dark border-none"
          ></Buttons>
        </div>
        <div className="">
          <Buttons label="No Access" className="btn-dark border-none"></Buttons>
        </div>
        <div className="mx-3">
          <Buttons label="Save" className="btn-dark border-none"></Buttons>
        </div>
        <div className="">
          <Buttons label="Cancel" className="btn-grey border-none"></Buttons>
        </div>
      </div>
      <div className="mt-4">
        <RecentCheckIn data={checkInData} />
      </div>
    </div>
  );
};

export default Access;
