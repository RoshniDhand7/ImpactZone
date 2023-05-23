import React from "react";
import Input from "../../../../components/input/input";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Buttons from "../../../../components/buttons/button";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";

const Customization = () => {
  return (
    <>
      <div>
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
        <div className="flex justify-content-end ">
          <div className="mx-2  ">
            <Buttons label="Save" className="btn-dark border-none"></Buttons>
          </div>
          <div className="">
            <Buttons label="Cancel" className="btn-grey border-none"></Buttons>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <RecentCheckIn data={checkInData}></RecentCheckIn>
      </div>
    </>
  );
};

export default Customization;
