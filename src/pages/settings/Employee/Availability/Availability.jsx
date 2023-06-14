import React, { useState } from "react";
import DropDown from "../../../../components/dropdown/dropdown";
import { Calendar } from "primereact/calendar";
import Buttons from "../../../../components/buttons/button";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import timeGridPlugin from "@fullcalendar/timegrid";
import FullCalendar from "@fullcalendar/react";
import Navbar from "../../../../layout/Navbar";
import Input from "../../../../components/input/input";

const Availability = () => {
  const [dates, setDates] = useState(null);

  return (
    <>
      <div className="p-3">
        <Navbar />
        <div className="mt-2 ">
          <div className=" bg-lightest-blue border-round-md p-4">
            <div className=" p-0 flex justify-content-between">
              <div className=" col-2 ">
                <div>
                  <Input
                    title="Employee Search"
                    type="search"
                    icon="pi pi-search"
                    placeholder="search"
                  ></Input>
                </div>
                <div>
                  <div className="flex mt-4  flex-column gap-2">
                    <label className="text-xs text-dark-gray   font-semibold">
                      Date
                    </label>
                    <Calendar
                      value={dates}
                      onChange={(e) => setDates(e.value)}
                      selectionMode="range"
                      readOnlyInput
                      icon="pi pi-calendar"
                      showIcon
                    />
                    {/* </span> */}
                  </div>
                </div>
              </div>

              <div className="col-4 ">
                <div>
                  <DropDown title="Club" placeholder="Club 30591"></DropDown>
                </div>
                <div className="mt-4">
                  <DropDown title="Duration" placeholder="15minutes"></DropDown>
                </div>
              </div>
              <div className="col-4">
                <div>
                  <DropDown
                    title="Track Avalibility"
                    placeholder="Yes"
                  ></DropDown>
                </div>
                <div className="mt-4">
                  <DropDown
                    title="Avalibility"
                    placeholder="Avalibility"
                  ></DropDown>
                </div>
              </div>
            </div>
            <div className=" p-0  col-12 flex justify-content-between">
              {/* <span className="p-input-icon-right">
              <i className="pi pi-search" />
              <InputText placeholder="Search" />
            </span> */}
            </div>
          </div>
        </div>
        <div className=" bg-lightest-blue border-round-md mt-3 p-2">
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

        <div className="mt-3 flex justify-content-end col-12">
          <div className="flex   ">
            <div>
              <Buttons
                label="Clear Week"
                className="btn-dark border-none"
              ></Buttons>
            </div>
            <div className="mx-2 ">
              <Buttons
                label="Copy Week"
                className="btn-dark border-none"
              ></Buttons>
            </div>
            <div>
              <Buttons label="Save" className="btn-dark border-none"></Buttons>
            </div>
            <div className="ml-2">
              <Buttons
                label="Cancel"
                className="btn-grey ml-2  border-none"
              ></Buttons>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 p-3">
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};
export default Availability;
