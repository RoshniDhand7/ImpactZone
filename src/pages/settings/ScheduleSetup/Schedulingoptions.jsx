import React, { useState } from "react";
import CardWithTitle from "../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../components/input/input";
import Buttons from "../../../components/buttons/button";
import checkInData from "../../../utils/checkInData";
import RecentCheckIn from "../../../components/cards/Profilecard/recentCheckIn";
import DropDown from "../../../components/dropdown/dropdown";
import TableData from "../../../components/cards/dataTable/dataTable";

const SchedulingOptions = () => {
  const actionTemplate = (col) => {
    // console.log(col._id, "collllll");
    return (
      <>
        <div className="flex justify-content-end">
          <span>
            <i className="pi pi-pencil mr-3 cursor-pointer"></i>
          </span>
          <span>
            <i className="pi pi-minus-circle text-gray-300 cursor-pointer"></i>
          </span>
        </div>
      </>
    );
  };

  const agreementCategoriesColumn = [
    {
      field: "SrNo",
      header: "Sr. No.",
      id: "",
      index: "",
    },
    {
      field: "date",
      header: "Date",
      id: "",
      index: "",
    },
    {
      field: "open",
      header: "Open",
      id: "",
      index: "",
    },
    {
      field: "starttime",
      header: "Start Time",
      id: "",
      index: "",
    },
    {
      field: "endtime",
      header: "End Time",
      id: "",
      index: "",
    },

    {
      field: "",
      header: "",
      id: "",
      body: actionTemplate,
    },
  ];
  const [agreementCategoriesData, setAgreementCategoriesData] = useState([
    {
      SrNo: "1",
      date: "1",
    },
    {
      SrNo: "1",
      date: "12",
    },
    {
      SrNo: "1",
      date: "3",
    },
    {
      SrNo: "1",
      date: "2",
    },
    {
      SrNo: "1",
      date: "1",
    },
  ]);
  return (
    <>
      <div
        className="
    p-3"
      >
        <CardWithTitle title="Scheduling Options">
          <div className="p-3">
            <div className="flex justify-content-between">
              <p className="text-base font-semibold text-dark-gray my-3 ml-2">
                Hours of Operation
              </p>
              <div className="pt-2 mr-3">
                <Buttons
                  className="btn-dark border-none"
                  label="Add New Schedule"
                  icon="pi pi-plus-circle"
                ></Buttons>
              </div>
            </div>
            <div className="flex " style={{ marginRight: "17px" }}>
              <div className="col">
                <Input
                  title="Start Time"
                  type="time"
                  placeholder="Select"
                ></Input>
              </div>
              <div className="col">
                <Input
                  title="End Time"
                  type="time"
                  placeholder="Select"
                ></Input>
              </div>
              <div className="col">
                <DropDown
                  title="Days "
                  type="time"
                  placeholder="Select"
                ></DropDown>
              </div>
            </div>
            <div className="flex align-items-center justify-content-center my-3">
              <div className="col">
                <Input
                  title="Start Time"
                  type="time"
                  placeholder="Select"
                ></Input>
              </div>
              <div className="col">
                <Input
                  title="End Time"
                  type="time"
                  placeholder="Select"
                ></Input>
              </div>
              <div className="col">
                <DropDown
                  title="Days "
                  type="time"
                  placeholder="Select"
                ></DropDown>
              </div>
              <span>
                <i className="pi pi-minus-circle mt-4 text-gray-300"></i>
              </span>
            </div>
            <div className="flex ">
              <div className=" col-4">
                <DropDown
                  title="Allow Waitlist"
                  placeholder="Allow Waitlist"
                ></DropDown>
              </div>
              <div className="col-4">
                <DropDown
                  title="Require Comment (Cancel - No Charge)"
                  placeholder="Require Comment"
                ></DropDown>
              </div>
            </div>{" "}
          </div>
        </CardWithTitle>
      </div>
      <div
        className="
    p-3"
      >
        <CardWithTitle title="Special Timings and Hoildays">
          <div className="p-3">
            <div className="flex">
              <div className="col-4">
                <Input type="date" placeholder="Select" title="Date"></Input>
              </div>
              <div className="col-4">
                <DropDown placeholder="Select" title="Open"></DropDown>
              </div>
            </div>
            <div className="flex my-3">
              <div className="col-4">
                <Input
                  title="Start Time"
                  type="time"
                  placeholder="Select"
                ></Input>
              </div>
              <div className="col-4 ">
                <Input
                  title="End Time"
                  type="time"
                  placeholder="Select"
                ></Input>
              </div>
            </div>
          </div>
        </CardWithTitle>
      </div>
      <div className="p-3">
        <TableData
          columns={agreementCategoriesColumn}
          data={agreementCategoriesData}
        ></TableData>
      </div>
      <div className=" m-2 p-3  flex justify-content-end">
        <div className=" mx-4">
          <Buttons
            label="Add"
            className="btn-dark mx-3   border-none"
          ></Buttons>
        </div>
        <div className="">
          <Buttons label="Cancel" className="btn-grey   border-none"></Buttons>
        </div>
      </div>
      <div className="mt-5 p-3">
        <RecentCheckIn data={checkInData}></RecentCheckIn>
      </div>
    </>
  );
};

export default SchedulingOptions;
