import React from "react";
import Input from "../../../../components/input/input";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Checkbox from "../../../../components/checkbox/checkbox";
import Buttons from "../../../../components/buttons/button";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import DropDown from "../../../../components/dropdown/dropdown";

const AddResource = ({ openAddResource }) => {
  return (
    <>
      <div>
        <div className="mt-3">
          <Checkbox
            title="Active"
            className="text-900 font-semibold"
          ></Checkbox>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Resource ">
            <div className=" p-3">
              <div className="flex ">
                <div className="col">
                  <Input title="Name"></Input>
                </div>
                <div className="col">
                  <DropDown title="Resource Type"></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Location"></DropDown>
                </div>
              </div>
              <div className="flex my-3">
                <div className="col">
                  <Input title="Available Quantity"></Input>
                </div>
                <div className="col">
                  <DropDown title="Used in Events"></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Past Due"></DropDown>
                </div>
              </div>
              <div>
                <div className="col-4 ">
                  <DropDown title="Services Assigned"></DropDown>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
      </div>
      <div className=" m-2 mt-3 flex justify-content-end">
        <div className="mx-3" style={{ width: "105px" }}>
          <Buttons label="Save" className="btn-dark border-none"></Buttons>
        </div>
        <div className="">
          <Buttons
            onClick={openAddResource}
            label="Cancel"
            className="btn-grey border-none"
          ></Buttons>
        </div>
      </div>
      <div className="mt-4">
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};

export default AddResource;
