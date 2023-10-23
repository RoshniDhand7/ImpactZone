import { PickList } from "primereact/picklist";
import React from "react";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import itemsbackword from "../../../../assets/icons/itemsbackward.png";
import Buttons from "../../../../components/buttons/button";
import DropDown from "../../../../components/dropdown/dropdown";
import Input from "../../../../components/input/input";
import Checkbox from "../../../../components/checkbox/checkbox";
import { useSelector } from "react-redux";

const AddAssessedFee = ({ onClickAddFees }) => {
  const typeOption = useSelector((state)=>state.staticData.assessedTypes)
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
        <div className=" flex align-items-center justify-content-between my-4">
          <span className="text-xl font-bold text-900">Add Assessed Fees</span>
        </div>
        <div className="my-3">
          <Checkbox title="Active"></Checkbox>
        </div>
        <div className="my-3">
          <CardWithTitle title="General">
            <div className="flex flex-column p-3">
              <div className="flex  ">
                <div className="col">
                  <Input title="Name" type="text"></Input>
                </div>
                <div className="col">
                  <DropDown title="Type" options={typeOption}></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Profit Center"></DropDown>
                </div>
              </div>

              <div className="flex mt-2">
                <div className="col-4">
                  <Input title="Amount"></Input>
                </div>
                <div className="col-4">
                  <DropDown title="Recurring"></DropDown>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="my-3">
          <CardWithTitle title="Preferred Due Date">
            <div className="p-3">
              <div className="flex align-items-center ">
                <div className="col-4">
                  <DropDown title="Choose how the preferred due day will be determined:"></DropDown>
                </div>
                <div className=" col-4 mt-3">
                  <Input title="" placeholder="Enter No.of Days"></Input>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Clubs">
            <div className="p-3">
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
        <div className="mt-3">
          <CardWithTitle title="Payment Plans">
            <div className="p-3">
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
        <div className="flex justify-content-end mt-3 ">
          <div className="flex justify-content-end ">
            <div className="flex  p-2">
              <div className="mx-4">
                <Buttons label="Save" className="btn-dark mx-3 border-none " />
              </div>
              <div className="">
                <Buttons
                  onClick={onClickAddFees}
                  label="Cancel"
                  className="btn-grey  border-none "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAssessedFee;
