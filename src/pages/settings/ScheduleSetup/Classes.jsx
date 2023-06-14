import React from "react";
import Input from "../../../components/input/input";
import CardWithTitle from "../../../components/cards/cardWithTitle/cardWithTitle";
import DropDown from "../../../components/dropdown/dropdown";
import Checkbox from "../../../components/checkbox/checkbox";
import Buttons from "../../../components/buttons/button";
import RecentCheckIn from "../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../utils/checkInData";

const Classes = () => {
  return (
    <>
      <div>
        <div className="bg-lightest-blue p-2 border-round-lg shadow-2">
          <div className="flex justify-content-between  align-items-center px-3">
            <div className="col-3 px-0">
              <Input
                type="search"
                title="Class Name"
                placeholder="Boot Camp"
              ></Input>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <CardWithTitle title="When and Where">
            <div className="p-3">
              <div className="flex ">
                <div className="col-3">
                  <DropDown title="How often does class meet?"></DropDown>
                </div>
                <div className="col-3">
                  <DropDown title="Class Location"></DropDown>
                </div>
              </div>
              <div className="flex mt-3">
                <div className="col-3">
                  <Input
                    type="date"
                    title="Start Date"
                    placeholder="11/08/1998"
                  ></Input>
                </div>
                <div className="col-3">
                  <Input
                    type="date"
                    title="End Date"
                    placeholder="11/08/1998"
                  ></Input>
                </div>
                <div className="col pt-5 mt-2">
                  <Checkbox
                    title="Indefinite"
                    className="text-900 text-sm"
                  ></Checkbox>
                </div>
              </div>
              <div className="flex justify-content-between w-7 mt-4">
                <div>
                  <Buttons
                    label="Sunday"
                    className="bg-white text-gray-200 border-none border-round-lg"
                    style={{ height: "38px" }}
                  ></Buttons>
                </div>
                <div>
                  <Buttons
                    label="Monday"
                    className="bg-white text-gray-200 border-none border-round-lg"
                    style={{ height: "38px" }}
                  ></Buttons>
                </div>
                <div>
                  <Buttons
                    label="Tuesday"
                    className="bg-white text-gray-200 border-none border-round-lg"
                    style={{ height: "38px" }}
                  ></Buttons>
                </div>
                <div>
                  <Buttons
                    label="Wednesday"
                    className="bg-white text-gray-200 border-none border-round-lg"
                    style={{ height: "38px" }}
                  ></Buttons>
                </div>
                <div>
                  <Buttons
                    label="Thursday"
                    className="bg-white text-gray-200 border-none border-round-lg"
                    style={{ height: "38px" }}
                  ></Buttons>
                </div>
                <div>
                  <Buttons
                    label="Friday"
                    className="bg-white text-gray-200 border-none border-round-lg"
                    style={{ height: "38px" }}
                  ></Buttons>
                </div>
                <div>
                  <Buttons
                    label="Saturday"
                    className="bg-white text-gray-200 border-none border-round-lg"
                    style={{ height: "38px" }}
                  ></Buttons>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Instructor">
            <div className="p-3">
              <div className="flex">
                <div className="col-4">
                  <DropDown title="staff"></DropDown>
                </div>
                <div className="col-4">
                  <DropDown title="Pay"></DropDown>
                </div>
                <div className="col-4">
                  <DropDown title="Assistant 1"></DropDown>
                </div>
              </div>
              <div className="flex mt-3 ">
                <div className="col-4">
                  <DropDown title="Assistant 1 Pay"></DropDown>
                </div>
                <div className="pt-4 mt-2">
                  <Buttons
                    style={{ height: "38px" }}
                    className="btn-dark border-none "
                    icon="pi pi-plus-circle"
                    label="Add Assistant"
                  ></Buttons>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Participants">
            <div className="p-3">
              <div className="flex">
                <div className="col-4">
                  <Input title="Total Capacity" placeholder="10"></Input>
                </div>
                <div className="col-4">
                  <Input
                    title="How many people can waitlist?"
                    placeholder="1"
                  ></Input>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Online Scheduling">
            <div className="p-3">
              <div className="p-2 pb-0">
                <Checkbox
                  title="Allow clients to sign up for this class online"
                  className="text-sm text-900"
                ></Checkbox>
              </div>
              <div className="mt-4 p-2 col-4">
                <Input title="Online Capacity" placeholder="10"></Input>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Pricing">
            <div className="p-3">
              <div className="mt-3">
                <Checkbox
                  title="Allow clients to sign up now and pay later"
                  className="text-sm text-900"
                ></Checkbox>
              </div>
              <div className="my-3">
                <Checkbox
                  title="Clients can attend this class for free"
                  className="text-sm text-900"
                ></Checkbox>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className=" m-2 mt-3 flex justify-content-end">
          <div className=" mx-4">
            <Buttons
              label="Save"
              className="btn-dark mx-3 border-none"
            ></Buttons>
          </div>
          <div className="">
            <Buttons
              label="Cancel"
              className="btn-grey   border-none"
            ></Buttons>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <RecentCheckIn data={checkInData}></RecentCheckIn>
      </div>
    </>
  );
};

export default Classes;
