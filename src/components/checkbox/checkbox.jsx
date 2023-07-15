import React from "react";

const Checkbox = ({ title, className, value, onclick, id = "defaultId" }) => {
  console.log(id, "checkbox");
  return (
    <div className="form-check border-gray-100 custome-checkbox ">
      <input
        className="form-check-input hidden"
        type="checkbox"
        checked={value}
        onClick={onclick}
        id={id}
      />
      <label
        className={"form-check-label lightgrey mr-2  text-center " + className}
        htmlFor={id}
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
