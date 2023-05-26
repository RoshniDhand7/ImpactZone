import React from "react";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import DropDown from "../../../../components/dropdown/dropdown";
import Buttons from "../../../../components/buttons/button";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";

export const Online = () => {
  return (
    <>
      <div className="my-2">
        <CardWithTitle title="Booking">
          <div className="p-3">
            <div className="col-12 flex  ">
              <div className="col-4">
                <DropDown title="Book Out from" />
              </div>
              <div className="col-4">
                <DropDown title="Book Out to" />
              </div>
            </div>
          </div>
        </CardWithTitle>
      </div>
      <div className="mt-3">
        <CardWithTitle title="Cancellation">
          <div className="p-3">
            <div className="flex  ">
              <div className="col-4">
                <DropDown title="Allow Cancel Online" />
              </div>
              <div className="col-4">
                <DropDown title="Time before evento" />
              </div>
            </div>
          </div>
        </CardWithTitle>
      </div>
      <div className="col-12 flex justify-content-end">
        <div className="col-1">
          <Buttons label="Save" className="btn-dark p-3 border-none "></Buttons>
        </div>
        <div className="col-1">
          <Buttons
            label="Cancel"
            className="btn-grey p-3 border-none "
          ></Buttons>
        </div>
      </div>
      <div>
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};
