import React from "react";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import DropDown from "../../../../components/dropdown/dropdown";
import { PickList } from "primereact/picklist";
import itemsbackword from "../../../../assets/icons/itembackward.png";
import Buttons from "../../../../components/buttons/button";
import checkInData from "../../../../utils/checkInData";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";

const ManageReportSecurity = () => {
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
  return (
    <>
      <div className="my-3">
        <span className="font-bold text-xl text-900">
          Manage Report Security
        </span>
        <div className="my-3">
          <CardWithTitle title="General">
            <div className="p-3 flex">
              <div className="col">
                <DropDown title="View"></DropDown>
              </div>
              <div className="col">
                <DropDown title="Employee"></DropDown>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="my-3">
          <CardWithTitle title="Report for user (by Security Roles)">
            <div className="p-3 " style={{ height: "fit-content" }}>
              <div className="bg-white p-2 border-round-md ">
                <div className=" flex flex flex-column">
                  <span className="text-gray-400 text-sm my-2">
                    -- Drawer Summary
                  </span>
                  <span className="text-gray-400 text-sm my-2">
                    -- Recurring Service Plans Adults
                  </span>
                  <span className="text-gray-400 text-sm my-2">
                    -- Recurring Service Billing Projections
                  </span>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="my-3">
          <CardWithTitle title="Clubs">
            <div className="card p-3 ">
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
          </CardWithTitle>
        </div>
      </div>
      <div className="flex justify-content-end ">
        <div className="flex  p-2">
          <div className="mx-4">
            <Buttons label="Save" className="btn-dark mx-3 border-none " />
          </div>
          <div className="">
            <Buttons label="Cancel" className="btn-grey  border-none " />
          </div>
        </div>
      </div>
      <div className="mt-5 p-2">
        <RecentCheckIn data={checkInData}></RecentCheckIn>
      </div>
    </>
  );
};

export default ManageReportSecurity;
