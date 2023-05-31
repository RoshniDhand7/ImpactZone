import React from "react";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";

const DropDown = ({ value, optionLabel, placeholder, title, required }) => {
  const [countries, setSelectedCountry] = useState();
  // const citySelectItems = [
  //   { label: "New York", value: "NY" },
  //   { label: "Rome", value: "RM" },
  //   { label: "London", value: "LDN" },
  //   { label: "Istanbul", value: "IST" },
  //   { label: "Paris", value: "PRS" },
  // ];

  return (
    <div className="flex flex-column gap-2">
      <label className="text-xs text-dark-gray font-semibold">
        {title} {required ? <span className="text-red-500">*</span> : null}
      </label>
      <Dropdown
        value={value}
        options={countries}
        onChange={(e) => setSelectedCountry(e.value)}
        optionLabel={optionLabel}
        placeholder={placeholder}
      />
    </div>
  );
};

export default DropDown;
