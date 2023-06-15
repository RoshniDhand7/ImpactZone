import React from "react";
import Buttons from "../../../components/buttons/button";
import DropDown from "../../../components/dropdown/dropdown";
import TableData from "../../../components/cards/dataTable/dataTable";
import RecentCheckIn from "../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../utils/checkInData";
import CardWithTitle from "../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../components/input/input";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";

const JobTitle = () => {
  const [value, setValue] = useState("");
  const [showAddJobTitle, setAddJobTitle] = useState("");
  const JobTitleData = [
    {
      name: "Amenities",
      discription:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      name: "Classes",
      discription:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      name: "Gym Floor",
      discription:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      name: "Sports",
      discription:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
  ];

  const ActionEditDelete = (col) => {
    return (
      <>
        <div className="border-none bg-lightest-blue flex justify-content-end ">
          <span>
            <i className="pi pi-pencil mx-3" style={{ color: "#708090" }}></i>
          </span>
          <span>
            <i className="pi pi-trash" style={{ color: "#708090" }}></i>
          </span>
        </div>
      </>
    );
  };
  const JobTitleColumns = [
    {
      field: "name",
      header: "Name",
    },
    {
      field: "discription",
      header: "Discription",
    },
    {
      field: "",
      header: "",
      body: ActionEditDelete,
    },
  ];
  const AddJobTitle = () => {
    return (
      <>
        <div>
          <CardWithTitle title="Job Title">
            <div className="p-3">
              <div>
                <Input title="Job Title" placeholder="Gym Floor"></Input>
              </div>
              <div className="mt-4" style={{ Width: "100%" }}>
                <div className="flex flex-column gap-2">
                  <label
                    htmlFor=""
                    className="text-xs text-dark-gray font-semibold"
                  >
                    Description (221/2565)
                  </label>
                  <InputTextarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    style={{ height: "150px" }}
                  />
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="flex justify-content-end mt-3 p-2">
          <div className="mx-3">
            <Buttons
              label="Save"
              className="btn-dark border-none"
              style={{ height: "40px" }}
            ></Buttons>
          </div>
          <div className="">
            <Buttons
              onClick={() => setAddJobTitle(false)}
              label="Cancel "
              className="btn-grey border-none"
              style={{ height: "40px" }}
            ></Buttons>
          </div>
        </div>
        <div className="mt-5">
          <RecentCheckIn data={checkInData}></RecentCheckIn>
        </div>
      </>
    );
  };
  return (
    <>
      {showAddJobTitle ? (
        AddJobTitle()
      ) : (
        <>
          <div>
            <div className="bg-lightest-blue border-round-lg p-2 ">
              <div className="flex justify-content-between align-items-center ">
                <div className="col-4">
                  <DropDown title="Status" placeholder="Active"></DropDown>
                </div>
                <div className="mr-3">
                  <Buttons
                    onClick={() => setAddJobTitle(true)}
                    className="btn-dark border-none mt-3"
                    icon="pi pi-plus-circle"
                    label="Add Job Title"
                    style={{ height: "38px" }}
                  ></Buttons>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <TableData
                data={JobTitleData}
                columns={JobTitleColumns}
              ></TableData>
            </div>
          </div>
          <div className="mt-5">
            <RecentCheckIn data={checkInData}></RecentCheckIn>
          </div>
        </>
      )}
    </>
  );
};

export default JobTitle;
