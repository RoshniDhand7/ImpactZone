import React from "react";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../components/input/input";
import Buttons from "../../../../components/buttons/button";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";

const AddResonCode = () => {
  return (
    <>
      <div className="p-3">
        <h4 className="text-bold">ADD Reason Code</h4>
        <div className="">
          <CardWithTitle title="Active">
            <div className="col-5 p-4">
              <Input title="Reason Code"></Input>
            </div>
          </CardWithTitle>
        </div>
        <div className="flex justify-content-end">
          <div className="flex col-2 ">
            <Buttons label="Save" className="mr-2 btn-dark border-none p-3" />
            <Buttons label="Cancel " className="btn-grey border-none " />
          </div>
        </div>
      </div>
      <div className="">
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};

export default AddResonCode;
