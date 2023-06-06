import React from "react";
import { Dropdown } from "primereact/dropdown";

const DropDown = ({
  value,
  optionLabel,
  options,
  placeholder,
  title,
  required,
  onChange,
}) => {
  return (
    <div className="flex flex-column gap-2">
      <label className="text-xs text-dark-gray font-semibold">
        {title} {required ? <span className="text-red-500">*</span> : null}
      </label>
      <Dropdown
        value={value}
        options={options}
        onChange={onChange}
        optionLabel={optionLabel}
        placeholder={placeholder}
      />
    </div>
  );
};

export default DropDown;
