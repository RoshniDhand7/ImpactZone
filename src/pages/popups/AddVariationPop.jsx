import React from "react";
import Buttons from "../../components/buttons/button";
import Input from "../../components/input/input";

const AddVariationPop = () => {
  return (
    <div className="flex flex-column justify-content-center mt-3">
      <div className="flex justify-content-center mx-2 mr-3">
        <Input
          title={"Variation Name"}
          extraclassName={"lg:col-12 col-6 "}
        ></Input>
      </div>
      <div className="flex justify-content-center align-items-center mx-2 ">
        <Input
          title={"Sub Variation 1 Name"}
          extraclassName={"lg:col-12 col-6 ml-3"}
          icon={"pi pi-minus-circle "}
        ></Input>
        <i className="pi pi-plus-circle mt-3"></i>
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

export default AddVariationPop;
