import React from "react";

const Checkbox = ({ title, className }) => {
  return (
    <div className="form-check border-gray-100  ">
      <input
        className="form-check-input  "
        type="checkbox"
        value=""
        id="flexCheckDefault"
      />
      <label
        className={"form-check-label lightgrey mx-2 " + className}
        htmlFor="flexCheckDefault"
      >
        {title}
      </label>
    </div>
  );
};

export default Checkbox;
