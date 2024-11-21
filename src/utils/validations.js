import { FirstletterUpperCase, equal, length } from './javascript';
import { emailValidation, firstLetterToUppercase, passwordValidation, number, isNumberOrDecimal, whiteSpaceCheck } from './regex';
import zipcodes from 'zipcodes';

const formValidation = (name, value, state, ignore = []) => {
    let formErrors = { ...state.formErrors };

    if (ignore.includes(name)) {
        if (formErrors[name]) {
            formErrors[name] = '';
        }
        return formErrors;
    }
    const singularFields = ['taxRatePercentage', 'amount', 'sessionsValue', 'pay', 'bonusAmount', 'payPerClassRate', 'baseRate', 'percentage', 'unitPrice'];

    switch (name) {
        case 'email':
            if (equal(length(value))) {
                formErrors[name] = `${FirstletterUpperCase(name)} is required!`;
            } else if (whiteSpaceCheck(value)) {
                formErrors[name] = `Unnecessary space in word!`;
            } else if (!emailValidation(value)) {
                formErrors[name] = `Please enter valid email!`;
            } else {
                formErrors[name] = '';
            }
            break;
        case 'password':
        case 'newPassword':
            if (equal(length(value))) {
                formErrors[name] = `${FirstletterUpperCase(name)} is required!`;
            } else if (whiteSpaceCheck(value)) {
                formErrors[name] = `Unnecessary space in word!`;
            } else if (!passwordValidation(value)) {
                formErrors[name] = `Please enter a password with 8-16 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character`;
            } else {
                formErrors[name] = '';
            }
            break;
        case 'confirmPassword':
            if (equal(length(value))) {
                formErrors[name] = `${FirstletterUpperCase(name)} is required!`;
            } else if (whiteSpaceCheck(value)) {
                formErrors[name] = `Unnecessary space in word!`;
            } else if (value !== state['newPassword']) {
                formErrors[name] = 'Password does not match';
            } else {
                formErrors[name] = '';
            }
            break;
        case 'accessCode':
            if (equal(length(value))) {
                formErrors[name] = `${firstLetterToUppercase(name)} is required`;
            } else if (whiteSpaceCheck(value)) {
                formErrors[name] = `Unnecessary space in word!`;
            } else if (state.reAccessCode && value !== state.reAccessCode) {
                formErrors['reAccessCode'] = 'Access Code and Re-enter Access Code do not match!';
            } else {
                formErrors[name] = '';
                formErrors['reAccessCode'] = '';
            }
            break;

        case 'reAccessCode':
            if (equal(length(value))) {
                formErrors[name] = `${firstLetterToUppercase(name)} is required`;
            } else if (whiteSpaceCheck(value)) {
                formErrors[name] = `Unnecessary space in word!`;
            } else if (value !== state.accessCode) {
                formErrors['reAccessCode'] = 'Access Code and Re-enter Access Code do not match!';
            } else {
                formErrors[name] = '';
                formErrors['reAccessCode'] = '';
            }
            break;

        case 'name':
        case 'firstName':
        case 'lastName':
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
        case 'endTime':
        case 'taxRateName':
        case 'detail':
        case 'code':
        case 'upc':
        case 'discountName':
        case 'primaryPhone':
        case 'startDate':
        case 'issue':
        case 'begin':
        case 'expiration':
        case 'memberToSell':
        case 'driverLicense':
        case 'autoRenew':
        case 'dueDate':
        case 'date':
        case 'open':
        case 'allowWaitlist':
        case 'requireComment':
        case 'itemCaption':
        case 'variationName':
        case 'discountCode':
        case 'comment':
        case 'register':
            if (equal(length(value))) {
                formErrors[name] = `${firstLetterToUppercase(name)} is required!`;
            } else if (whiteSpaceCheck(value)) {
                formErrors[name] = `Unnecessary space in word!`;
            } else {
                formErrors[name] = '';
            }
            break;
        case 'endDate':
            if (equal(length(value))) {
                formErrors[name] = `${firstLetterToUppercase(name)} is required!`;
            } else if (value < state?.startDate) {
                formErrors[name] = `End date should not be less than start date`;
            } else {
                formErrors[name] = '';
            }
            break;

        case 'clockOut':
            if (equal(length(value))) {
                formErrors[name] = `${firstLetterToUppercase(name)} is required!`;
            } else if (new Date(value) < new Date(state?.clockIn)) {
                formErrors[name] = `Clockout Time should not be less than Clock In Time`;
            } else {
                formErrors[name] = '';
            }
            break;

        case 'otpCode':
            if (value.length === 4) {
                formErrors[name] = '';
            } else if (whiteSpaceCheck(value)) {
                formErrors[name] = `Unnecessary space in word!`;
            } else {
                formErrors[name] = 'OTP is required';
            }
            break;
        case 'zipCode':
            if (equal(length(value))) {
                formErrors[name] = `${firstLetterToUppercase(name)} is required.`;
            } else if (whiteSpaceCheck(value)) {
                formErrors[name] = `Unnecessary space in word!`;
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
        case 'noOfMonths':
        case 'subCategory':
        case 'membershipType':
        case 'agreementTemplate':
        case 'taxRateType':
        case 'defaultReceiptCopies':
        case 'oneTimePlan':
        case 'salesPerson':
        case 'campaign':
        case 'memberShipPlan':
        case 'defaultDiscount':
        case 'variations':
        case 'subVariations':
        case 'employee':
        case 'sellOnline':
        case 'paymentType':
            if (typeof value == 'boolean') {
                formErrors[name] = '';
            } else if (!value || value === null) {
                formErrors[name] = `${firstLetterToUppercase(name)} is required!`;
            } else {
                formErrors[name] = '';
            }
            break;

        case 'logo':
        case 'duration':
        case 'event':
        case 'services':
        case 'image':
        case 'club':
            if (value.length === 0) {
                formErrors[name] = `${firstLetterToUppercase(name)} is required!`;
            } else {
                formErrors[name] = '';
            }
            break;

        case 'days':
            if (!value.length) {
                formErrors[name] = `${firstLetterToUppercase(name)} are required!`;
            } else {
                formErrors[name] = '';
            }
            break;

        case 'maxPayPerClient':
        case 'ofSessions':
        case 'over':
        case 'minimumAgeAllowed':
        case 'maximumAgeAllowed':
        case 'maximumDaysAllowed':
        case 'maximumDistanceAllowed':
        case 'minimumQuantity':
            if (!number(value) || value === 0) {
                formErrors[name] = `${firstLetterToUppercase(name)} is required!`;
            } else if (whiteSpaceCheck(value)) {
                formErrors[name] = `Unnecessary space in word!`;
            } else if (state?.defaultQuantity && value > state?.defaultQuantity) {
                formErrors[name] = `${firstLetterToUppercase(name)} must be less than or equal to default Quantity!`;
            } else if (state?.state?.maximumQuantity && value > state?.defaultQuantity) {
                formErrors[name] = `${firstLetterToUppercase(name)} must be less than or equal to default Quantity!`;
            } else {
                formErrors[name] = '';
            }
            break;

        case 'defaultQuantity':
            if (!number(value) || value === 0) {
                formErrors[name] = `${firstLetterToUppercase(name)} is required!`;
            } else if (whiteSpaceCheck(value)) {
                formErrors[name] = `Unnecessary space in word!`;
            } else if (state?.minimumQuantity || state?.maximumQuantity) {
                if (value < state?.minimumQuantity) {
                    formErrors[name] = `Default Quantity must be more than or equal to Minimum Quantity!`;
                } else if (!state?.allowUnlimited && value > state?.maximumQuantity) {
                    formErrors[name] = `Default Quantity must be less than or equal to Maximum Quantity!`;
                } else {
                    formErrors[name] = '';
                }
            } else {
                formErrors[name] = '';
            }
            break;

        case 'maximumQuantity':
            if (!number(value) || value === 0) {
                formErrors[name] = `${firstLetterToUppercase(name)} is required!`;
            } else if (whiteSpaceCheck(value)) {
                formErrors[name] = `Unnecessary space in word!`;
            } else {
                formErrors[name] = '';
            }
            break;

        case 'barCode':
            if (!number(value) || value === 0) {
                formErrors[name] = `${firstLetterToUppercase(name)} is required!`;
            } else if (whiteSpaceCheck(value)) {
                formErrors[name] = `Unnecessary space in word!`;
            } else {
                formErrors[name] = '';
            }
            break;
        case 'value1':
            if (!number(value) || value === 0) {
                formErrors[name] = `No.of Item is required!`;
            } else if (whiteSpaceCheck(value)) {
                formErrors[name] = `Unnecessary space in word!`;
            } else {
                formErrors[name] = '';
            }
            break;
        case 'value2':
            if (!number(value) || value === 0) {
                formErrors[name] = `Amount is required!`;
            } else if (whiteSpaceCheck(value)) {
                formErrors[name] = `Unnecessary space in word!`;
            } else {
                formErrors[name] = '';
            }
            break;

        case 'taxRatePercentage':
        case 'amount':
        case 'noOfItems':
        case 'sessionsValue':
        case 'pay':
        case 'bonusAmount':
        case 'oneToFiveClients':
        case 'sixToTenClients':
        case 'elevenToFifteenClients':
        case 'sixteenToTwentyClients':
        case 'twentyOneToTwentyFiveClients':
        case 'twentySixPlusClients':
        case 'payPerClassRate':
        case 'baseRate':
        case 'payPerClientRate':
        case 'percentage':
        case 'unitPrice':
            if (!isNumberOrDecimal(value) || value === 0) {
                const message = singularFields.includes(name)
                    ? `${firstLetterToUppercase(name)} is required!`
                    : `${firstLetterToUppercase(name)} are required!`;
                formErrors[name] = message;
            } else if (whiteSpaceCheck(value)) {
                formErrors[name] = `Unnecessary space in word!`;
            } else if (value < 0) {
                formErrors[name] = `${firstLetterToUppercase(name)} cannot be less than 0`;
            } else {
                formErrors[name] = '';
            }
            break;

        case 'noRegistrationPay':
            if (value < 0) {
                formErrors[name] = `${firstLetterToUppercase(name)} cannot be less than 0`;
            } else {
                formErrors[name] = '';
            }
            break;

        // case 'unitPrice':
        //     if (!value) {
        //         formErrors[name] = `${firstLetterToUppercase(name)} are required!`;
        //     } else if (!number(value)) {
        //         formErrors[name] = `${firstLetterToUppercase(name)} are required!`;
        //     } else if (whiteSpaceCheck(value)) {
        //         formErrors[name] = `Unnecessary space in word!`;
        //     } else {
        //         formErrors[name] = '';
        //     }
        //     break;

        default:
            break;
    }
    return formErrors;
};

export default formValidation;
