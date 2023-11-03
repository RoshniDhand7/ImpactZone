import React from "react";
import { InputNumber } from "primereact/inputnumber";

const CustomInputNumber = ({
  id,
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
  extraclassName,
  width,
  mode,
  minFractionDigits,
  disabled = false,
  onKeyDown,
  name,
  state,
  childState,
}) => {
  return (
    <div className={`flex flex-column gap-2 ${extraclassName}`}>
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
        <InputNumber
          id={id}
          style={{ width: "100%" }}
          name={name}
          value={value}
          onChange={(e) =>
            onChange && onChange({ ...e, name: name, value: e.value })
          }
          useGrouping={false}
          disabled={disabled}
        />
        {childState ? (
          <div className="text-danger" style={{ color: "red" }}>
            {state?.formErrors?.[name.split("|")[1]]?.[name.split("|")[0]]}
          </div>
        ) : (
          <div className="text-danger" style={{ color: "red" }}>
            {state?.formErrors?.[name]}
          </div>
        )}
      </span>
    </div>
  );
};

export default CustomInputNumber;
