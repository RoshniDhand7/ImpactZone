import { PickList } from "primereact/picklist";
import React from "react";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import itemsbackword from "../../../../assets/icons/itemsbackward.png";
import Buttons from "../../../../components/buttons/button";
import DropDown from "../../../../components/dropdown/dropdown";
import Input from "../../../../components/input/input";
import { Editor } from "primereact/editor";

const AddMembershipPlan = ({ onClickAddFees }) => {
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
      <div>
        <div className=" flex align-items-center justify-content-between my-3">
          <span className="text-xl font-bold text-900">
            Manage Payment Plans
          </span>
        </div>
        <div className="my-3">
          <CardWithTitle title="General">
            <div className="p-3">
              <div className="flex  ">
                <div className="col">
                  <DropDown title="Category"></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Subcategory"></DropDown>
                </div>
                <div className="col">
                  <Input title="Name"></Input>
                </div>
              </div>
              <div className="flex mt-2">
                <div className="col">
                  <DropDown title="Club"></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Membership Type"></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Agreement Template"></DropDown>
                </div>
              </div>
            </div>
            <div className="p-3 ">
              <span className="font-semibold mx-3">Assessed Feed</span>
              <div className="card  ">
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
        <div>
          <CardWithTitle title="Services">
            <div className="p-3">
              <div className="flex justify-content-between w-6  p-2  ">
                <span className="text-xs font-semibold text-dark-gray">
                  Name
                </span>
              </div>
              <div className="bg-white border-round-lg flex p-3 ">
                <div className="col-9 flex justify-content-center align-items-center">
                  <span className="text-xs font-semibold text-dark-gray text-center ">
                    No Row To Show
                  </span>
                </div>
                <div
                  className="col flex justify-content-end align-items-center  "
                  style={{ height: "180px" }}
                >
                  <div className="flex flex-column ">
                    <div
                      className="my-3"
                      style={{ width: "128px", height: "35px" }}
                    >
                      <Buttons
                        label="Add"
                        className="btn-dark border-none "
                      ></Buttons>
                    </div>
                    <div
                      className=""
                      style={{ width: "128px", height: "35px" }}
                    >
                      <Buttons
                        className="btn-dark border-none
                  l"
                        label="Remove"
                      ></Buttons>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="my-3">
          <CardWithTitle title="Contract Options">
            <div className="p-3">
              <div className="flex  ">
                <div className="col">
                  <DropDown title="Autopay" placeholder="Select"></DropDown>
                </div>
                <div className="col">
                  <DropDown
                    title="How often will clients be charged?"
                    placeholder="Select"
                  ></DropDown>
                </div>
                <div className="col">
                  <Input title="Time Period" placeholder="Enter Month"></Input>
                </div>
              </div>
              <div className="flex mt-2">
                <div className="col">
                  <Input title="Numbers of autopays" placeholder="6"></Input>
                </div>
                <div className="col">
                  <DropDown
                    title="When will clients be charged?"
                    placeholder="Select"
                  ></DropDown>
                </div>
                <div className="col Without-tile-inputheight">
                  <Input title="Date" placeholder="Select" type="date"></Input>
                </div>
              </div>
              <div className="flex mt-2">
                <div className="col-4">
                  <DropDown
                    title="What happens after 6 payments?"
                    placeholder="Select"
                  ></DropDown>
                </div>
                <div className="col-4">
                  <DropDown title="Sell Online" placeholder="Select"></DropDown>
                </div>
              </div>
              <div className="card m-2 mt-5">
                <div className="py-2 text-xs font-semibold text-dark-gray">
                  Online Description
                </div>
                <Editor
                  value="Always bet on Prime!"
                  readOnly
                  style={{ height: "320px" }}
                />
              </div>
            </div>
          </CardWithTitle>
        </div>

        <div className="flex justify-content-end p-2 ">
          <div className=" mt-3 flex  ">
            <div className="">
              <Buttons
                // onClick={nextPage}
                label="Save"
                className="btn-dark px-4  border-none"
              ></Buttons>
            </div>
            <div className="ml-3 ">
              <Buttons
                onClick={onClickAddFees}
                label="Cancel"
                className="btn-grey  border-none"
              ></Buttons>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMembershipPlan;
