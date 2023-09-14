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
  name,
  filter = false,
}) => {
  return (
    <div className="flex flex-column gap-2">
      <label className="text-xs text-dark-gray font-semibold">
        {title} {required ? <span className="text-red-500">*</span> : null}
      </label>
      <Dropdown
        value={value}
        options={options}
        onChange={(e) =>
          onChange &&
          onChange({ ...e, name: e.target.name, value: e.target.value })
        }
        optionLabel={optionLabel}
        placeholder={placeholder}
        name={name}
        filter={filter}
      />
    </div>
  );
};

export default DropDown;
