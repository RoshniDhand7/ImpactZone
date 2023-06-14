import React from "react";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import DropDown from "../../../../components/dropdown/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";
import Buttons from "../../../../components/buttons/button";

const EventNotifications = () => {
  const [value, setValue] = useState("");
  return (
    <>
      <div>
        <p className="text-xl font-semibold my-3 text-900">Add Event Setups</p>
        <div className="">
          <CardWithTitle title="Event Reminders">
            <div className="p-3">
              <div className="flex">
                <div className="col-3">
                  <DropDown title="Sent Event Notifications"></DropDown>
                </div>
                <div className="col-3">
                  <DropDown title="Time before event to send text"></DropDown>
                </div>
              </div>
              <div className="col">
                <div className=" flex flex-column gap-2 ">
                  <label
                    HtmlFor=""
                    className="text-xs text-dark-gray   font-semibold "
                  >
                    Message (100/100)
                  </label>

                  <InputTextarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    style={{ width: "100%", height: "155px" }}
                  />
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Cancellation">
            <div className="p-3">
              <div className="col-3">
                <DropDown title="Send cancel link with text"></DropDown>
              </div>
            </div>
          </CardWithTitle>
        </div>
      </div>
      <div className=" m-2 mt-3 flex justify-content-end">
        <div className="mx-3">
          <Buttons
            label="Scheduling Options"
            className="btn-dark   border-none"
          ></Buttons>
        </div>
      </div>
    </>
  );
};

export default EventNotifications;
