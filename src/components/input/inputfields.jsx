import React, { useState } from "react";
import { InputText } from "primereact/inputtext";

const InputPassword = ({
  iconName,
  inputType,
  placeholder,
  title,
  id,
  value,
  onChange,
  inputMode,
  pattern,
  mask,
  dateformat,
  slotchar,
  disabled,
  maxLength,
  style,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-column gap-2">
      <label className="text-sm  font-semibold font-normal black">
        {title}
      </label>
      <span className="p-input-icon-left text-xs input100">
        <i className={` text-xs pi ${iconName}`} />
        <InputText
          style={style}
          type={showPassword && inputType === "password" ? "text" : inputType}
          id={id}
          value={value ? value : null}
          onChange={onChange}
          className="w-100"
          placeholder={placeholder}
          inputMode={inputMode}
          pattern={pattern}
          mask={mask}
          slotchar={slotchar}
          date-date-format={dateformat}
          disabled={disabled}
          maxLength={maxLength}
        />
        {inputType === "password" ? (
          <span className="pp-input-icon-right text-xs  input100">
            <i
              onClick={() => {
                setShowPassword((perv) => !perv);
                console.log("hi");
              }}
              className={
                !showPassword
                  ? `pi cursor-pointer text-xs pi-eye-slash`
                  : "pi cursor-pointer text-xs pi-eye"
              }
            />
          </span>
        ) : (
          ""
        )}
      </span>
    </div>
  );
};

export default InputPassword;
