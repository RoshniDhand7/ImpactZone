import React from "react";
import Input from "../../components/input/input";
import DropDown from "../../components/dropdown/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Buttons from "../../components/buttons/button";

const addTask = () => {
  return (
    <>
      <div>
        <div className="flex">
          <div className="col">
            <Input title="Deadline" type={"date"} placeholder=""></Input>
          </div>
          <div className="col">
            <DropDown title="Task Type" placeholder="No"></DropDown>
          </div>
        </div>
        <div className="flex">
          <div className="col">
            <DropDown title="Assign To" placeholder="No"></DropDown>
          </div>
          <div className="col">
            <Input title="Task Title" placeholder=""></Input>
          </div>
        </div>
        <div className="col-12 flex">
          <div className=" flex flex-column gap-2" style={{ width: "100%" }}>
            <label className="text-xs text-dark-gray   font-semibold">
              Message
            </label>

            <InputTextarea placeholder="Type here"></InputTextarea>
          </div>
        </div>
        <div className="flex justify-content-end">
          <div className="flex  ">
            <div className="mx-4 ">
              <Buttons label="Save" className="btn-dark mx-3"></Buttons>
            </div>
          </div>
          <div>
            <div className=" ">
              <Buttons label="Cancel" className="bg-grey"></Buttons>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default addTask;
