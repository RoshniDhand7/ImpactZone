import React from "react";
import { InputTextarea } from "primereact/inputtextarea";

export default function CustomTextarea({
  onChange,
  value,
  rows,
  cols,
  classNames,
  style,
  label,
  name
}) {
  return (
    <div className="card flex justify-content-center ">
      <div className="flex flex-column w-full gap-2">
        <label
          htmlFor=""
          className="text-xs text-dark-gray flex justify-content-between  font-semibold"
        >
          {label}
        </label>
        <InputTextarea
          style={style}
          className={classNames}
          name={name}
          value={value}
          onChange={(e)=>onChange({name:e.target.name,value:e.target.value})}
          rows={rows}
          cols={cols}
        />
      </div>
    </div>
  );
}
