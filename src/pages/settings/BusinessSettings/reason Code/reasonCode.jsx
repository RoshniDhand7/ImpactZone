import React from "react";
import DropDown from "../../../../components/dropdown/dropdown";
import Buttons from "../../../../components/buttons/button";
import TableData from "../../../../components/cards/dataTable/dataTable";

import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import { Link } from "react-router-dom";
import { useState } from "react";

const ReasonCode = () => {
  const [reasonCodeData, setReasonCode] = useState([
    {
      name: "Agreement in queue",
      abc: "IN_QUEUE",
      index: "",
      id: "",
    },
    {
      name: "Agreement in queue",
      abc: "IN_QUEUE",
      index: "",
      id: "",
    },
    {
      name: "Agreement in queue",
      abc: "IN_QUEUE",
      index: "",
      id: "",
    },
    {
      name: "Agreement in queue",
      abc: "IN_QUEUE",
      index: "",
      id: "",
    },
  ]);

  // const deleteRow = (number) => {
  //   let copy = [...reasonCodeData];
  //   copy = copy.filter((item, index) => number !== index);
  //   setReasonCode();
  // };
  const tableRowRemove = (index) => {
    const dataRow = [...reasonCodeData];
    dataRow.splice(index, 1);
    setReasonCode(dataRow);
  };

  const removeRowPriority = (col) => {
    return (
      <>
        <div className="border-none bg-lightest-blue flex justify-content-end ">
          <span>
            <i className="pi pi-pencil mx-3" style={{ color: "#708090" }}></i>
          </span>
          <span onClick={tableRowRemove}>
            <i className="pi pi-trash" style={{ color: "#708090" }}></i>
          </span>
        </div>
      </>
    );
  };

  const reasonCode = [
    { field: "name", header: "Name", id: "" },
    { field: "abc", header: "ABC", id: "", index: "" },
    { field: "" },
    { field: "" },
    { field: "", header: "", body: removeRowPriority, id: "", index: "" },
  ];

  return (
    <>
      <div className="my-2">
        <div className="col-12 p-0 btn-lightblue flex justify-content-between p-2 border-round-lg  ">
          <div className=" p-0 flex justify-content-around align-items-center">
            <div className="p-0 flex align-items-center  align-items-center mr-3 ">
              <span className="mx-3 text-xs text-dark-gray font-semibold">
                Type:
              </span>
              <div className=" p-0 ">
                <DropDown placeholder="Cancel Pending POS Transaction"></DropDown>
              </div>
            </div>
            <div className=" flex justify-content-between align-items-center ">
              <span className="mx-3 text-xs text-dark-gray font-semibold">
                Status:
              </span>
              <div className=" p-0">
                <DropDown className="" placeholder="Active"></DropDown>
              </div>
            </div>
            <div className=" mx-5 ">
              <Buttons
                label="Search"
                className="btn-dark mx-3  text-xs border-none"
              ></Buttons>
            </div>
          </div>
          <div className=" mr-3">
            <Link to="/addReasonCode">
              <Buttons
                icon="pi pi-plus-circle"
                label=" Add Reason Code"
                className="btn-dark border-none"
              ></Buttons>
            </Link>
          </div>
        </div>
        <div className="mt-3">
          <TableData
            columns={reasonCode}
            data={reasonCodeData}
            delRow={tableRowRemove}
          />
        </div>
      </div>
      <div className="flex justify-content-end pr-2 mt-3">
        <div className="">
          <Buttons
            label="Close"
            className="text-900 btn-grey border-none"
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
