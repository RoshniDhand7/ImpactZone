import { FirstletterUpperCase, equal, length } from './javascript';
import { emailValidation, firstLetterToUppercase, passwordValidation, number } from './regex';
import zipcodes from 'zipcodes';

const formValidation = (name, value, state, ignore = []) => {
    let formErrors = { ...state.formErrors };
    if (ignore.includes(name)) {
        if (formErrors[name]) {
            formErrors[name] = '';
        }
        return formErrors;
    }

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
            } else if (!passwordValidation(value)) {
                formErrors[name] = `Please enter a password with 8-16 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character`;
            } else {
                formErrors[name] = '';
            }
            break;

        case 'name':
        case 'firstName':
        case 'lastName':
        case 'barCode':
        case 'accessCode':
        case 'billingCountry':
        case 'companyName':
        case 'address1':
        case 'notes':
        case 'address2':
        case 'address':
        case 'phoneNumber':
        case 'phone':
        case 'workNumber':
        case 'jobTitle':
        case 'primaryEmail':
        case 'reasonCode':
        case 'startTime':
        case 'upc':
            if (equal(length(value))) {
                formErrors[name] = `${firstLetterToUppercase(name)} is required!`;
            } else {
                formErrors[name] = '';
            }
            break;
        case 'endDate':
            if (value < state?.startDate) {
                formErrors[name] = `End date should not be less than start date`;
            } else {
                formErrors[name] = '';
            }
            break;

        case 'otpCode':
            if (value.length === 4) {
                formErrors[name] = '';
            } else {
                formErrors[name] = 'OTP is required';
            }
            break;
        case 'zipCode':
            if (equal(length(value))) {
                formErrors[name] = `${firstLetterToUppercase(name)} is required.`;
            } else if (zipcodes?.lookup(value)?.state !== state?.state) {
                formErrors[name] = `Please enter a valid Zip Code`;
            } else {
                formErrors[name] = '';
            }
            break;

        case 'multiClubInOut':
        case 'clockInRequired':
        case 'state':
        case 'city':
        case 'eventType':
        case 'internalUse':
        case 'bookOutFrom':
        case 'defaultMaxAttendes':
        case 'eventCommissionType':
        case 'waitListExpiration':
        case 'bookOutTo':
        case 'club':
        case 'campaignGroup':
        case 'locationType':
        case 'allowCancelOnline':
        case 'resourceType':
        case 'location':
        case 'pastDue':
        case 'timeBeforeEvent':
        case 'reasonCodeType':
        case 'commissionGroup':
        case 'level':
        case 'profitCentre':
        case 'itemSold':
        case 'profitCenter':
        case 'category':
        case 'noOfDays':
        case 'noOfMonths':
            if (typeof value == 'boolean') {
                formErrors[name] = '';
            } else if (!value) {
                formErrors[name] = `${firstLetterToUppercase(name)} is required!`;
            } else {
                formErrors[name] = '';
            }
            break;

        case 'logo':
        case 'duration':
        case 'event':
        case 'services':
            if (value.length === 0) {
                formErrors[name] = `${firstLetterToUppercase(name)} is required!`;
            } else {
                formErrors[name] = '';
            }
            break;

        case 'days':
            if (typeof value == 'boolean') {
                formErrors[name] = '';
            } else if (!value.length) {
                formErrors[name] = `${firstLetterToUppercase(name)} is required!`;
            } else {
                formErrors[name] = '';
            }
            break;
        case 'oneToFiveClients':
        case 'sixToTenClients':
        case 'elevenToFifteenClients':
        case 'sixteenToTwentyClients':
        case 'twentyOneToTwentyFiveClients':
        case 'twentySixPlusClients':
        case 'noRegistrationPay':
        case 'payPerClassRate':
        case 'baseRate':
        case 'payPerClientRate':
        case 'maxPayPerClient':
        case 'percentage':
        case 'sessionsValue':
        case 'ofSessions':
        case 'over':
        case 'bonusAmount':
        case 'pay':
        case 'minimumAgeAllowed':
        case 'maximumAgeAllowed':
        case 'maximumDaysAllowed':
        case 'maximumDistanceAllowed':
        case 'amount':
            if (!number(value) || value === 0) {
                formErrors[name] = `${firstLetterToUppercase(name)} are required!`;
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
