import React from "react";
import Input from "../../components/input/input";
import { InputTextarea } from "primereact/inputtextarea";
import Buttons from "../../components/buttons/button";

const EmployeeClockIn = () => {
  return (
    <>
      <div className="flex justify-content-between">
        <div className="flex flex-column">
          <div>Date/time</div>
          <div className="text-sm text-gray-300 my-3">04/11/2023 08:20 PM</div>
        </div>
        <div className=" flex align-items-center">
          <div>
            <Input title="Barcode" />
          </div>
          <div className="ml-3 mt-2">
            <button className="bg-white  px-4 p-2 cursor-pointer mt-3  border-round  text-gray-300">
              Find
            </button>
          </div>
        </div>
      </div>
      <div className="my-4">
        <span className="text-base text-900 font-bold">Employee</span>
        <div className="flex justify-content-between my-3 w-9">
          <span>Name</span>
          <span>....</span>
          <span>Status</span>
          <span>......</span>
        </div>
      </div>
      <div className="flex-column  flex justify-content-center">
        <label className="gap-2">comment</label>
        <InputTextarea
          autoResize
          //   value={comment}
          //   onChange={(e) => setValue(e.target.value)}
          rows={5}
          cols={30}
        />
      </div>
      <div className="my-4">
        <span className="text-base text-900 font-bold">Alert</span>
        <div className="flex justify-content-between text-sm my-3 w-9">
          <span>Text</span>
          <div className="flex justify-content-around">
            <div>Creation</div>
            <div className="mx-5">Modification</div>
          </div>
        </div>
      </div>
      <div className="text-Show flex justify-content-center align-items-center">
        <h4 className="text-900 text-xs">No Rows to Show</h4>
      </div>
      <div className="flex justify-content-end mt-3">
        <div className="flex justify-content-between">
          <div className="">
            <Buttons
              label="Clock In"
              className=" p-3 btn-dark border-none"
            ></Buttons>
          </div>
          <div className=" mx-2 ">
            <Buttons
              label="Clock Out"
              className=" p-3 btn-dark  border-none  "
            ></Buttons>
          </div>
          <div className=" ">
            <Buttons
              label="Cancel"
              className=" p-3 btn-grey border-none"
            ></Buttons>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeClockIn;
