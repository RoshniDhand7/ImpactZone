import React from 'react';

const Checkbox = ({
  label,
  className,
  value,
  onChange,
  name,
  data,
  id = 'defaultId',
}) => {
  return (
    <div className="form-check border-gray-100 custome-checkbox ">
      <input
        className="form-check-input hidden"
        type="checkbox"
        checked={value || data?.[name]}
        name={name}
        onChange={(e) =>
          onChange &&
          onChange({ ...e, name: e.target.name, value: e.target.checked })
        }
        id={id}
      />
      <label
        className={`text-xs text-dark-gray flex justify-content-between font-semibold ${className}`}
        htmlFor={id}
      >
        <span className="mr-2">
          <i className="pi pi-stop unchecked"></i>
          <i className="pi pi-check-square checked"></i>
        </span>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
