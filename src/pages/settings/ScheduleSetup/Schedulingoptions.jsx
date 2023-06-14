import React from "react";
import CardWithTitle from "../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../components/input/input";
import Buttons from "../../../components/buttons/button";
import checkInData from "../../../utils/checkInData";
import RecentCheckIn from "../../../components/cards/Profilecard/recentCheckIn";
import DropDown from "../../../components/dropdown/dropdown";

const SchedulingOptions = () => {
  return (
    <>
      <div
        className="
    p-3"
      >
        <CardWithTitle title="Scheduling Options">
          <div className="p-3">
            <div className="">
              <p className="text-base font-semibold text-dark-gray my-3 ml-2">
                Hours of Operation
              </p>
              <div className="flex">
                <div className="col-2">
                  <Input
                    title="Start Time"
                    type="time"
                    placeholder="Select"
                  ></Input>
                </div>
                <div className="col-2">
                  <Input
                    title="End Time"
                    type="time"
                    placeholder="Select"
                  ></Input>
                </div>
              </div>
            </div>
            <p className="text-base font-semibold text-dark-gray my-3 ml-2">
              Start Calendar With
            </p>
            <div className="flex justify-content-between w-7">
              <div className="">
                <Buttons
                  label="Sunday"
                  className="bg-white border-100 text-dark-gray "
                  style={{ color: "grey", height: "38px" }}
                ></Buttons>
              </div>
              <div className="">
                <Buttons
                  label="Monday"
                  className="bg-white border-100 text-dark-gray "
                  style={{ color: "grey", height: "38px" }}
                ></Buttons>
              </div>
              <div className="">
                <Buttons
                  label="Tuesday"
                  className="bg-white border-100 text-dark-gray "
                  style={{ color: "grey", height: "38px" }}
                ></Buttons>
              </div>
              <div className="">
                <Buttons
                  label="Wednesday"
                  className="bg-white border-100 text-dark-gray "
                  style={{ color: "grey", height: "38px" }}
                ></Buttons>
              </div>
              <div className="">
                <Buttons
                  label="Thursday"
                  className="bg-white border-100 text-dark-gray "
                  style={{ color: "grey", height: "38px" }}
                ></Buttons>
              </div>
              <div className="">
                <Buttons
                  label="Friday"
                  className="bg-white border-100 text-dark-gray "
                  style={{ color: "grey", height: "38px" }}
                ></Buttons>
              </div>
              <div className="">
                <Buttons
                  label="Saturday"
                  className="bg-white border-100 text-dark-gray "
                  style={{ color: "grey", height: "38px" }}
                ></Buttons>
              </div>
              <div className="">
                <Buttons
                  label="Today"
                  className="bg-white border-100 text-dark-gray "
                  style={{ color: "grey", height: "38px" }}
                ></Buttons>
              </div>
            </div>
          </div>
          <div className="flex px-4 pb-4 ">
            <div className=" col-3">
              <DropDown
                title="Allow Waitlist"
                placeholder="Allow Waitlist"
              ></DropDown>
            </div>
            <div className="mx-3 col-3">
              <DropDown
                title="Require Comment (Cancel - No Charge)"
                placeholder="Require Comment"
              ></DropDown>
            </div>
          </div>
        </CardWithTitle>
      </div>
      <div className="mt-5 p-3">
        <RecentCheckIn data={checkInData}></RecentCheckIn>
      </div>
    </>
  );
};

export default SchedulingOptions;
