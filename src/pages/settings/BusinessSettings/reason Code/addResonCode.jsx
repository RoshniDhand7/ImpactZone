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
        <h4 className="font-bold text-xl  my-3">ADD Reason Code</h4>
        <div className="">
          <CardWithTitle title="Active">
            <div className="col-5 p-4">
              <Input title="Reason Code"></Input>
            </div>
          </CardWithTitle>
        </div>
        <div className="flex justify-content-end">
          <div className="flex mt-4 mr-2">
            <div className="mx-4">
              <Buttons label="Save" className=" mx-3 btn-dark border-none" />
            </div>
            <Buttons label="Cancel " className="btn-grey border-none " />
          </div>
        </div>
      </div>
      <div className="p-3">
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};

export default AddResonCode;
