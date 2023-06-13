import React from "react";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import itemsbackword from "../../../../assets/icons/itemsbackward.png";
import { PickList } from "primereact/picklist";
import Input from "../../../../components/input/input";
import Buttons from "../../../../components/buttons/button";

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
        <p className="text-xl font-semibold text-900 my-3 ">Add Event Setups</p>
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
      </div>
    </>
  );
};

export default DisplayOptions;
