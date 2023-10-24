import React from "react";
import { Dropdown } from "primereact/dropdown";

const DropDown = ({
  id,
  value,
  optionLabel = "",
  options,
  placeholder,
  title,
  required,
  onChange,
  name,
  filter = false,
  state,
  childState,
  disabled,
}) => {
  // console.log("childsss",childState,state?.formErrors?.[name.split("|")[1]]?.[name.split("|")[0]])
  return (
    <div className="flex flex-column gap-2">
      <label className="text-xs text-dark-gray font-semibold">
        {title} {required ? <span className="text-red-500">*</span> : null}
      </label>
      <Dropdown
        id={id}
        value={value}
        disabled={disabled}
        options={options}
        onChange={(e) =>
          onChange &&
          onChange({
            ...e,
            name: e.target.name,
            value: e.target.value,
            index: id,
          })
        }
        optionLabel={optionLabel}
        placeholder={placeholder}
        name={name}
        filter={filter}
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
    </div>
  );
};

export default DropDown;
