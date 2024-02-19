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
export const CommissionGpTypeOptions = ['Products', 'Services', 'Agreement'].map((name) => ({ name, value: name }));

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
