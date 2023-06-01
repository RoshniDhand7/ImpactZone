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
        <div className="col-12 p-0 btn-lightblue flex justify-content-between p-2 border-round-md  ">
          <div className="col-8  p-0 flex justify-content-around align-items-center">
            <div className="col-3 p-0 flex align-items-center  align-items-center mr-3 ">
              <span className="mx-3 text-xs font-semibold">Type:</span>
              <div className="col-12 p-0 ">
                <DropDown></DropDown>
              </div>
            </div>
            <div className="col-3 flex justify-content-between align-items-center ">
              <span className="mx-3 text-xs font-semibold">Status:</span>{" "}
              <div className="col-12 p-0">
                <DropDown className=""></DropDown>
              </div>
            </div>
            <div className="col-2  mx-5 ">
              <Buttons
                label="Search"
                className="btn-dark p-3 border-none"
              ></Buttons>
            </div>
          </div>
          <div className=" col-2  ">
            <Link to="/addReasonCode">
              <Buttons
                icon="pi pi-plus-circle"
                label=" Add Reason Code"
                className=" p-3 btn-dark border-none"
              ></Buttons>
            </Link>
          </div>
        </div>
        <div className="mt-3">
          <TableData columns={reasonCode} data={reasonCodeData} />
        </div>
      </div>
      <div className="flex justify-content-end mt-3">
        <div className="col-1 ">
          <Buttons
            label="Close"
            className=" p-3 text-900 btn-grey border-none"
          ></Buttons>
        </div>
      </div>
      <div className=" mt-5">
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};

export default ReasonCode;
