import React from "react";
import DropDown from "../../../../components/dropdown/dropdown";
import timeGridPlugin from "@fullcalendar/timegrid";
import FullCalendar from "@fullcalendar/react";
import { useState } from "react";
import Buttons from "../../../../components/buttons/button";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import AccessCalendar from "./AccessCalendar";
import AccessSchedulesContainer from "./AccessSchedulesContainer";

const Access = ({
  accessSchedulesForm,
  showcomponent,
  setAccessSchedulesForm,
  durations,
  duration,
  onDurationChange,
  onClickAllAccess,
  submit,
}) => {
  const durationOptionsTemplate = (dur) => {
    return <span> {dur} Minutes </span>;
  };

  return (
    <div>
      <div className="bg-lightest-blue border-round-md p-2 flex justify-content-between ">
        <div className="col-4">
          <DropDown
            title="Durations"
            options={durations}
            itemTemplate={durationOptionsTemplate}
            value={duration}
            onChange={onDurationChange}
          ></DropDown>
        </div>
      </div>
      <div>
        <div className=" bg-lightest-blue border-round-md mt-3 p-2">
          <AccessCalendar
            accessSchedulesForm={accessSchedulesForm}
            setAccessSchedulesForm={setAccessSchedulesForm}
            duration={duration}
          ></AccessCalendar>
        </div>
      </div>
      <div className=" m-2 mt-3 flex justify-content-end">
        <div className="mx-3">
          <Buttons
            label="All Access"
            className="btn-dark border-none"
            onClick={onClickAllAccess}
          ></Buttons>
        </div>
        <div className="">
          <Buttons
            label="No Access"
            className="btn-dark border-none"
            onClick={() =>
              setAccessSchedulesForm({
                ...accessSchedulesForm,
                schedule: [],
              })
            }
          ></Buttons>
        </div>
        <div className="mx-3">
          <Buttons
            label="Save"
            className="btn-dark border-none"
            onClick={() => submit()}
          ></Buttons>
        </div>
        <div className="">
          <Buttons
            label="Cancel"
            className="btn-grey border-none"
            onClick={showcomponent}
          ></Buttons>
        </div>
      </div>
      <div className="mt-4">
        <RecentCheckIn data={checkInData} />
      </div>
    </div>
  );
};

export default Access;
