import React from "react";
import Checkbox from "../../../../components/checkbox/checkbox";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../components/input/input";
import DropDown from "../../../../components/dropdown/dropdown";

const EventGeneral = () => {
  return (
    <>
      <div className="">
        <div className="my-3">
          <span className="text-xl font-bold text-900 ">Add Event Setups</span>
        </div>
        <div className=" font-semibold text-sm text-900 ">
          <Checkbox title="Active"></Checkbox>
        </div>
        <div className="mt-3">
          <CardWithTitle title="General">
            <div className="p-3">
              <div className="flex justify-content-between ">
                <div className="col">
                  <Input title="Name"></Input>
                </div>
                <div className="col">
                  <DropDown title="Event Type"></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Internal Use"></DropDown>
                </div>
              </div>
              <div className="flex justify-content-between ">
                <div className="col">
                  <DropDown title="Location Type"></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Default Max Attendees"></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Event Commission Type"></DropDown>
                </div>
              </div>
              <div className="flex justify-content-between ">
                <div className="col">
                  <DropDown title="Available Online"></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Track Attendees"></DropDown>
                </div>
                <div className="col">
                  <DropDown
                    title="Maximum Waitlist (Turned off at club level)"
                    disabled
                  ></DropDown>
                </div>
              </div>
              <div className="flex justify-content-between ">
                <div className="col">
                  <DropDown title="Waitlist Expiration (Turned off at club level)"></DropDown>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
      </div>
    </>
  );
};

export default EventGeneral;
