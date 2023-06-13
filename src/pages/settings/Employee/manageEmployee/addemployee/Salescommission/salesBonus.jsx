import React from "react";
import Buttons from "../../../../../../components/buttons/button";
import RecentCheckIn from "../../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../../utils/checkInData";
import DropDown from "../../../../../../components/dropdown/dropdown";
import Input from "../../../../../../components/input/input";
import CardWithTitle from "../../../../../../components/cards/cardWithTitle/cardWithTitle";
import Divide from "../../../../../../assets/icons/box.png";

const SalesBonus = () => {
  return (
    <>
      <div className="col-2 mb-2">
        <DropDown title="Similar To"></DropDown>
      </div>
      <div>
        <CardWithTitle title="Bonus">
          <div className="col-12 p-5 py-2 flex">
            <div className="col">
              <DropDown title="" placeholder="Single Client"></DropDown>
            </div>
            <div className="col">
              <DropDown title="" placeholder="Single Item"></DropDown>
            </div>

            <div className="col-2">
              <Input title="" placeholder="6"></Input>
              <span className="text-xs text-gray-200 p-2 flex justify-content-center ">
                # of Items
              </span>
            </div>
            <span className="mt-3 p-2 text-gray-200">Over</span>

            <div className="col-2">
              <Input title="" placeholder="6"></Input>
              <span className="text-xs text-gray-200 p-2 flex justify-content-start">
                SelectTimeframe
              </span>
            </div>
            <div className="col">
              <DropDown title="" placeholder="Months"></DropDown>
            </div>

            <div className="col-2 ml-2">
              <Input title="" placeholder="2.5"></Input>
              <span className="text-xs text-gray-200 p-2 flex justify-content-center">
                Bonus Amount
              </span>
            </div>
            <div
              style={{ width: "18px", height: "20px" }}
              className="flex align-items-center mt-4   mr-2 "
            >
              <span className="m-auto ">$</span>
              <img src={Divide} alt="" className="m-auto mx-2  " />
            </div>
          </div>
          <hr className="hrtagstyle" />
          <div className="col-12 p-5 py-2 flex">
            <div className="col">
              <DropDown title="" placeholder="Single Client"></DropDown>
            </div>
            <div className="col">
              <DropDown title="" placeholder="Single Item"></DropDown>
            </div>

            <div className="col-2">
              <Input title="" placeholder="6"></Input>
              <span className="text-xs text-gray-200 p-2 flex justify-content-center ">
                # of Items
              </span>
            </div>
            <span className="mt-3 p-2 text-gray-200">Over</span>

            <div className="col-2">
              <Input title="" placeholder="6"></Input>
              <span className="text-xs text-gray-200 p-2 flex justify-content-Start">
                Select Timeframe
              </span>
            </div>
            <div className="col">
              <DropDown title="" placeholder="Months"></DropDown>
            </div>

            <div className="col-2 ml-2">
              <Input title="" placeholder="2.5"></Input>
              <span className="text-xs text-gray-200 p-2 flex justify-content-center">
                Bonus Amount
              </span>
            </div>
            <div
              style={{ width: "18px", height: "20px" }}
              className="flex align-items-center mt-4   mr-2 "
            >
              <span className="m-auto ">$</span>
              <img src={Divide} alt="" className="m-auto mx-2  " />
            </div>
          </div>
        </CardWithTitle>
      </div>
      <div className="flex justify-content-end p-2 ">
        <div className=" mt-3 flex  ">
          <div className="mx-2">
            <Buttons
              label="Add"
              icon="pi pi-plus-circle"
              className="btn-dark border-none"
            ></Buttons>
          </div>
          <div className="mr-4">
            <Buttons
              label="Save"
              className="btn-dark mx-3 border-none"
            ></Buttons>
          </div>
          <div className=" ">
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
export default SalesBonus;
