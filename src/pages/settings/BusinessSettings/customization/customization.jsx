import React from "react";
import Input from "../../../../components/input/input";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Buttons from "../../../../components/buttons/button";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";

const Customization = () => {
  return (
    <>
      <div className="my-2">
        <div>
          <CardWithTitle title="Customization">
            <div className="p-2 flex">
              <div className="col-3">
                <Input title="Logo"></Input>
              </div>
              <div className="col-3">
                <Input title="ThemeColor"></Input>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="flex justify-content-end mt-3">
          <div className="   col-1 mx-2  ">
            <Buttons
              label="Save"
              className="btn-dark p-3 border-none"
            ></Buttons>
          </div>
          <div className="col-1">
            <Buttons
              label="Cancel"
              className="btn-grey p-3 border-none"
            ></Buttons>
          </div>
        </div>
      </div>
      <div className="mt-5 static b-0 ">
        <RecentCheckIn data={checkInData}></RecentCheckIn>
      </div>
    </>
  );
};

export default Customization;
