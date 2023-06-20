import React from "react";

const Checkbox = ({ title, className, value, onclick }) => {
  console.log(value, "checkbox");
  return (
    <div className="form-check border-gray-100 custome-checkbox ">
      <input
        className="form-check-input hidden"
        type="checkbox"
        checked={value}
        onClick={onclick}
        id="flexCheckDefault"
      />
      <label
        className={"form-check-label lightgrey mr-2  text-center " + className}
        htmlFor="flexCheckDefault"
      >
        <span className="mr-2">
          <i className="pi pi-stop unchecked"></i>
          <i className="pi pi-check-square checked"></i>
        </span>
        {title}
      </label>
    </div>
  );
};

export default Checkbox;
