import React from "react";
import Checkbox from "../../../../components/checkbox/checkbox";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../components/input/input";
import DropDown from "../../../../components/dropdown/dropdown";
import greenplus from "../../../../assets/icons/greenplus.png";
import greenminus from "../../../../assets/icons/greenminus.png";
import Buttons from "../../../../components/buttons/button";

const AddAgreementCategories = ({ onClickChangePage }) => {
  return (
    <>
      <div>
        <div className="my-4">
          <Checkbox title="Active"></Checkbox>
        </div>
        <div>
          <CardWithTitle title="Add Agreement Category ">
            <div className="p-3">
              <div className="flex">
                <div className="col-4">
                  <Input title="Name" placeholder="Traning"></Input>
                </div>
                <div className="col-4">
                  <DropDown title="Plan Type" placeholder="Select"></DropDown>
                </div>
              </div>
              <div className="flex align-items-center ">
                <div className="col-4 mt-3 ">
                  <Input title="Subcategory"></Input>
                </div>
                <div className="mt-5" style={{ width: "25px", height: "25px" }}>
                  <img src={greenplus} alt="" />
                </div>
              </div>
              <div className="flex align-items-center ">
                <div className="col-4 mt-3 ">
                  <Input title="Subcategory"></Input>
                </div>
                <div className="mt-5" style={{ width: "25px", height: "25px" }}>
                  <img src={greenminus} alt="" />
                </div>
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
                  onClick={onClickChangePage}
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

export default AddAgreementCategories;
