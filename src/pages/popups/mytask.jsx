import React from "react";
import Buttons from "../../components/buttons/button";
import { Card } from "../../components/cards/card";
import Checkbox from "../../components/checkbox/checkbox";
import Arrowdown from "../../assets/icons/arrowdown.png";

const mytask = () => {
  return (
    <>
      <div>
        <div className=" flex justify-content-betweem text-base ">
          <Buttons
            label="All"
            className=" shadow-2 btn-lightblue text-base  "
          ></Buttons>
          <Buttons
            label="To-DO"
            className=" shadow-2 mx-2 btn-lightblue text-base"
          ></Buttons>
          <Buttons
            label="Calls"
            className=" shadow-2 btn-lightblue text-base"
          ></Buttons>
          <Buttons
            label="Email"
            className=" shadow-2 mx-2 btn-lightblue text-base"
          ></Buttons>
          <Buttons
            label="Member Followup"
            className=" shadow-2 btn-lightblue text-base"
          ></Buttons>
        </div>
        <div className="mt-4 flex flex-column justify-content-between">
          <Card>
            <div className="flex justify-content-between my-3 text-sm">
              <Checkbox
                title="March-12-2023 - Add Inventory"
                className="opacity-50"
              ></Checkbox>
              <span className="" style={{ width: "8.25px", height: "7.50px" }}>
                <img src={Arrowdown} alt="" />
              </span>
            </div>
            <div>
              <hr className="opacity-20"></hr>
            </div>
            <div className="flex justify-content-between my-3 text-sm ">
              <Checkbox
                title="March-12-2023 - Add Inventory"
                className="opacity-50"
              ></Checkbox>
              <span className="" style={{ width: "8.25px", height: "7.50px" }}>
                <img src={Arrowdown} alt="" />
              </span>
            </div>
            <div>
              <hr className="opacity-20"></hr>
            </div>
            <div className="flex justify-content-between my-3 text-sm">
              <Checkbox
                title="March-12-2023 - Add Inventory"
                className="opacity-50"
              ></Checkbox>
              <span className="" style={{ width: "8.25px", height: "7.50px" }}>
                <img src={Arrowdown} alt="" />
              </span>
            </div>
            <div>
              <hr className="opacity-20"></hr>
            </div>
            <div className="flex justify-content-between my-3 text-sm">
              <Checkbox
                title="March-12-2023 - Add Inventory"
                className="opacity-50"
              ></Checkbox>
              <span className="" style={{ width: "8.25px", height: "7.50px" }}>
                <img src={Arrowdown} alt="" />
              </span>
            </div>
          </Card>
        </div>
        <div></div>
        <div className="flex justify-content-end">
          <div className="">
            <Buttons
              icon="pi pi-plus-circle"
              label="Add New Task  "
              className="btn-dark p-3 mx-2 border-none"
            ></Buttons>
          </div>
        </div>
      </div>
    </>
  );
};

export default mytask;
