import React from "react";
import itemsbackword from "../../../assets/icons/itembackward.png";
import DropDown from "../../../components/dropdown/dropdown";
import Buttons from "../../../components/buttons/button";
import TableData from "../../../components/cards/dataTable/dataTable";
import Input from "../../../components/input/input";
import Checkbox from "../../../components/checkbox/checkbox";
import CardWithTitle from "../../../components/cards/cardWithTitle/cardWithTitle";
import { PickList } from "primereact/picklist";
import RecentCheckIn from "../../../components/cards/Profilecard/recentCheckIn";
import { useState } from "react";
import checkInData from "../../../utils/checkInData";

const EventCategories = () => {
  const [showEventCategories, setEventCategories] = useState(false);
  const itemTemplate = (item) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <img
          className="w-4rem shadow-2 flex-shrink-0 border-round"
          src={itemsbackword}
          alt={item.name}
        />
        <div className="flex-1 flex flex-column gap-2">
          <span className="font-bold">{item.name}</span>
          <div className="flex align-items-center gap-2">
            <i className="pi pi-tag text-sm"></i>
            <span>{item.category}</span>
          </div>
        </div>
        <span className="font-bold text-900">${item.price}</span>
      </div>
    );
  };

  const EventCategoriesData = [
    {
      name: "All",
    },
    {
      name: "Appointment Only",
    },
    {
      name: "Classes Only",
    },
  ];

  const ActionEditDelete = () => {
    return (
      <>
        <div className="flex justify-content-end">
          <span className="mx-2">
            <i className="pi pi-pencil"></i>
          </span>

          <span>
            <i className="pi pi-trash"></i>
          </span>
        </div>
      </>
    );
  };
  const EventCategoriescolumn = [
    {
      field: "name",
      header: "Name",
    },
    {
      field: "",
      header: "",
      body: ActionEditDelete,
    },
  ];
  const eventCategories = () => {
    return (
      <>
        <div>
          <div className="bg-lightest-blue p-2 border-round-lg ">
            <div className="flex justify-content-between align-items-center px-3">
              <div className="col-3">
                <DropDown title="Status" placeholder="Active"></DropDown>
              </div>
              <div className="">
                <Buttons
                  onClick={setEventCategories}
                  className="btn-dark border-none"
                  label="Add"
                ></Buttons>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <TableData
              data={EventCategoriesData}
              columns={EventCategoriescolumn}
            ></TableData>
          </div>
        </div>
        <div className=" m-2 mt-3 flex justify-content-end">
          <div className=" mx-4">
            <Buttons
              label="Save"
              className="btn-dark mx-3 border-none"
            ></Buttons>
          </div>
          <div className="">
            <Buttons
              label="Cancel"
              className="btn-grey   border-none"
            ></Buttons>
          </div>
        </div>
      </>
    );
  };

  const ADDEventCategories = () => {
    return (
      <>
        <div className="my-3">
          <Checkbox title="Active" className="text-900 text-xs font-semibold" />
        </div>
        <div className="bg-lightest-blue p-2 border-round-lg ">
          <div className="flex justify-content-between align-items-center px-3">
            <div className="col-3 px-0">
              <Input title="Name" placeholder="Traning"></Input>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Add Event Setups">
            <div className="p-3">
              <div className="card mt-3  ">
                <PickList
                  // source={source}
                  // target={target}
                  // onChange={onChange}
                  itemTemplate={itemTemplate}
                  breakpoint=""
                  sourceHeader="Available"
                  targetHeader="Selected"
                  sourceStyle={{ height: "30rem" }}
                  targetStyle={{ height: "30rem" }}
                />
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className=" m-2 mt-3 flex justify-content-end">
          <div className=" mx-4">
            <Buttons
              label="Save"
              className="btn-dark mx-3 border-none"
            ></Buttons>
          </div>
          <div className="">
            <Buttons
              label="Cancel"
              className="btn-grey   border-none"
            ></Buttons>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      {showEventCategories ? ADDEventCategories() : eventCategories()}

      <div className="mt-5">
        <RecentCheckIn data={checkInData}></RecentCheckIn>
      </div>
    </>
  );
};
export default EventCategories;
