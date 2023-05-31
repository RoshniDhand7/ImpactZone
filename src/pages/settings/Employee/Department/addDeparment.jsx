import React from "react";
import Input from "../../../../components/input/input";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Buttons from "../../../../components/buttons/button";
import DropDown from "../../../../components/dropdown/dropdown";

const AddDeparment = () => {
  return (
    <>
      <div className="">
        <CardWithTitle title="General">
          <div className="p-2 flex">
            <div className="col">
              <Input title="SalesPerson Online" placeholder=""></Input>
            </div>
            <div className="col">
              <DropDown title="Show in Calendar" placeholder="No"></DropDown>
            </div>
            <div className="col">
              <DropDown title="Visible Online" placeholder="No"></DropDown>
            </div>
          </div>
          <div className="col-12 flex">
            <div className="col-4">
              <DropDown title="SalesPersonOnline" placeholder="No"></DropDown>
            </div>
            <div className="col-4">
              <Input title="Department Code" placeholder=""></Input>
            </div>
          </div>
        </CardWithTitle>
      </div>

      <div>
        <CardWithTitle title="Add Employee">
          <div className=" p-4 btn-lightest-blue">
            <div className="ml-4 mb-2">
              <span className="text-sm ">Name</span>
            </div>

            <div className="bg-white col-12 border-round-md ">
              <div
                className="flex justify-content-between align-items-center "
                style={{ height: "190px" }}
              >
                <div className="">
                  <span className=""></span>
                </div>
                <div className="flex align-content-center justify-content-center">
                  <div className="text-xs font-semibold">None Found</div>
                </div>
                <div className="col-2 ">
                  <div className="col">
                    <Buttons
                      label="Add"
                      className="btn-dark border-none p-3 "
                    ></Buttons>
                  </div>

                  <div className="col">
                    <Buttons
                      label="RemoveAll"
                      className="btn-dark border-none p-3"
                    ></Buttons>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardWithTitle>
      </div>
      <div className=" flex justify-content-end">
        <div className="col-2">
          <Buttons label="Save" className="btn-dark p-3 border-none"></Buttons>
        </div>
        <div className="col-2">
          <Buttons
            label="Cancel"
            className="btn-grey p-3 border-none"
          ></Buttons>
        </div>
      </div>
    </>
  );
};

export default AddDeparment;
