import ringTone1 from '../assets/sounds/morning_alarm.mp3';
import ringTone2 from '../assets/sounds/samsung_ringtone.mp3';

export const addDropOptions = [
    {
        name: 'Add',
        value: 'ADD',
    },
    {
        name: 'Drop',
        value: 'DROP',
    },
];

export const yesNoOptions = [
    {
        name: 'Yes',
        value: true,
    },
    {
        name: 'No',
        value: false,
    },
];

export const memberStatusOptions = [
    {
        name: 'Pending',
        value: 'PENDING',
    },
    {
        name: 'Attended',
        value: 'ATTENDED',
    },
];

export const eventStatusOptions = [
    {
        name: 'Pending',
        value: 'PENDING',
    },
    {
        name: 'Cancel-No Charge',
        value: 'CANCEL_No_CHARGE',
    },
    {
        name: 'Cancel Charge',
        value: 'CANCEL_CHARGE',
    },
    {
        name: 'Completed',
        value: 'COMPLETED',
    },
];
export const taskTypeOptions = [
    {
        name: 'Email',
        value: 'EMAIL',
    },
    {
        name: 'Call ',
        value: 'CALL',
    },
    {
        name: 'Member Followup ',
        value: 'MEMBER_FOLLOWUP',
    },
];
export const colorOptions = [
    {
        name: 'Red',
        value: '#E60606',
    },
    {
        name: 'Blue',
        value: '#06CBE6',
    },
    {
        name: 'Green',
        value: '#20B03C',
    },
    {
        name: 'Yellow',
        value: '#FFC348',
    },
    {
        name: 'Orange',
        value: '#FE7135',
    },
    {
        name: 'Purple',
        value: '#6C45BE',
    },
];
export const defaultDiscountOptions = [
    {
        name: 'None',
        value: 'NONE',
    },
];

export const amountTypeOptions = [
    {
        name: '$',
        value: 'FIXED',
    },
    {
        name: '%',
        value: 'PERCENTAGE',
    },
];
export const durationTypeOptions = [
    {
        name: '15 mins',
        value: 15,
    },
    {
        name: '30 mins',
        value: 30,
    },
    {
        name: '60 mins',
        value: 60,
    },
];

export const noOfPaymentOptions = [
    {
        name: 'One Time Service',
        value: false,
    },
    {
        name: 'Recurring',
        value: true,
    },
];

export const bonusTypeConstantsOptions = [
    {
        name: 'Single Client',
        value: 'SINGLE_CLIENT',
    },
    {
        name: 'Service Value',
        value: 'SERVICE_VALUE',
    },
];

export const soundAudioOptions = [
    { name: 'RingTone 1', value: ringTone1 },
    { name: 'RingTone 2', value: ringTone2 },
];

export const ActiveFilterDropdown = [
    { name: 'Active', value: (val) => val },
    { name: 'Inactive', value: (val) => !val },
];

export const ActiveFilterDropdown1 = [
    { name: 'Active', value: true },
    { name: 'Inactive', value: false },
];

export const taxRatePercentageDropdown = [
    { name: 'All', value: () => true },
    { name: '0-50', value: (val) => val >= 0 && val <= 50 },
    { name: '51-100', value: (val) => val >= 51 && val <= 100 },
];

export const CommissionGpTypeOptions = ['Products', 'Services'].map((name) => ({ name, value: name }));

export const durationOptions = ['Days', 'Weeks', 'Months', 'Years'].map((name) => ({ name, value: name.toUpperCase() }));

export const servicesOptions = ['Private Sessions', 'Yoga Sessions', 'Reformer', 'Etc'].map((name) => ({ name, value: name }));

export const checkInLimitOptions = [
    {
        name: 'No Limit',
        value: 'No Limit',
    },
];

for (let i = 1; i <= 50; i++) {
    const option = {
        name: `${i}`,
        value: `${i}`,
    };
    checkInLimitOptions.push(option);
}

