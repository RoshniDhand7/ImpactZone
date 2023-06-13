import React from "react";
import Checkbox from "../../../../components/checkbox/checkbox";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../components/input/input";
import DropDown from "../../../../components/dropdown/dropdown";
import { PickList } from "primereact/picklist";
import itemsbackword from "../../../../assets/icons/itembackward.png";
import Buttons from "../../../../components/buttons/button";

const EventGeneral = () => {
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
      <div className="">
        <div className="my-3">
          <span className="text-xl font-bold text-900 ">Add Event Setups</span>
        </div>
        <div className=" font-semibold text-sm text-900 ">
          <Checkbox title="Active"></Checkbox>
        </div>
        <div className="mt-3">
          <CardWithTitle title="General">
            <div className="p-3 ">
              <div className="flex justify-content-between ">
                <div className="col">
                  <Input title="Name"></Input>
                </div>
                <div className="col">
                  <DropDown title="Event Type"></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Internal Use"></DropDown>
                </div>
              </div>
              <div className="flex justify-content-between ">
                <div className="col">
                  <DropDown title="Location Type"></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Default Max Attendees"></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Event Commission Type"></DropDown>
                </div>
              </div>
              <div className="flex justify-content-between ">
                <div className="col">
                  <DropDown title="Available Online"></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Track Attendees"></DropDown>
                </div>
                <div className="col">
                  <DropDown
                    title="Maximum Waitlist (Turned off at club level)"
                    disabled
                  ></DropDown>
                </div>
              </div>
              <div className="flex justify-content-between ">
                <div className="col-4">
                  <DropDown title="Waitlist Expiration (Turned off at club level)"></DropDown>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Required To Create">
            <div className="p-3 flex">
              <div className="col">
                <DropDown title="Employee"></DropDown>
              </div>
              <div className="col">
                <DropDown title="Location"></DropDown>
              </div>
              <div className="col">
                <DropDown title="Member"></DropDown>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Required To Complete">
            <div className="p-3">
              <div className="flex justify-content-between ">
                <div className="col">
                  <DropDown title="Employee"></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Location"></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Member"></DropDown>
                </div>
              </div>
              <div className="flex justify-content-between ">
                <div className="col">
                  <DropDown title="Member Verification"></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Employee Verification (Turned off at club level)"></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Auto Complete"></DropDown>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Booking & Cancellation">
            <div className="p-3">
              <div className="flex justify-content-between ">
                <div className="col">
                  <DropDown title="Overbooking"></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Cancel-NC"></DropDown>
                </div>
                <div className="col">
                  <DropDown title="MCancel-C"></DropDown>
                </div>
              </div>
              <div className="flex justify-content-between ">
                <div className="col-4">
                  <DropDown title="Rebook"></DropDown>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Durations">
            <div className="p-3 ">
              <div className="info-box flex p-3 mb-2">
                <i
                  className="pi pi-info-circle"
                  style={{ color: " #329bea", width: "15px", height: "15px" }}
                ></i>
                <p className="info-color mx-3 ">
                  To top duration will be the default when creating events.
                </p>
              </div>
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
          <div className="mx-3">
            <Buttons label="Next" className="btn-dark   border-none"></Buttons>
          </div>
          <div className="">
            <Buttons
              label="Cancel"
              className="btn-grey   border-none"
            ></Buttons>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventGeneral;
