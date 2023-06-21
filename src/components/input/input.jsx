import React from "react";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

const Input = ({
  title,
  title1,
  placeholder,
  type,
  icon,
  onChange,
  error,
  value,
  required,
  iconPos,
  inputType,
  style,
  maxLength,
  pattern,
  ...props
}) => {
  // const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-column gap-2">
      <label className="text-xs text-dark-gray flex justify-content-between  font-semibold">
        <div>
          {title} {required ? <span className="text-red-500">*</span> : null}
        </div>
        <div>{title1}</div>
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
          maxLength={maxLength}
          onChange={onChange}
        ></InputText>
        {/* {inputType === "password" ? (
          <span className="pp-input-icon-right text-xs input100">
            <i
              onClick={() => {
                setShowPassword((perv) => !perv);
                console.log("hi");
              }}
              className={
                !showPassword
                  ? `pi cursor-pointer text-xs pi-eye-slash`
                  : "pi cursor-pointer text-xs pi-eye"
              }
            />
          </span>
        ) : (
          ""
        )} */}
      </span>
    </div>
  );
};

export default Input;
