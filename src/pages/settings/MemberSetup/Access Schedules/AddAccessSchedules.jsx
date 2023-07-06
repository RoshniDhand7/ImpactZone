import React from "react";
import Checkbox from "../../../../components/checkbox/checkbox";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../components/input/input";
import { InputTextarea } from "primereact/inputtextarea";
import Buttons from "../../../../components/buttons/button";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";

const AddAccessSchedules = ({ showcomponent }) => {
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
          <CardWithTitle title="Add Campaign Details ">
            <div className=" p-3">
              <div className="flex ">
                <div className="col">
                  <Input title="Name"></Input>
                </div>
                <div className="col">
                  <Input title="Short Name"></Input>
                </div>
                <div className="col">
                  <Input title="Color"></Input>
                </div>
              </div>
              <div>
                <div className="col-12 flex flex-column ">
                  <label
                    className="text-xs font-semibold text-gray-500 gap-2"
                    htmlFor=""
                  >
                    Description (256/256)
                  </label>
                  <div className="">
                    <InputTextarea value="" style={{ width: "100%" }} />
                  </div>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
      </div>
      <div className=" m-2 mt-3 flex justify-content-end">
        <div className="">
          <Buttons
            label="Copy"
            className="btn-dark border-none"
            style={{ width: "105px" }}
          ></Buttons>
        </div>
        <div className="mx-3" style={{ width: "105px" }}>
          <Buttons label="Save" className="btn-dark border-none"></Buttons>
        </div>
        <div className="">
          <Buttons
            onClick={showcomponent}
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

export default AddAccessSchedules;