export const unitPricingOptions = [];
for (let i = 1; i <= 100; i++) {
    const option = {
        name: i,
        value: i,
    };
    unitPricingOptions.push(option);
}
export const perOptions = [
    {
        name: 'Week (7 days)',
        value: 'Week (7 Days)',
    },
    {
        name: 'Month (30 days)',
        value: 'Month (30 days)',
    },
    {
        name: 'Year (365 days)',
        value: 'Year (365 days)',
    },
    {
        name: 'Calendar Week (sunday)',
        value: 'Calendar Week (sunday)',
    },
    {
        name: 'Calendar Week (monday)',
        value: 'Calendar Week (monday)',
    },
    {
        name: 'Calendar Month',
        value: 'Calendar Month',
    },
    {
        name: 'Calendar Year',
        value: 'Calendar Year',
    },
];

export const restrictionOptions = [
    {
        name: 'Club',
        value: 'Club',
    },
    {
        name: 'Company',
        value: 'Company',
    },
];

export const daysOptions = [];

for (let i = 1; i <= 30; i++) {
    const option = {
        name: `${i} days`,
        value: i,
    };
    daysOptions.push(option);
}
export const declineDaysOptions = [
    {
        name: 'Immediately',
        value: 0,
    },
];

for (let i = 1; i <= 30; i++) {
    const option = {
        name: `${i} days`,
        value: i,
    };
    declineDaysOptions.push(option);
}

export const monthOptions = [];

for (let i = 1; i <= 48; i++) {
    const option = {
        name: `${i} months`,
        value: `${i} months`,
    };
    monthOptions.push(option);
}

export const trackSizes = ['Extra Small', 'Small', 'Medium', 'Large', 'Extra Large', 'XXL'].map((name) => ({ name, value: name }));

export const monthDropdownOptions = [];
for (let i = 1; i <= 12; i++) {
    const option = {
        name: `${i} Month`,
        value: i,
    };
    monthDropdownOptions.push(option);
}

export const hoursOptions = [];

for (let i = 12; i <= 72; i += 12) {
    const option = {
        name: `${i} hours`,
        value: i,
    };
    hoursOptions.push(option);
}

export const reasonCodeTypeOptions = [
    {
        name: 'Agreement Hold',
        value: 'AGREEMENT_HOLD',
    },
    {
        name: 'Cancel Pending POS Transaction',
        value: 'CANCEL_PENDING_POS_TRANSACTION',
    },
    {
        name: 'Cancel Agreement',
        value: 'CANCEL_AGREEMENT',
    },
    {
        name: 'Cancel Price',
        value: 'CANCEL_PRICE',
    },
    {
        name: 'Commission Override',
        value: 'COMMISSION_OVERRIDE',
    },
    {
        name: 'Drawer Adjustment',
        value: 'DRAWER_ADJUSTMENT',
    },
    {
        name: 'Event Status',
        value: 'EVENT_STATUS',
    },
    {
        name: 'Freeze Agreement',
        value: 'FREEZE_AGREEMENT',
    },
    {
        name: 'No Sale',
        value: 'NO_SALE',
    },
    {
        name: 'Void',
        value: 'VOID',
    },
    {
        name: 'Waive Tax',
        value: 'WAIVE_TAX',
    },
];

export const itemStartOptions = [
    { name: 'None', value: 'NONE' },
    { name: 'Upon Purchase', value: 'UPON_PURCHASE' },
    { name: 'Upon Next Visit', value: 'UPON_NEXT_VISIT' },
    { name: 'Upon First Use', value: 'UPON_FIRST_USE' },
];

export const classesPayTypeOptions = [
    {
        name: 'Incremental Pay',
        value: 'INCREMENTAL_PAY',
    },
    {
        name: 'Pay Per Class',
        value: 'PAY_PER_CLASS',
    },
    {
        name: 'Pay Per Client',
        value: 'PAY_PER_CLIENT',
    },
    {
        name: '% Rate',
        value: 'PERCENTAGE_RATE',
    },
];
export const substitutionPriorityOptions = [
    {
        name: 'Suggested',
        value: 'SUGGESTED',
    },
    {
        name: 'High',
        value: 'HIGH',
    },
    {
        name: 'Medium',
        value: 'MEDIUM',
    },
    {
        name: 'Low',
        value: 'LOW',
    },
];
export const AppointmentPayPriorityOptions = [
    {
        name: 'Per Event',
        value: 'PER-EVENT',
    },
    {
        name: 'Person',
        value: 'PERSON',
    },
];

