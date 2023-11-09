import React from "react";
import Buttons from "../../../../../components/buttons/button";
import DropDown from "../../../../../components/dropdown/dropdown";
import CardWithTitle from "../../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../../components/input/input";
import CustomTextarea from "../../../../../components/input/InputTextArea";

const Tracking = ({ openaddcatalogtab }) => {
  return (
    <>
      <div>
        <div>
          <CardWithTitle title="General">
            <div className="p-3">
              <div className="flex  ">
                <div className="col-4">
                  <DropDown
                    title="Require Commissions"
                    name=""
                    placeholder="No"
                    options={["Yes", "No"]}
                  ></DropDown>
                </div>
                <div className="col-4">
                  <DropDown
                    title="Commission Group"
                    name=""
                    placeholder="Select"
                    options={["Yes", "No"]}
                  ></DropDown>
                </div>
                <div className="col-4">
                  <DropDown
                    title="Referral Group"
                    name=""
                    placeholder="Select"
                    options={["Yes", "No"]}
                  ></DropDown>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="my-3">
          <CardWithTitle title="Details ">
            <div className="p-3">
              <div className="flex  ">
                <div className="col-4">
                  <DropDown
                    title="Member Required"
                    name="Member Required"
                    placeholder="Type"
                    options={["Yes", "No"]}
                  ></DropDown>
                </div>
                <div className="col-4 ">
                  <Input title="Case Quantity" name="name"></Input>
                </div>
                <div className="col-4 ">
                  <Input title="Size" name="name"></Input>
                </div>
              </div>
              <div className="flex ">
                <div className="col-4 ">
                  <Input title="Color" name="name"></Input>
                </div>
                <div className="col-4 ">
                  <DropDown
                    title="Vendor"
                    placeholder="Select one"
                    options={["Yes", "No"]}
                  ></DropDown>
                </div>
                <div className="col-4 ">
                  <Input title="Minimum Quantity" name="name"></Input>
                </div>
              </div>
              <div className="flex ">
                <div className="col-4 ">
                  <Input title="Maximum Quality" name="name"></Input>
                </div>
                <div className="col-4 ">
                  <Input title="Reorder Level" name="name"></Input>
                </div>
                <div className="col-4 ">
                  <Input title="Wholesale Cost" name="name"></Input>
                </div>
              </div>
              <div className="flex  ">
                <div className="col-4 ">
                  <DropDown
                    title="Alternate Vendor"
                    placeholder="Select one"
                    options={["Yes", "No"]}
                  ></DropDown>
                </div>
                <div className="col-4 ">
                  <div className="flex flex-column mt-3">
                    <small className="text-dark-gray font-semibold mb-2 pt-1">
                      Date Created
                    </small>
                    <span className="text-xs text-gray-300">01/31/2022</span>
                  </div>
                </div>
              </div>
              <div className="flex  ">
                <div className="col-12 relative">
                  <CustomTextarea label={"Note"}></CustomTextarea>
                  <small className="text-xs font-semibold text-dark-gray absolute top-0 px-5 pt-2">
                    (122/122)
                  </small>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className=" m-2 mt-3 flex justify-content-end">
          <div className="mx-4">
            <Buttons
              label="Save"
              className="btn-dark  mx-3  border-none"
            ></Buttons>
          </div>
          <div className="">
            <Buttons
              onClick={() => openaddcatalogtab()}
              label="Cancel"
              className="btn-grey   border-none"
            ></Buttons>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tracking;
