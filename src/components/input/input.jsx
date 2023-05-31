import React from "react";
import { InputText } from "primereact/inputtext";

const Input = ({
  title,
  placeholder,
  type,
  icon,
  onChange,
  error,
  value,
  required,
  ...props
}) => {
  return (
    <div className="flex flex-column gap-2">
      <label className="text-xs text-dark-gray   font-semibold">
        {title} {required ? <span className="text-red-500">*</span> : null}
      </label>
      {/* <span className="p-input-icon-left">
        <i className="pi pi-search" /> */}
      <InputText
        placeholder={placeholder}
        icon={icon}
        type={type}
        value={value}
        onChange={onChange}
      ></InputText>
      {/* </span> */}
    </div>
  );
};

export default Input;
