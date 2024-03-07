export const yesNoOptions = [
    {
        name: 'Yes',
        value: 'true',
    },
    {
        name: 'No',
        value: 'false',
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

export const CommissionGpTypeOptions = ['Products', 'Services', 'Agreement'].map((name) => ({ name, value: name }));

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
        value: `${i} days`,
    };
    daysOptions.push(option);
}
export const monthOptions = [];

for (let i = 1; i <= 48; i++) {
    const option = {
        name: `${i} months`,
        value: `${i} months`,
    };
    monthOptions.push(option);
}

export const hoursOptions = [];

for (let i = 12; i <= 72; i += 12) {
    const option = {
        name: `${i} hours`,
        value: `${i} hours`,
    };
    hoursOptions.push(option);
}

export const reasonCodeTypeOptions = [
    'Agreement Hold',
    'Cancel Pending POS Transaction',
    'Cancel Agreement',
    'Cancel Price',
    'Commission Override',
    'Drawer Adjustment',
    'Event Status',
    'Freeze Agreement',
    'No Sale',
    'Void',
    'Waive Tax',
].map((name) => ({ name, value: name }));

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
        value: 'POS_ONLY',
    },
    {
        name: 'Agreements Only',
        value: 'AGGREMENT_ONLY',
    },
    {
        name: 'POS and Agreements',
        value: 'POS_AND_AGREEMENTS',
    },
    {
        name: 'Non-sale Item',
        value: 'NON_SALE_ITEM',
    },
];
