import { FirstletterUpperCase, equal, length } from './javascript';
import { emailValidation, firstLetterToUppercase, passwordValidation } from './regex';
import zipcodes from 'zipcodes';

const formValidation = (name, value, data, required = []) => {
    let formErrors = { ...data.formErrors };
    switch (name) {
        case 'email':
            if (equal(length(value))) {
                formErrors[name] = `${FirstletterUpperCase(name)} is required!`;
            } else if (!emailValidation(value)) {
                formErrors[name] = `Please enter valid email!`;
            } else {
                formErrors[name] = '';
            }
            break;
        case 'password':
            if (equal(length(value))) {
                formErrors[name] = `${FirstletterUpperCase(name)} is required!`;
                // } else if (!passwordValidation(value)) {
                //     formErrors[name] = `Please enter a password with 8-16 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character`;
                // } else {
            } else {
                formErrors[name] = '';
            }
            break;

        case 'billingCountry':
        case 'companyName':
        case 'address1':
        case 'address2':
        case 'workNumber':
        case 'address':
        case 'phoneNumber':
        case 'jobTitle':
        case 'workExtention':
        case 'faxNumber':
        case 'primaryEmail':
        case 'reasonCode':
            if (equal(length(value))) {
                formErrors[name] = `${firstLetterToUppercase(name)} is required!`;
            } else {
                formErrors[name] = '';
            }
            break;

        case 'multiClubInOut':
        case 'clockInRequired':
        case 'state':
        case 'city':
        case 'bookOutFrom':
        case 'bookOutTo':
        case 'allowCancelOnline':
        case 'timeBeforeEvent':
        case 'reasonCodeType':
            if (typeof value == 'boolean') {
                formErrors[name] = '';
            } else if (!value) {
                formErrors[name] = `${firstLetterToUppercase(name)} is required!`;
            } else {
                formErrors[name] = '';
            }
            break;
        case 'zipCode':
            if (equal(length(value))) {
                formErrors[name] = `${firstLetterToUppercase(name)} is required.`;
            } else if (zipcodes?.lookup(value)?.state != data?.state) {
                formErrors[name] = `Please enter a valid Zip Code`;
            } else {
                formErrors[name] = '';
            }
            break;
        case 'logo':
            if (value.length === 0) {
                formErrors[name] = `${firstLetterToUppercase(name)} is required!`;
            } else {
                formErrors[name] = '';
            }
            break;

        default:
            break;
    }
    return formErrors;
};

export default formValidation;
