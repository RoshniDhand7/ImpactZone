import React from "react";
import Checkbox from "../../../../components/checkbox/checkbox";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../components/input/input";
import DropDown from "../../../../components/dropdown/dropdown";
import percentagebox from "../../../../assets/icons/box.png";
import Buttons from "../../../../components/buttons/button";

const AddAgreementPromotions = ({ onClickChangePage }) => {
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
                  <Input title="Code" placeholder=""></Input>
                </div>
                <div className="col-4">
                  <DropDown title="Name" placeholder=""></DropDown>
                </div>
                <div className="col-4">
                  <DropDown
                    title="Start Date"
                    type="date"
                    placeholder=""
                  ></DropDown>
                </div>
              </div>
              <div className="flex align-items-center ">
                <div className="col-4 mt-3 ">
                  <Input title="End Date" type="date"></Input>
                </div>
                <div className="col-4 mt-3 ">
                  <Input title="Uses"></Input>
                </div>

                <div className="col-4 mt-3 ">
                  <DropDown
                    title="Promotions Type"
                    placeholder="% off down Payment"
                    type="date"
                  ></DropDown>
                </div>
              </div>
              <div className="flex align-items-center ">
                <div className="col-4 mt-3 ">
                  <Input title="Amount"></Input>
                </div>
                <div className="mt-5" style={{ width: "18px", height: "20px" }}>
                  $
                </div>
                <div className="mt-5" style={{ width: "18px", height: "20px" }}>
                  <img src={percentagebox} alt="" />
                </div>
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
                onClick={onClickChangePage}
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

export default AddAgreementPromotions;
