import React from "react";
import DropDown from "../../../../../../components/dropdown/dropdown";
import CardWithTitle from "../../../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../../../components/input/input";
import Buttons from "../../../../../../components/buttons/button";
import RecentCheckIn from "../../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../../utils/checkInData";
import Divide from "../../../../../../assets/icons/box.png";

const Bonus = () => {
  return (
    <>
      <div className="col-2 mb-2">
        <DropDown title="Similar To"></DropDown>
      </div>
      <div>
        <CardWithTitle title="Bonus">
          <div className="col-12 p-3 flex">
            <div className="col">
              <DropDown title="" placeholder="Bonus Type"></DropDown>
            </div>
            <div className="col">
              <DropDown title="" placeholder="Select Days"></DropDown>
            </div>
            <span className="mt-3 p-2"> </span>

            <div className="col-2">
              <Input title=""></Input>
              <span className="text-xs text-gray-200 p-2 flex justify-content-end ">
                Select Timeframe
              </span>
            </div>

            <div className="col">
              <DropDown title=""></DropDown>
            </div>
            <div className="col-3 md:col-2">
              <Input title=""></Input>
              <span className="text-xs text-gray-200 p-2 flex justify-content-center">
                Bonus Amount
              </span>
            </div>

            <div
              style={{ width: "18px", height: "20px" }}
              className="flex align-items-center mt-4   mx-2 "
            >
              <span className="m-auto ">$</span>
              <img src={Divide} alt="" className="m-auto mx-2  " />
            </div>
            <div className="col ml-2">
              <DropDown title="" placeholder="Selected Services"></DropDown>
            </div>
          </div>
          <div className="col-12 p-3 flex">
            <div className="col">
              <DropDown title="" placeholder="Bonus Type"></DropDown>
            </div>
            <div className="col">
              <Input title="" placeholder="Select Days"></Input>
            </div>
            <span className="mt-3 p-2 text-gray-300">Over</span>

            <div className="col-2">
              <Input title=""></Input>
              <span className="text-xs text-gray-200 p-2 flex justify-content-end ">
                Select Timeframe
              </span>
            </div>

            <div className="col">
              <DropDown title=""></DropDown>
            </div>
            <div className="col-2">
              <Input title=""></Input>
              <span className="text-xs text-gray-200 p-2 flex justify-content-center">
                Bonus Amount
              </span>
            </div>

            <div
              style={{ width: "18px", height: "20px" }}
              className="flex align-items-center mt-4   mx-2 "
            >
              <span className="m-auto ">$</span>
              <img src={Divide} alt="" className="m-auto mx-2  " />
            </div>
            <div className="col ml-2">
              <DropDown title="" placeholder="Selected Services"></DropDown>
            </div>
          </div>
          <div className="col-12 p-3 flex">
            <div className="col">
              <DropDown title="" placeholder="Service Value"></DropDown>
            </div>
            <div className="col">
              <Input title="" placeholder="2,000s"></Input>
              <span className="text-xs text-gray-200 p-2 flex justify-content-end ">
                Sessions Value
              </span>
            </div>
            <span className="mt-3 p-2 text-gray-300">Over</span>

            <div className="col-2">
              <Input title="" placeholder="30"></Input>
              <span className="text-xs text-gray-200 p-2 flex justify-content-end ">
                Select Timeframe
              </span>
            </div>

            <div className="col">
              <DropDown title="" placeholder="Days"></DropDown>
            </div>
            <div className="col-2">
              <Input title="" placeholder="5"></Input>
              <span className="text-xs text-gray-200 p-2 flex justify-content-center">
                Bonus Amount
              </span>
            </div>

            <div
              style={{ width: "18px", height: "20px" }}
              className="flex align-items-center mt-4   mx-2 "
            >
              <span className="m-auto ">$</span>
              <img src={Divide} alt="" className="m-auto mx-2  " />
            </div>
            <div className="col ml-2">
              <DropDown title="" placeholder="Select Services"></DropDown>
            </div>
          </div>
        </CardWithTitle>
      </div>
      <div className="flex justify-content-end p-2 ">
        <div className=" mt-3 flex  ">
          <div className=" mx-3">
            <Buttons
              label="Add"
              icon="pi pi-plus-circle"
              className="btn-dark  border-none"
            ></Buttons>
          </div>
          <div className="">
            <Buttons
              label="Save"
              className="btn-dark mx-3 border-none"
            ></Buttons>
          </div>
          <div className="mx-4 ">
            <Buttons label="Cancel" className="btn-grey  border-none"></Buttons>
          </div>
        </div>
      </div>
      <div>
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};

export default Bonus;
