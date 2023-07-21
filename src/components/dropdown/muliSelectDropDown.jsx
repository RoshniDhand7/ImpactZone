import React from "react";
import { MultiSelect } from "primereact/multiselect";

const MuliSelectDropDown = ({
  key,
  title,
  value,
  options,
  onChange,
  optionsLabel,
  placeholder,
  optionGroupTemplate,
}) => {
  return (
    <div className="">
      <MultiSelect
        key={key}
        title={title}
        value={value}
        options={options}
        onChange={onChange}
        optionLabel={optionsLabel}
        // optionGroupLabel={optionsLabel}
        // optionGroupChildren="items"
        optionGroupTemplate={optionGroupTemplate}
        placeholder={placeholder}
        display="chip"
        className="w-full"
      />
    </div>
  );
};

export default MuliSelectDropDown;
