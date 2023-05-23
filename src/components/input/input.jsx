import React from "react";
import { InputText } from "primereact/inputtext";

const Input = ({
  title,
  placeholder,
  type,
  icon,
  onChange,
  error,
  ...props
}) => {
  return (
    <div className="flex flex-column gap-2">
      <label className="text-xs text-dark-gray   font-semibold">{title}</label>
      {/* <span className="p-input-icon-left">
        <i className="pi pi-search" /> */}
      <InputText
        placeholder={placeholder}
        icon={icon}
        type={type}
        onChange={onChange}
      ></InputText>
      {/* </span> */}
    </div>
  );
};

export default Input;
