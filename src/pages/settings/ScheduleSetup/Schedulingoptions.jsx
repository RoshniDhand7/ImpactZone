import React from "react";
import CardWithTitle from "../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../components/input/input";
import Buttons from "../../../components/buttons/button";

const SchedulingOptions = () => {
  return (
    <div
      className="
    p-3"
    >
      <CardWithTitle title="SchedulingOptions">
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
          <div className="">
            <Input title="Allow Waitlist" placeholder="Allow Waitlist"></Input>
          </div>
          <div className="mx-3">
            <Input
              title="Require Comment"
              placeholder="Require Comment"
            ></Input>
          </div>
        </div>
      </CardWithTitle>
    </div>
  );
};

export default SchedulingOptions;
