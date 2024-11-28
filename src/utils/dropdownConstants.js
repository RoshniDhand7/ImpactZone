import moment from 'moment';
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
export const defaultDiscountOptions = [
    {
        name: 'None',
        value: 'None',
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
        value: 'One time',
    },
    {
        name: 'Recurring',
        value: 'Recuring',
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

export const itemStartOptions = ['Upon Purchase', 'Upon next visit', 'Upon first use'].map((name) => ({ name, value: name.toUpperCase() }));

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
        value: 'AGGREMENT',
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

const timeToMinutes = (time, unit) => {
    let duration = moment.duration(time, unit);
    return duration.asMinutes();
};

export const BookingHours = [
    { name: '15 minutes', value: 15 },
    { name: '30 minutes', value: 30 },
    { name: '45 minutes', value: 45 },
];

for (let i = 1; i <= 47; i++) {
    BookingHours.push({
        name: `${i} ${i === 1 ? 'hour' : 'hours'}`,
        value: timeToMinutes(i, 'hours'),
    });
}

const additionalHoursOptions = [
    { name: '49 hours', value: timeToMinutes(49, 'hours') },
    { name: '73 hours', value: timeToMinutes(73, 'hours') },
];

BookingHours.push(...additionalHoursOptions);

for (let j = 2; j <= 30; j++) {
    BookingHours.push({ name: `${j} days`, value: timeToMinutes(j, 'days') });
}

for (let k = 5; k <= 12; k++) {
    BookingHours.push({ name: `${k} weeks`, value: timeToMinutes(k, 'weeks') });
}

export const defaultMaxAttendesOptions = [];
for (let i = 0; i <= 50; i++) {
    const option = {
        name: i === 0 ? '0' : i,
        value: i === 0 ? '0' : i,
    };
    defaultMaxAttendesOptions.push(option);
}
export const EventTypeOptions = ['Class', 'Appointments'].map((name) => ({ name, value: name }));
export const EventCommissionGroupOptions = ['Per Event', 'Per Person'].map((name) => ({ name, value: name }));
export const waitListExpirationOptions = ['Event Start', 'Event End'].map((name) => ({ name, value: name }));
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
export const calendarDisplayOptions = ['Duration', 'Level', 'Location', 'Member Name', 'Event', 'Status', 'Employee Name', 'Enrolled /Max Attendee'].map(
    (name) => ({ name, value: name }),
);
export const timeShownOptions = ['Quarter Hour', 'Hour', 'Half Hour'].map((name) => ({ name, value: name }));

export const classMeet = ['One Time', 'Weekly', 'Biweekly', 'Monthly'].map((name, index) => ({
    name,
    value: index + 1,
}));
export const WeekDaysOption = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((name) => ({ name, value: name }));
export const SpecialRestrictionOptions = ['None', 'By Age', 'By Location', 'By Days'].map((name) => ({ name, value: name.toUpperCase() }));
export const assessedTypeOptions = [
    { name: 'Annual Fee', value: 'ANNUAL_FEE' },
    { name: 'Late Fee', value: 'LATE_FEE' },
    { name: 'Decline Fee', value: 'DECLINE_FEE' },
    { name: 'No Show Fee', value: 'NO_SHOW_FEE' },
    { name: 'Freeze Fee', value: 'FREEZE_FEE' },
    { name: 'Cancellation Fee', value: 'CANCELLATION_FEE' },
];

export const preferedDueDay = [
    { name: 'Month and Day', value: 'MONTH_AND_DAY' },
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
        value: 'set_schedule',
    },
    {
        name: 'When the pricing options run out',
        value: 'pricing_options_run_out',
    },
];

export const oftenClientChargedOptions = [
    {
        name: 'Set number of autopays',
        value: 'no_of_autopays',
    },
    {
        name: 'Month-To-Month',
        value: 'month_to_month',
    },
];
export const whenClientChargedOptions = [
    {
        name: 'On the Sale Date',
        value: 'on_sale_date',
    },
    {
        name: '1st of the month',
        value: 'first_of_month',
    },
    {
        name: '15th of the month',
        value: 'mid_of_month',
    },
    {
        name: '1st or 15th of the month',
        value: 'first_or_fifteen_month',
    },
    {
        name: '15th or last day of the month',
        value: 'fifteen_last_day_month',
    },
    {
        name: 'last day of the month',
        value: 'last_of_month',
    },
    {
        name: 'Specific Date',
        value: 'specific_date',
    },
];
export const afterSixPaymentsOptions = [
    {
        name: 'Contract Expires',
        value: 'contract_expires',
    },
    {
        name: 'Contract Automatically renews every 6 payments',
        value: 'contract_automatically_renews_every',
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
