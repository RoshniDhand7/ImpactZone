import React from "react";
import Input from "../../../../components/input/input";
import { InputTextarea } from "primereact/inputtextarea";
import Buttons from "../../../../components/buttons/button";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Checkbox from "../../../../components/checkbox/checkbox";

const AddResourceType = ({ openADDResourceType }) => {
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
          <CardWithTitle title="Resource Type ">
            <div className=" p-3">
              <div className="flex ">
                <div className="col">
                  <Input title="Name"></Input>
                </div>
              </div>
              <div>
                <div className="col-12 flex flex-column gap-2 ">
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
        <div className="mx-3" style={{ width: "105px" }}>
          <Buttons label="Save" className="btn-dark border-none"></Buttons>
        </div>
        <div className="">
          <Buttons
            onClick={openADDResourceType}
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

export default AddResourceType;
