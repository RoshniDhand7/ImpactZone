import React from "react";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../components/input/input";
import DropDown from "../../../../components/dropdown/dropdown";
import Buttons from "../../../../components/buttons/button";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import { PickList } from "primereact/picklist";
import itemsbackword from "../../../../assets/icons/itemsbackward.png";

export const General = () => {
  const itemTemplate = (item) => {
    return (
      <div className=" flex flex-wrap p-2 align-items-center gap-3">
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
      <div className="my-2">
        <CardWithTitle title="Genral">
          <div className="p-3">
            <div className="flex justify-content-between ">
              <div className="col-4">
                <Input title="Company Id"></Input>
              </div>
              <div className="col-4">
                <Input title="Billing Country"></Input>
              </div>
              <div className="col-4">
                <Input title="Company Name"></Input>
              </div>
            </div>
            <div className="flex  justify-content-between mt-3 ">
              <div className="col-4">
                <DropDown title="Brand"></DropDown>
              </div>
              <div className="col-4">
                <DropDown title="Show Scheduling Menus"></DropDown>
              </div>
              <div className="col-4">
                <DropDown title="Allow Multi-Club Clock In/Out"></DropDown>
              </div>
            </div>
            <div className="flex  justify-content-between mt-3 ">
              <div className="col-4">
                <DropDown title="Clock In Department Required"></DropDown>
              </div>
              <div className="col-4">
                <DropDown title="Access Restriction"></DropDown>
              </div>
              <div className="col-4">
                <DropDown title="Waitlist Email Interval"></DropDown>
              </div>
            </div>
            <div className="flex  justify-content-between mt-4 ">
              <div className="col-4">
                <DropDown title="Club Account Payment Methods"></DropDown>
              </div>
            </div>
          </div>
        </CardWithTitle>
        <div className="mt-3">
          <CardWithTitle title="Address">
            <div className="p-3">
              <div className="flex justify-content-between mt-4">
                <div className="col-4">
                  <DropDown title="Country"></DropDown>
                </div>
                <div className="col-4">
                  <Input title="Address 1"></Input>
                </div>
                <div className="col-4">
                  <Input title="Address 2"></Input>
                </div>
              </div>
              <div className="flex  justify-content-between mt-4 ">
                <div className="col-4">
                  <Input title="City"></Input>
                </div>
                <div className="col-4">
                  <DropDown title="State"></DropDown>
                </div>
                <div className="col-4">
                  <Input title="Zip Code"></Input>
                </div>
              </div>
              <div className="mt-2 p-2">
                <span className=" font-semibold text-dark-gray">
                  Country Addresses
                </span>
                <div className="card  my-3  ">
                  <PickList
                    // source={source}
                    // target={target}
                    // onChange={onChange}
                    itemTemplate={itemTemplate}
                    breakpoint=""
                    sourceHeader="Available"
                    targetHeader="Selected"
                    sourceStyle={{ height: "20rem" }}
                    targetStyle={{ height: "20rem" }}
                  />
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Contact Information">
            <div className="p-3">
              <div className="flex justify-content-between  ">
                <div className="col-4">
                  <Input title="Work Number"></Input>
                </div>
                <div className="col-4">
                  <Input title="Work Extention"></Input>
                </div>
                <div className="col-4">
                  <Input title="Fax Number"></Input>
                </div>
              </div>
              <div className="flex  justify-content-between my-4 ">
                <div className="col-4">
                  <Input title="Primary Email"></Input>
                </div>
                <div className="col-4">
                  <Input title="Alternate Email"></Input>
                </div>
                <div className="col-4">
                  <Input title="Work Extention"></Input>
                </div>
              </div>
              <div className="flex  justify-content-between ">
                <div className="col-4">
                  <Input title="Fax Number"></Input>
                </div>
                <div className="col-4">
                  <Input title="Primary Email"></Input>
                </div>
                <div className="col-4">
                  <Input title="Alternate Email"></Input>
                </div>
              </div>
              <div className="flex  justify-content-between mt-4 ">
                <div className="col-4">
                  <Input title="Company URL"></Input>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Data Export">
            <div className="p-3">
              <div className="flex">
                <div className="col-4">
                  <Input title="Company Code"></Input>
                </div>
                <div className="col-4">
                  <Input title="Batch Id"></Input>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Remote Check Ins">
            <div className="p-3">
              <div className="flex justify-content-between ">
                <div className="col-4">
                  <DropDown title="Check In Limit"></DropDown>
                </div>
                <div className="col-4">
                  <DropDown title="Per"></DropDown>
                </div>
                <div className="col-4">
                  <DropDown title="Restriction Type"></DropDown>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Club Credit">
            <div className="p-3">
              <div className="flex  ">
                <div className="col-4">
                  <Input title="Club Credit Reset Day"></Input>
                </div>
                <div className="col-4">
                  <Input title="Allow Secondary Members"></Input>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="col-12 mt-3 flex justify-content-end">
          <div className="mx-5">
            <Buttons
              label="Save"
              className="btn-dark mx-3 border-none "
            ></Buttons>
          </div>
          <div className="">
            <Buttons label="Cancel" className="btn-grey border-none "></Buttons>
          </div>
        </div>
        <div>
          <RecentCheckIn data={checkInData}></RecentCheckIn>
        </div>
      </div>
    </>
  );
};
