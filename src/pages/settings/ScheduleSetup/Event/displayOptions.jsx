import React from "react";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import itemsbackword from "../../../../assets/icons/itemsbackward.png";
import { PickList } from "primereact/picklist";
import Input from "../../../../components/input/input";
import Buttons from "../../../../components/buttons/button";
import DropDown from "../../../../components/dropdown/dropdown";

const DisplayOptions = () => {
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
        <div className="my-3">
          {" "}
          <p className="text-xl font-semibold text-900 my-3 ">
            Add Event Setups
          </p>
        </div>
        <div>
          <CardWithTitle title="Calendar Display">
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
        <div className="mt-3">
          <CardWithTitle title="PopUp Display">
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
        <div className="mt-3">
          <CardWithTitle title="Pending Color">
            <div className="p-3 flex justify-content-between align-items-center w-5 ">
              <div className="flex  align-items-center ">
                <div className="mr-4">
                  <Input
                    title="Select Box Color"
                    type="color"
                    placeholder="color"
                  ></Input>
                </div>
                <div className=" ml-4">
                  <Input
                    title="Select Text Color"
                    placeholder="#fffff"
                    className="border-none "
                  ></Input>
                </div>
              </div>
              <div>
                <div className="mt-4">
                  <Buttons
                    label="Preview"
                    className="btn-dark border-none"
                    style={{ height: "39px" }}
                  ></Buttons>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Display Preview">
            <div className="p-3">
              <div
                style={{ background: "#666666" }}
                className="p-3 text-white border-round-md border-none"
              >
                <p className="text-xs">
                  John Smith, Aga Group 60 Min, Status Pending, Employee Paul
                  Jones, 15/20
                </p>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Rebooking Time Option">
            <div className="p-3 flex justify-content-between align-items-center w-5 ">
              <div className="flex  align-items-center ">
                <div className="mr-4 col-12">
                  <DropDown
                    title="Times Shown"
                    placeholder="Quarter Hour"
                  ></DropDown>
                </div>
              </div>
              <div
                className="p-2 bg-white border-round-md text-sm flex justify-content-center align-items-center  mx-3 mt-4 "
                style={{ height: "38px" }}
              >
                <p className="mx-3 "> Preview: </p>
                <p className="text-blue mx-3 flex ">1:00 PM</p>
                <p className="text-blue mx-3">1:15 PM</p>
                <p className="text-blue mx-3 ">1:30 PM</p>
                <p className="text-blue mx-3 ">1:45 PM</p>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Deployed Clubs">
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
      </div>
      <div className=" m-2 mt-3 flex justify-content-end">
        <div className="mx-3">
          <Buttons label="Next" className="btn-dark   border-none"></Buttons>
        </div>
        <div className="">
          <Buttons label="Cancel" className="btn-grey   border-none"></Buttons>
        </div>
      </div>
    </>
  );
};

export default DisplayOptions;
