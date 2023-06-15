import React from "react";
import Buttons from "../../components/buttons/button";
import { Card } from "../../components/cards/card";
import Checkbox from "../../components/checkbox/checkbox";
import Arrowdown from "../../assets/icons/arrowdown.png";

const mytask = () => {
  return (
    <>
      <div>
        <div className=" flex justify-content-between text-base mr-3">
          <div className="col pl-0">
            <Buttons
              label="All"
              className=" shadow-2 pr-4 btn-lightblue text-base  "
              style={{ height: "40px" }}
            ></Buttons>
          </div>

          <div className="col">
            <Buttons
              label="To-DO"
              className=" shadow-2 mx-2 btn-lightblue text-base"
              style={{ height: "40px" }}
            ></Buttons>
          </div>
          <div className="col">
            <Buttons
              label="Calls"
              className=" shadow-2 btn-lightblue text-base"
              style={{ height: "40px" }}
            ></Buttons>
          </div>
          <div className="col">
            <Buttons
              label="Email"
              className=" shadow-2 mx-2 btn-lightblue text-base"
              style={{ height: "40px" }}
            ></Buttons>
          </div>
          <div className="col pr-0">
            <Buttons
              label="Member Followup"
              className=" shadow-2 btn-lightblue text-base"
              style={{ height: "40px" }}
            ></Buttons>
          </div>
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
        <div className="flex justify-content-end mt-3 p-2">
          <div className="">
            <Buttons
              icon="pi pi-plus-circle"
              label="Add New Task  "
              className="btn-dark border-none"
              style={{ height: "40px" }}
            ></Buttons>
          </div>
        </div>
      </div>
    </>
  );
};

export default mytask;