export const EmployeeCommissionType = [
    {
        name: 'Per Sale',
        value: 'PER_SALE',
    },
    {
        name: 'Per Item',
        value: 'PER_ITEM',
    },
];
export const catalogProductTypeOptions = [
    {
        name: 'Product',
        value: 'PRODUCT',
    },
    {
        name: 'Service',
        value: 'SERVICE',
    },
];
export const productTypeOptions = [
    {
        name: 'General',
        value: 'GENERAL',
    },
    {
        name: 'Donation',
        value: 'DONATION',
    },
];
export const itemSoldOptions = [
    {
        name: 'POS Only',
        value: 'POS',
    },
    {
        name: 'Agreements Only',
        value: 'AGREEMENT',
    },
    {
        name: 'POS and Agreements',
        value: 'POS_AGREEMENTS',
    },
    {
        name: 'Non-sale Item',
        value: 'NON_SALE_ITEM',
    },
];
export const BookingHours = [
    { value: 15, type: 'MINUTES' },
    { value: 30, type: 'MINUTES' },
    { value: 45, type: 'MINUTES' },
];

BookingHours.forEach((entry) => {
    entry.name = `${entry.value} ${entry.type.toLowerCase()}`;
});

for (let i = 1; i <= 47; i++) {
    BookingHours.push({
        value: i,
        type: 'HOURS',
    });
}

const additionalHoursOptions = [
    { value: 49, type: 'HOURS' },
    { value: 73, type: 'HOURS' },
];

additionalHoursOptions.forEach((option) => {
    BookingHours.push(option);
});

for (let j = 2; j <= 30; j++) {
    BookingHours.push({
        value: j,
        type: 'DAYS',
    });
}

for (let k = 5; k <= 12; k++) {
    BookingHours.push({
        value: k,
        type: 'WEEKS',
    });
}

BookingHours.forEach((entry) => {
    const unit = entry.value === 1 ? entry.type.slice(0, -1).toLowerCase() : entry.type.toLowerCase();
    entry.name = `${entry.value} ${unit}`;
});

export const defaultMaxAttendesOptions = [];
for (let i = 1; i <= 50; i++) {
    const option = {
        name: i === 0 ? '0' : i,
        value: i === 0 ? '0' : i,
    };
    defaultMaxAttendesOptions.push(option);
}
export const EventTypeOptions = [
    { name: 'Class', value: 'CLASS' },
    { name: 'Appointments', value: 'APPOINTMENTS' },
];
export const EventCommissionGroupOptions = [
    { name: 'Per Event', value: 'PER_EVENT' },
    { name: 'Per Person', value: 'PER_PERSON' },
];
export const waitListExpirationOptions = [
    { name: 'Event Start', value: 'EVENT_START' },
    { name: 'Event End', value: 'EVENT_END' },
];
export const generateSequence = () => {
    let sequence = [];

    for (let i = 1; i <= 20; i++) {
        sequence.push({ name: `${i} minutes`, value: i });
    }

    for (let i = 25; i <= 75; i += 5) {
        sequence.push({ name: `${i} minutes`, value: i });
    }
    for (let i = 90; i <= 180; i += 15) {
        sequence.push({ name: `${i} minutes`, value: i });
    }

    return sequence;
};
export const calendarDisplayOptions = [
    { name: 'Duration', value: 'DURATION' },
    { name: 'Level', value: 'LEVEL' },
    { name: 'Location', value: 'LOCATION' },
    { name: 'Member Name', value: 'MEMBER_NAME' },
    { name: 'Event', value: 'EVENT' },
    { name: 'Employee Name', value: 'EMPLOYEE_NAME' },
    { name: 'Enrolled /Max Attendee', value: 'ENROLLED_MAX_ATTENDANCE' },
];

export const timeShownOptions = ['Quarter Hour', 'Hour', 'Half Hour'].map((name) => ({ name, value: name }));

export const classMeet = ['One Time', 'Weekly', 'Biweekly', 'Monthly'].map((name, index) => ({
    name,
    value: index + 1,
}));
export const WeekDaysOption = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((name) => ({ name, value: name }));
export const SpecialRestrictionOptions = [
    { name: 'None', value: 'NONE' },
    { name: 'By Age', value: 'BY_AGE' },
    { name: 'By Location', value: 'BY_LOCATION' },
    { name: 'By Days', value: 'BY_DAYS' },
];

