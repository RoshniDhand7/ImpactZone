import React from "react";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import calendarIcon from "../../assets/icons/calendar.png";

const Input = ({
  id,
  title,
  title1,
  placeholder,
  type,
  icon,
  onChange,
  error,
  value,
  required,
  iconPos,
  inputType,
  style,
  maxLength,
  pattern,
  extraclassName,
  width,
  mode,
  minFractionDigits,
  disabled = false,
  onKeyDown,
  name,
  state,
  childState,
  minDate,
  keyfilter,
  overlappingText,
}) => {
  return (
    <div className={`flex flex-column gap-2 ${extraclassName}`}>
      <label className="text-xs text-dark-gray flex justify-content-between  font-semibold">
        <div>
          {title} {required ? <span className="text-red-500">*</span> : null}
        </div>
        <div>{title1}</div>
      </label>
      <span
        style={{ width: "100%", display: "inline-block" }}
        className={"p-input-icon-right"}
      >
        {overlappingText ? (
          <i>
            <label className="text-xs text-dark-gray flex justify-content-between  font-semibold">
              {overlappingText}
            </label>
          </i>
        ) : (
          <i className={icon} />
        )}

        {type === "number" ? (
          <InputText
            id={id}
            style={{ width: "100%" }}
            // placeholder={placeholder}
            keyfilter={keyfilter}
            name={name}
            icon={icon}
            value={value}
            onChange={(e) =>
              onChange &&
              onChange({
                ...e,
                name: e.target.name,
                value: e.target.value,
                index: id,
              })
            }
            minFractionDigits={minFractionDigits}
            type="number"
            disabled={disabled}
          />
        ) : type === "date" ? (
          <>
            <div className="custom-icon">
              <Calendar
                id={id}
                style={{ width: width ? width : "100%" }}
                placeholder={placeholder}
                name={name}
                type={type}
                value={value}
                maxLength={maxLength}
                onChange={(e) =>
                  onChange &&
                  onChange({
                    ...e,
                    name: e.target.name,
                    value: e.target.value,
                    index: id,
                  })
                }
                showIcon
                minDate={minDate}
                disabled={disabled}
                // onKeyDown={onKeyDown}
                onKeyDown={
                  type === "date"
                    ? (e) => e.preventDefault()
                    : onKeyDown
                    ? onKeyDown
                    : ""
                }
              />
              {/* <img
                src={calendarIcon}
                alt="calendar"
                style={{ width: "5%", marginRight: "10px" }}
              /> */}
            </div>
          </>
        ) : type === "color" ? (
          <div
            className="flex p-inputtext align-items-center"
            style={{ ...style }}
          >
            <InputText
              id={id}
              style={{ padding: "0", width: "22px", border: "none" }}
              placeholder={placeholder}
              icon={icon}
              name={name}
              className="col-2"
              keyfilter={keyfilter}
              type={type}
              value={value}
              maxLength={maxLength}
              onChange={(e) =>
                onChange &&
                onChange({
                  ...e,
                  name: e.target.name,
                  value: e.target.value,
                  index: id,
                })
              }
              disabled={disabled}
            ></InputText>
            <div className="col">{value ? value : "#000000"}</div>
          </div>
        ) : (
          <InputText
            id={id}
            style={{ width: width ? width : "100%", ...style }}
            placeholder={placeholder}
            icon={icon}
            name={name}
            keyfilter={keyfilter}
            type={type}
            value={value}
            maxLength={maxLength}
            onChange={(e) =>
              onChange &&
              onChange({
                ...e,
                name: e.target.name,
                value: e.target.value,
                index: id,
              })
            }
            disabled={disabled}
          ></InputText>
        )}
      </span>
      {childState ? (
        <div className="text-danger" style={{ color: "red" }}>
          {state?.formErrors?.[name.split("|")[1]]?.[name.split("|")[0]]}
        </div>
      ) : (
        <div className="text-danger" style={{ color: "red" }}>
          {state?.formErrors?.[name]}
        </div>
      )}
      {/* <div className="text-danger" style={{color:"red"}}>{state?.formErrors?.[name]}</div> */}
    </div>
  );
};

export default Input;
