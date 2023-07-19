import React from "react";
import { MultiSelect } from "primereact/multiselect";

const MuliSelectDropDown = ({
  value,
  options,
  onChange,
  optionLabel,
  placeholder,
  optionGroupTemplate,
}) => {
  return (
    <div className="">
      <MultiSelect
        value={value}
        options={options}
        onChange={onChange}
        optionLabel={optionLabel}
        // optionGroupLabel="label"
        // optionGroupChildren="items"
        optionGroupTemplate={optionGroupTemplate}
        placeholder={placeholder}
        display="chip"
        className="w-full md:w-20rem"
      />
    </div>
  );
};

export default MuliSelectDropDown;
