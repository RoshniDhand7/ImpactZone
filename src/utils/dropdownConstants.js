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

// export const checkInLimitOptions = [
//     {
//         name: 'No Limit',
//         value: 'No Limit',
//     },
//     {
//         name: '1-50',
//         value: '1-50',
//     },
// ];
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

// export const reasonCodeTypeOptions = [
//     {
//         name: 'Agreement Hold',
//         value: 'Agreement Hold',
//     },
//     {
//         name: 'Cancel Pending POS Transaction',
//         value: 'Cancel Pending POS Transaction',
//     },
//     {
//         name: 'Cancel Agreement',
//         value: 'Cancel Agreement',
//     },
//     {
//         name: 'Cancel Price',
//         value: 'Cancel Price',
//     },
//     {
//         name: 'Commission Override',
//         value: 'Commission Override',
//     },
//     {
//         name: 'Drawer Adjustment',
//         value: 'Drawer Adjustment',
//     },
//     {
//         name: 'Event Status',
//         value: 'Event Status',
//     },
//     {
//         name: 'Freeze Agreement',
//         value: 'Freeze Agreement',
//     },
//     {
//         name: 'No Sale',
//         value: 'No Sale',
//     },
//     {
//         name: 'Void',
//         value: 'Void',
//     },
//     {
//         name: 'Waive Tax',
//         value: 'Waive Tax',
//     },
// ];
