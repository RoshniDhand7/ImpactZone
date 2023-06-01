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
  iconPos,
  ...props
}) => {
  return (
    <div className="flex flex-column gap-2">
      <label className="text-xs text-dark-gray   font-semibold">
        {title} {required ? <span className="text-red-500">*</span> : null}
      </label>
      <span
        style={{ width: "100%", display: "inline-block" }}
        className={"p-input-icon-right"}
      >
        <i className={icon} />
        <InputText
          style={{ width: "100%" }}
          placeholder={placeholder}
          icon={icon}
          type={type}
          value={value}
          onChange={onChange}
        ></InputText>
      </span>
    </div>
  );
};

export default Input;
