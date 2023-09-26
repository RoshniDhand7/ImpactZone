import React from "react";
import { MultiSelect } from "primereact/multiselect";

const MuliSelectDropDown = ({
  id,
  key,
  title,
  value,
  options,
  onChange,
  optionsLabel = "",
  placeholder,
  optionGroupTemplate,
  required,
  name,
}) => {
  return (
    <div className="flex flex-column gap-2">
      <label className="text-xs text-dark-gray font-semibold">
        {title} {required ? <span className="text-red-500">*</span> : null}
      </label>
      <MultiSelect
        style={{ height: "40px" }}
        id={id}
        key={key}
        name={name}
        title={title}
        value={value}
        options={options}
        onChange={(e) =>
          onChange({
            ...e,
            name: e.target.name,
            value: e.target.value,
            index: id,
          })
        }
        optionLabel={optionsLabel}
        optionGroupTemplate={optionGroupTemplate}
        placeholder={placeholder}
        display="chip"
        optionDisabled="disabled"
        className="w-full"
      />
    </div>
  );
};

export default MuliSelectDropDown;