export const assessedTypeOptions = [
    { name: 'Annual Fee', value: 'ANNUAL_FEE' },
    { name: 'Late Fee', value: 'LATE_FEE' },
    { name: 'Decline Fee', value: 'DECLINE_FEE' },
    { name: 'No Show Fee', value: 'NO_SHOW_FEE' },
    { name: 'Freeze Fee', value: 'FREEZE_FEE' },
    { name: 'Cancellation Fee', value: 'CANCELLATION_FEE' },
];

export const preferedDueDay = [
    { name: 'Specific Date', value: 'SPECIFIC_DATE' },
    { name: 'Number of Days from Begin Date', value: 'DAYS_FROM_BEGIN_DATE' },
];

export const timePeriodFormatOptions = ['AM', 'PM'].map((name) => ({ name, value: name }));

export const genderOptions = [
    {
        name: 'Male',
        value: 'MALE',
    },
    {
        name: 'Female',
        value: 'FEMALE',
    },
    {
        name: 'Others',
        value: 'OTHERS',
    },
];
export const autoPayOptions = [
    {
        name: 'On a set schedule',
        value: 'ON_SET_SCHEDULE',
    },
    {
        name: 'When the pricing options run out',
        value: 'ON_PRICING_OPTIONS_RUN_OUT',
    },
];

export const oftenClientChargedOptions = [
    {
        name: 'Set number of autopays',
        value: 'NO_OF_AUTOPAYS',
    },
    {
        name: 'Month-To-Month',
        value: 'MONTH_TO_MONTH',
    },
];
export const whenClientChargedOptions = [
    {
        name: 'On the Sale Date',
        value: 'ON_SALE_DATE',
    },
    {
        name: '1st of the month',
        value: '1ST_OF_MONTH',
    },
    {
        name: '15th of the month',
        value: '15TH_OF_MONTH',
    },
    {
        name: '1st or 15th of the month',
        value: '1ST_OR_15TH_OF_MONTH',
    },
    {
        name: '15th or last day of the month',
        value: '15TH_OR_LAST_OF_MONTH',
    },
    {
        name: 'last day of the month',
        value: 'LAST_OF_MONTH',
    },
    {
        name: 'Specific Date',
        value: 'SPECIFIC_DATE',
    },
];
export const afterSixPaymentsOptions = [
    {
        name: 'Contract Expires',
        value: 'CONTRACT_EXPIRES',
    },
    {
        name: 'Contract Automatically renews after Autopays completed',
        value: 'CONTRACT_RENEWS',
    },
];

export const PromotionTypeOptions = ['% Off down payment', '$ Off Down Payment', 'Free months', 'Double refferal'].map((name) => ({ name, value: name }));

export const TaxRateTypeOptions = ['State', 'District', 'County', 'City', 'Federal'].map((name) => ({ name, value: name }));
export const defaultReceiptCopiesOptions = [];

for (let i = 1; i <= 30; i++) {
    const option = {
        name: `${i}`,
        value: i,
    };
    defaultReceiptCopiesOptions.push(option);
}

export const memberTypeOptions = [
    { name: 'Prospect', value: 'PROSPECT' },
    { name: 'Member', value: 'MEMBER' },
];

export const LeadPriorityOptions = ['High', ' Medium', 'Low', 'Urgent'].map((name) => ({ name, value: name }));

export const repeatWeekOptions = [
    { name: 'Repeat indefinitely', value: 'INDEFINITELY' },
    { name: 'Repeat next week', value: 'NEXT_WEEK' },
    { name: 'Repeat next 2 weeks', value: 'NEXT_2_WEEKS' },
    { name: 'Repeat next 4 weeks', value: 'NEXT_4_WEEKS' },
];
export const documentTypeOptions = [
    {
        name: 'License',
        value: 'LICENSE',
    },
    {
        name: 'Passport',
        value: 'PASSPORT',
    },
    {
        name: 'Other',
        value: 'OTHER',
    },
];

export const paymentMethodsOptions = [
    {
        name: 'Credit Card',
        value: 'CREDIT_CARD',
    },
];
