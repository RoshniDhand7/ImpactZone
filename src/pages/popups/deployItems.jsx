import React from "react";
import Buttons from "../../components/buttons/button";
import DropDown from "../../components/dropdown/dropdown";

const deployItems = () => {
  return (
    <div className="flex flex-column justify-content-center mt-3">
      <div className="mr-3">
        <div className="flex justify-content-center">
          <Buttons label="Member" className="" extraClass="col"></Buttons>
          <Buttons label="Membership Type" extraClass=" col"></Buttons>
        </div>
      </div>
      <div className="flex justify-content-center mx-2">
        <DropDown title={"Member"} extraClass={"lg:col-12 col-6 "}></DropDown>
      </div>
      <div className="mr-3">
        <div className="flex  col-12 p-0 ">
          <Buttons label="Save" className="btn-dark" extraClass="col"></Buttons>
          <Buttons
            label="Cancel"
            className="btn-grey "
            extraClass="col"
          ></Buttons>
        </div>
      </div>
    </div>
  );
};
export default deployItems;
