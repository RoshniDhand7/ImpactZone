import React from "react";
import DropDown from "../../../../components/dropdown/dropdown";
import Buttons from "../../../../components/buttons/button";
import TableData from "../../../../components/cards/dataTable/dataTable";
import dummyData from "../../../../utils/dummyData";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import { Link } from "react-router-dom";

const ReasonCode = () => {
  const { reasonCode, reasonCodeData } = dummyData();
  return (
    <>
      <div className="my-2">
        <div className=" btn-lightblue flex justify-content-between p-2 border-round-md  ">
          <div className=" flex justify-content-around">
            <div className="flex align-items-center mr-3 ">
              <span className="mx-3">Type:</span>
              <DropDown></DropDown>
            </div>
            <div className="flex justify-content-between align-items-center ">
              <span className="mx-3">Status:</span>{" "}
              <DropDown className=""></DropDown>
            </div>
            <div className="mx-5 ">
              <Buttons
                label="Search"
                className="btn-dark border-none"
              ></Buttons>
            </div>
          </div>
          <div className="mx-3">
            <Link to="/addReasonCode">
              <Buttons
                icon="pi pi-pi-plus"
                label=" Add Reason Code"
                className="btn-dark border-none"
              ></Buttons>
            </Link>
          </div>
        </div>
        <div className="mt-3">
          <TableData columns={reasonCode} data={reasonCodeData} />
        </div>
      </div>
      <div className=" mt-2">
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};

export default ReasonCode;
