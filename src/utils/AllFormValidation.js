import React from "react";
import { FirstletterUpperCase, equal, length } from "./javascript";
import { emailValidation, passwordValidation } from "./regex";
import zipcodes from 'zipcodes';

const FormValidation = (name, value, data, required, initialData) => {
  let formErrors = { ...data.formErrors };
  switch (name) {
    case "email":
      if (equal(length(value))) {
        formErrors[name] = `${FirstletterUpperCase(name)} is required!`;
      } else if (!emailValidation(value)) {
        formErrors[name] = `Please enter valid email!`;
      } else {
        formErrors[name] = "";
      }

      break;

    case "password":
      if (equal(length(value))) {
        formErrors[name] = `${FirstletterUpperCase(name)} is required!`;
      } else if (!passwordValidation(value)) {
        formErrors[
          name
        ] = `Please enter a password with 8-16 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character`;
      } else {
        formErrors[name] = "";
      }
      break;

      case "zipCode":
        // console.log("lookup",zipcodes.lookupByName(data?.city,data?.state)[0]?.zip==value,zipcodes?.lookupByName(data?.city,data?.state)[0]?.zip,value)
        if (equal(length(value))) {
          formErrors[name] = `${FirstletterUpperCase(name)} is required!`;
        } else if (zipcodes.lookupByName(data?.city,data?.state)[0]?.zip!=value) {
          formErrors[
            name
          ] = `Please enter a valid ZipCode`;
        } else {
          formErrors[name] = "";
        }
        break;

    case name:
      if (name != "formErrors" && required.includes(name)) {
        if (
          typeof value === "object" &&
          value != null &&
          !Array.isArray(value) &&
          typeof initialData[name] == typeof value &&
          initialData[name] !== null
        ) {
          if (required.includes(`${name}|`)) {
            Object.keys(value).map((item) => {
              if (required.includes(`${name}|${item}`)) {
                if (equal(length(value[item])) || value[item] == null) {
                  formErrors[name] = {
                    ...formErrors[name],
                    [item]: `${FirstletterUpperCase(item)} is required!`,
                  };
                } else {
                  formErrors[name] = {
                    ...formErrors[name],
                    [item]: "",
                  };
                }
              }
            });
          } else {
            Object.keys(value).map((item) => {
              if (equal(length(value[item])) || value[item] == null) {
                formErrors[name] = {
                  ...formErrors[name],
                  [item]: `${FirstletterUpperCase(item)} is required!`,
                };
              } else {
                formErrors[name] = {
                  ...formErrors[name],
                  [item]: "",
                };
              }
            });
          }
        } else {
          if (equal(length(value)) || value == null) {
            formErrors[name] = `${FirstletterUpperCase(name)} is required!`;
          } else {
            formErrors[name] = "";
          }
        }

        break;
      } else {
        break;
      }

    default:
      break;
  }
  // console.log("lastformerror",formErrors)
  return formErrors;
};

export default FormValidation;
