import { equal, greaterThan, length } from "./javascript";
import { firstLetterToUppercase, stringValidation, emailValidation, regularString, number } from "./regex";

export const allValidations = (name, value, state, ignore = []) => {
    const formErrors = { ...state.formErrors };
    if (ignore.includes(name)) {
        if (formErrors[name]) formErrors[name] = '';
        return formErrors;
    }
    switch (name) {
        case "email":
            if (equal(length(value))) {
                formErrors[name] = `${firstLetterToUppercase(name)} is required!`;
            } else if (!emailValidation(value)) {
                formErrors[name] = `Please enter valid email!`;
            } else {
                formErrors[name] = "";
            }
            break;
        case "fullName":
        case "name":
            if (equal(length(value))) {
                formErrors[name] = `${firstLetterToUppercase(name)} is required!`;
            } else if (!regularString(value)) {
                formErrors[name] = `Unnecessary space or special chracter in word!`;
            } else if (greaterThan(length(value), 70)) {
                formErrors[name] = `${firstLetterToUppercase(name)} exceeds character limit. Maximum allowed: 70 characters.`;
            } else {
                formErrors[name] = "";
            }
            break;

        default:
            break;
    }
    return formErrors;
};
