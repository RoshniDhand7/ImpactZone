//Don't Touch this file or edit this file
export const allPermissions = [
    {
        department: 'Business Setup',
        expended: { Company: true, 'Reason Code': true, 'Cancel Code': true, Customization: true, Clubs: true, 'Job Title': true },
        permissions: [
            {
                key: 'Company',
                label: 'Company',
                children: [
                    {
                        key: 'ADD-COMPANY-GENERAL',
                        label: 'Add Company General',
                    },
                    {
                        key: 'ADD-COMPANY-ONLINE',
                        label: 'Add Company Online',
                    },
                    {
                        key: 'EDIT-COMPANY-GENERAL',
                        label: 'Edit Company General',
                    },
                    {
                        key: 'EDIT-COMPANY-ONLINE',
                        label: 'Edit Company Online',
                    },
                    {
                        key: 'VIEW-COMPANY-GENERAL',
                        label: 'View Company General',
                    },
                    {
                        key: 'VIEW-COMPANY-ONLINE',
                        label: 'View Company Online',
                    },
                ],
            },
            {
                key: 'Reason Code',
                label: 'Reason Code',
                children: [
                    {
                        key: 'ADD-REASON-CODE',
                        label: 'Add Reason Code',
                    },
                    {
                        key: 'EDIT-REASON-CODE',
                        label: 'Edit Reason code',
                    },
                    {
                        key: 'VIEW-REASON-CODE',
                        label: 'View Reason Code',
                    },
                    {
                        key: 'DELETE-REASON-CODE',
                        label: 'Delete Reason Code',
                    },
                ],
            },
            {
                key: 'Cancel Code',
                label: 'Cancel Code',
                children: [
                    {
                        key: 'SELECT-CANCEL-CODE',
                        label: 'Select Cancel Code',
                    },
                    {
                        key: 'ADD-CANCEL-CODE',
                        label: 'Add Cancel code',
                    },
                ],
            },
            {
                key: 'Customization',
                label: 'Customization',
                children: [
                    {
                        key: 'LOGO',
                        label: 'Logo',
                    },
                    {
                        key: 'THEME-COLOR',
                        label: 'Theme Color',
                    },
                ],
            },
            {
                key: 'Clubs',
                label: 'Clubs',
                children: [
                    {
                        key: 'VIEW-CLUBS-INFO',
                        label: 'View Clubs info',
                    },
                ],
            },
            {
                key: 'Job Title',
                label: 'Job Title',
                children: [
                    {
                        key: 'ADD-JOB-TITLE',
                        label: 'Add Job title',
                    },
                    {
                        key: 'VIEW-JOB-TITLE',
                        label: 'View Job Title',
                    },
                    {
                        key: 'DELETE-JOB-TITLE',
                        label: 'Delete Job title',
                    },
                    {
                        key: 'EDIT-JOB-TITLE',
                        label: 'Edit Job title',
                    },
                ],
            },
        ],
    },
    {
        department: 'Site Set-up ',
        permissions: [
            {
                key: 'REQUEST-EDIT-BRANDING-COLORS-LOGOS',
                label: 'Request Edit Branding Colors/logos ',
            },
            {
                key: 'EDIT-BRANDING-COLORS-LOGOS',
                label: 'Edit Branding colors/logos',
            },
            {
                key: 'REQUEST-EDIT-TAB-LAYOUTS-DEPARTMENTS',
                label: 'Request Edit tab layouts-Department',
            },
            {
                key: 'EDIT-TAB-LAYOUTS-DEPARTMENT',
                label: 'Edit tab layouts-department',
            },
            {
                key: 'REQUEST-EDIT-TAB-LAYOUTS-ALL',
                label: 'Request Edit tab layouts-All ',
            },
            {
                key: 'EDIT-TAB-LAYOUTS-ALL',
                label: 'Edit tab layouts-All',
            },
        ],
    },
    {
        department: 'Alerts',
        permissions: [
            {
                key: 'REQUEST-EDIT-ALERT-TYPES',
                label: 'Request Edit Alert Types',
            },
            {
                key: 'EDIT-ALERT-TYPES',
                label: 'Edit Alert Types',
            },
            {
                key: 'ADD-ALERT-TYPES',
                label: 'Add Alert types',
            },
            {
                key: 'SUGGESTION',
                label: 'Suggestion',
            },
        ],
    },
    {
        department: 'Employees',
        expended: {
            'Staff Set-up': true,
            'Staff Action Verification': true,
            'Staff Payroll': true,
            'Staff Scheduling': true,
            Departments: true,
            'Staff Security': true,
            Commission: true,
        },
        permissions: [
            {
                key: 'Staff Set-up',
                label: 'Staff Set-up',
                children: [
                    {
                        key: 'VIEW-ALL-STAFF-BASIC-INFORMATION',
                        label: 'View All Staff Basic Information',
                    },
                    {
                        key: 'VIEW-ALL-STAFF-PAYROLL-INFORMATION',
                        label: 'View All Staff Payroll Information',
                    },
                    {
                        key: 'CREATE-NEW-STAFF',
                        label: 'Create New Staff',
                    },
                    {
                        Key: 'EDIT_STAFF_INFO',
                        label: 'Edit Staff Info',
                    },
                    {
                        key: 'DELETE-STAFF_INFO',
                        label: 'Delete Staff',
                    },
                ],
            },
            {
                key: 'Staff Action Verification',
                label: 'Staff Action Verification',
                children: [
                    {
                        key: 'VIEW-EMPLOYEE-ACCESS-CODES',
                        label: 'View Employee Access Codes',
                    },
                    {
                        key: 'EDIT-EMPLOYEE-ACCESS-CODES',
                        label: 'Edit Employee Access Codes',
                    },
                ],
            },
            {
                key: 'Staff Payroll',
                label: 'Staff Payroll',
                children: [
                    {
                        key: 'VIEW-TIMESHEETS-ALL',
                        label: 'View Timesheets All',
                    },
                    {
                        key: 'VIEW-TIMESHEETS-INDIVIDUAL',
                        label: 'View Timesheets-Individual',
                    },
                    {
                        key: 'TIMESHEETS-CHANGE-REQUEST-INDIVIDUAL',
                        label: 'Timesheets Change Request - Individual',
                    },
                    {
                        key: 'TIMESHEETS-CHANGE-REQUEST-ALL',
                        label: 'Timesheets Change Request - All',
                    },
                    {
                        key: 'EDIT-TIMESHEETS-ALL',
                        label: 'Edit Timesheets-All',
                    },
                ],
            },
            {
                key: 'Staff Scheduling',
                label: 'Staff Scheduling',
                children: [
                    {
                        key: 'VIEW-STAFF-SHIFT-SCHEDULE',
                        label: 'View Staff Shift Schedule',
                    },
                    {
                        key: 'REQUEST-EDIT-STAFF-SHIFT-SCHEDULE',
                        label: 'Request Edit Staff Shift Schedule',
                    },
                    {
                        key: 'EDIT-STAFF-SHIFT-SCHEDULE',
                        label: 'Edit Staff Shift Schedule',
                    },
                    {
                        key: 'REQUEST-COVER-SCHEDULE-INDIVIDUAL',
                        label: 'Request Cover Schedule-Individual',
                    },
                    {
                        key: 'REQUEST-COVER-SCHEDULE-ALL',
                        label: 'Request Cover Schedule- All ',
                    },
                    {
                        key: 'REQUEST-EDIT-AVAILABILTY-INDIVIDUAL',
                        label: 'Request Edit Availability- Individual',
                    },
                    {
                        key: 'REQUEST-EDIT-AVAILABILITY-ALL',
                        label: 'Request Edit Availability- All',
                    },
                    {
                        key: 'EDIT-AVAILABILITY-ALL',
                        label: 'Edit Availability- All',
                    },
                ],
            },
            {
                key: 'Departments',
                label: 'Departments',
                children: [
                    {
                        key: 'VIEW-DEPARTMENTS',
                        label: 'View Departments',
                    },
                    {
                        key: 'REQUEST-EDIT-DEPARTMENTS',
                        label: 'Request Edit Departments',
                    },
                    {
                        key: 'EDIT-DEPARTMENTS',
                        label: 'Edit Departments',
                    },
                    {
                        key: 'DELETE-DEPARTMENTS',
                        label: 'Delete Departments',
                    },
                    {
                        key: 'REQUEST-CREATE-DEPARTMENTS',
                        label: 'Request Create Departments',
                    },
                    {
                        key: 'CREATE-DEPARTMENTS',
                        label: 'Create Departments',
                    },
                ],
            },
            {
                key: 'Staff Security',
                label: 'Staff Security',
                children: [
                    {
                        key: 'ADD-SECURITY-ROLE',
                        label: 'Add Security Role',
                    },
                    {
                        key: 'DELETE-SECURITY-ROLE',
                        label: 'Delete Security Role ',
                    },
                    {
                        key: 'REQUEST-EDIT-SECURITY-ROLES',
                        label: 'Request Edit Security Roles',
                    },
                    {
                        key: 'EDIT-SECURITY-ROLES',
                        label: 'Edit Security Roles',
                    },
                    {
                        key: 'ADD-REPORT-SECURITY',
                        label: 'Add Report Security',
                    },
                    {
                        key: 'EDIT-REPORT-SECURITY',
                        label: 'Edit Report Security',
                    },
                ],
            },
            {
                key: 'Commission',
                label: 'Commission',
                children: [
                    {
                        key: 'VIEW-COMMISSION',
                        label: 'View Commission',
                    },
                    {
                        key: 'REQUEST-EDIT-COMMISSION',
                        label: 'Request Edit Commission',
                    },
                    {
                        key: 'EDIT-COMMISSION',
                        label: 'Edit Commission',
                    },
                    {
                        key: 'DELETE-COMMISSION-GROUP',
                        label: 'Delete Commission Group',
                    },
                    {
                        key: 'CREATE-COMMISSION-GROUP',
                        label: 'Create Commission Group',
                    },
                    {
                        key: 'REQUEST-CREATE-COMMISSION-GROUP',
                        label: 'Requests Create Commission Group',
                    },
                    {
                        key: 'EDIT-COMMISSION-GROUP',
                        label: 'Edit Commission Group',
                    },
                    {
                        key: 'REQUEST-EDIT-COMMISSION-GROUP',
                        label: 'Request Edit Commission Group',
                    },
                    {
                        key: 'CREATE-COMMISSION',
                        label: 'Create Commission',
                    },
                    {
                        key: 'REQUEST-CREATE-COMMISSION',
                        label: 'Request Create Commission',
                    },
                ],
            },
        ],
    },
    {
        department: 'Member Set-up',
        expended: { 'Request Edit Membership Types': true, 'Membership types': true },
        permissions: [
            {
                key: 'VIEW-MEMBERSHIP-TYPES',
                label: 'View membership Types',
            },
            {
                key: 'Request Edit Membership Types',
                label: 'Request Edit Membership Types',
                children: [
                    {
                        key: 'REQUEST-EDIT-DISCOUNTS',
                        label: 'Request Edit Discounts',
                    },
                    {
                        key: 'REQUEST-EDIT-SERVICE-ACCESS',
                        label: 'Request Edit Service Access',
                    },
                    {
                        key: 'REQUEST-EDIT-ENTRY-ACCESS',
                        label: 'Request Edit Entry Access',
                    },
                ],
            },
            {
                key: 'Membership types',
                label: 'Membership types',
                children: [
                    {
                        key: 'DISCOUNTS',
                        label: 'Discounts',
                    },
                    {
                        key: 'SERVICE-ACCESS',
                        label: 'Service Access',
                    },
                    {
                        key: 'ENTRY-ACCESS',
                        label: 'Entry Access',
                    },
                ],
            },
            { key: 'REQUEST-CREATE-MEMBERSHIP-TYPE', label: 'Requests create membership type' },
            { key: 'CREATE-MEMBERSHIP-TYPES', label: 'Create Membership Types' },
            { key: 'DELETE-MEMBERSHIP-TYPES', label: 'Delete Membership Types' },
            { key: 'REQUEST-EDIT-FREEZE-POLICY', label: 'Request Edit Freeze Policy' },
            { key: 'FREEZE-POLICY', label: 'Freeze Policy' },
            { key: 'EDIT-FREEZE-POLICY', label: 'Edit Freeze Policy' },
            { key: 'ADD-FREEZE-POLICY', label: 'Add Freeze Policy' },
            { key: 'OVERRIDE-FREEZE-POLICY', label: 'Override Freeze Policy' },
        ],
    },
    {
        department: 'Contracts',
        permissions: [
            { key: 'VIEW-ASSESSED-FEES', label: 'View Assessed fees' },
            { key: 'CREATE-ASSESSED-FEES', label: 'Create Assessed fees' },
            { key: 'EDIT-ASSESSED-FEES', label: 'Edit Assessed fees' },
            { key: 'VIEW-AGREEMENT-TEMPLATES', label: 'View Agreement Templates' },
            { key: 'CREATE-AGREEMENT-TEMPLATES', label: 'Create Agreement Templates' },
            { key: 'EDIT-AGREEMENT-TEMPLATES', label: 'Edit Agreement Templates' },
            { key: 'DELETE-AGREEMENT-TEMPLATES', label: 'Delete Agreement Templates' },
            { key: 'REQUEST-EDIT-PAYMENT-PLANS-TYPE', label: 'Request Edit Payment Plans- By Type' },
            { key: 'REQUEST-CREATE-PAYMENT-PLANS-TYPE', label: 'Requests create Payment Plans- By Type ' },
            { key: 'CREATE-NEW-PAYMENT-PLANS-TYPE', label: 'Create new Payment Plans – By Type ' },
            { key: 'COPY-PAYMENT-PLANS-TYPE', label: 'Copy Payment Plans -By Type ' },
            { key: 'EDIT-PAYMENT-PLANS-TYPE', label: 'Edit Payment Plans - By Type ' },
            { key: 'VIEW-AGREEMENT-PROMOTIONS', label: 'View Agreement Promotions' },
            { key: 'CREATE-AGREEMENT-PROMOTIONS', label: 'Create Agreement Promotions' },
            { key: 'EDIT-AGREEMENT-PROMOTIONS', label: 'Edit Agreement Promotions' },
            { key: 'DELETE-AGREEMENT-PROMOTIONS', label: 'Delete Agreement Promotions' },
        ],
    },
    {
        department: 'Members',
        permissions: [
            { key: 'VIEW-ALL-MEMBERS', label: 'View all members' },
            { key: 'VIEW-ASSIGNED-CLIENTS-ONLY', label: 'View Assigned Clients Only' },
            { key: 'QUICK-ENROLL', label: 'Quick Enroll' },
            { key: 'VIEW-PERSONAL', label: 'View Personal' },
            { key: 'EDIT-PERSONAL-INFORMATION', label: 'Edit Personal Information' },
            { key: 'EDIT-MEMBERSHIP-INFO', label: 'Edit Membership info' },
            { key: 'EDIT-ACCESS-CODE', label: 'Edit Access Code ' },
            { key: 'VIEW-AGREEMENTS', label: 'View Agreements' },
            { key: 'VIEW-PAYMENT-METHODS', label: 'View Payment Methods' },
            { key: 'EDIT-PAYMENT-METHODS', label: 'Edit Payment Methods' },
            { key: 'CREATE-NEW-PAYMENT-METHOD', label: 'Create New Payment Method' },
            { key: 'VIEW-ALERTS', label: 'View Alerts' },
            { key: 'EDIT-ALERTS', label: 'Edit Alerts' },
            { key: 'VIEW-BILLING-HISTORY', label: 'View Billing History' },
            { key: 'VIEW-CHECK-INS-HISTORY', label: 'View Check ins history' },
            { key: 'VIEW-NOTES', label: 'View Notes' },
            { key: 'VIEW-TASKS', label: 'View Tasks' },
            { key: 'VIEW-SERVICES', label: 'View Services' },
            { key: 'VIEW-DOCUMENTS', label: 'View Documents' },
        ],
    },
    {
        department: 'Check in',
        permissions: [
            { key: 'ACCESS-CHECK-IN', label: 'Access check in' },
            { key: 'LOOK-UP-CLIENT', label: 'Look up client' },
            { key: 'EDIT-CLIENT-ALERTS', label: 'Edit client alerts' },
            { key: 'REQUEST-EDIT-CLIENT-ALERTS', label: 'Request Edit client alerts' },
            { key: 'DEDUCT-SERVICE-FROM-CHECK-IN', label: 'Deduct Service from check-in' },
        ],
    },
    {
        department: 'Resources',
        expended: { 'Reserve Resources': true },
        permissions: [
            { key: 'VIEW-RESOURCE-TYPE', label: 'View Resource Type' },
            { key: 'CREATE-RESOURCE-TYPE', label: 'Create Resurce Type' },
            { key: 'EDIT-RESOURCE-TYPE', label: 'Edit Resource Type' },
            { key: 'DELETE-RESOURCE-TYPE', label: 'Delete Resource Type' },
            { key: 'VIEW-RESOURCES', label: 'View resources' },
            { key: 'REQUEST-EDIT-RESOURCES', label: 'Request Edit resources' },
            { key: 'EDIT-RESOURCES', label: 'Edit Resources' },
            { key: 'CREATE-RESOURCES', label: 'Create Resources' },
            { key: 'REQUEST-RESOURCES', label: 'Request resources' },
            {
                key: 'Reserve Resources',
                label: 'Reserve Resources',
                children: [
                    {
                        key: 'VIEW-RESOURCE-RESERVES',
                        label: 'View resource Reserves',
                    },
                    {
                        key: 'EDIT-RESOURCE-RESERVES',
                        label: 'Edit resource Reserves',
                    },
                    {
                        key: 'REQUEST-EDIT-RESOURCE-RESERVES',
                        label: 'Request Edit resource Reserves',
                    },
                    {
                        key: 'REQUEST-RESERVATION-OF-RESOURCES',
                        label: 'Request reservation of Resources',
                    },
                    {
                        key: 'RESERVE-RESOURCE',
                        label: 'Reserve Resource',
                    },
                    {
                        key: 'RETURN-RESOURCE',
                        label: 'Return Resource',
                    },
                ],
            },
        ],
    },
    {
        department: 'Event Set-up',
        permissions: [
            { key: 'REQUEST-EDIT-EVENT-CATEGORIES', label: 'Request edit Event Categories' },
            { key: 'EDIT-EVENT-CATEGORIES', label: 'Edit Event Categories' },
            { key: 'CREATE-EVENT-CATEGORIES', label: 'Create Event Categories' },
            { key: 'REQUEST-EVENT-CATEGORIES', label: 'Request event Categories' },
            { key: 'DELETE-EVENT-CATEGORIES', label: 'Delete Event Categories' },
            { key: 'VIEW-EVENTS', label: 'View Events' },
            { key: 'CREATE-EVENTS', label: 'Create Events' },
            { key: 'EDIT-EVENTS', label: 'Edit Events' },
            { key: 'DELETE-EVENTS', label: 'Delete Events' },
            { key: 'VIEW-LEVELS', label: 'View Levels' },
            { key: 'CREATE-LEVELS', label: 'Create Levels' },
            { key: 'EDIT-LEVELS', label: 'Edit Levels' },
            { key: 'DELETE-LEVELS', label: 'Delete Levels' },
            { key: 'VIEW-LOCATION-TYPE', label: 'View Location Type' },
            { key: 'CREATE-LOCATION-TYPE', label: 'Create Location Type' },
            { key: 'EDIT-LOCATION-TYPE', label: 'Edit Location Type' },
            { key: 'DELETE-LOCATION-TYPE', label: 'Delete Location Type' },
            { key: 'VIEW-LOCATIONS', label: 'View Locations' },
            { key: 'CREATE-LOCATIONS', label: 'Create Locations' },
            { key: 'EDIT-LOCATIONS', label: 'Edit Locations' },
            { key: 'DELETE-LOCATIONS', label: 'Delete Locations' },
            { key: 'CREATE-CLASS', label: 'Create Class' },
        ],
    },
    {
        department: 'Events',
        permissions: [
            { key: 'VIEW-ALL-SCHEDULE', label: 'View all schedule' },
            { key: 'VIEW-ONLY-INDIVIDUAL-SCHEDULE', label: 'View only individual’s schedule' },
            { key: 'BOOK-NEW-APPOINTMENT', label: 'Book new appointment' },
            { key: 'SCHEDULE-CLASSES', label: 'Schedule Classes' },
            { key: 'REQUEST-SCHEDULE-CLASS', label: 'Request schedule class' },
            { key: 'EDIT-INSTRUCTOR-CLASSES', label: 'Edit Instructor Classes' },
            { key: 'EDIT-INSTRUCTOR-EVENTS', label: 'Edit Instructor Events' },
            { key: 'REQUEST-EDIT-INSTRUCTOR-CLASSES', label: 'Request Edit Instructor Classes' },
            { key: 'REQUEST-EDIT-INSTRUCTOR-EVENTS', label: 'Request Edit Instructor Events' },
            { key: 'EDIT-SCHEDULED-CLASSES', label: 'Edit scheduled Classes' },
            { key: 'EDIT-SCHEDULED-EVENTS', label: 'Edit Scheduled Events' },
            { key: 'REQUEST-EDIT-CLASSES', label: 'Request Edit Classes' },
            { key: 'RESCHEDULE-APPOINTMENT', label: 'Reschedule Appointment' },
            { key: 'EDIT-COMPLETE-EVENT', label: 'Edit Completed Event' },
            { key: 'REQUEST-EDIT-COMPLETED-EVENT', label: 'Request edit completed event' },
            { key: 'EDIT-PAST-EVENT', label: 'Edit Past Event' },
            { key: 'REQUEST-EDIT-PAST-EVENT', label: 'Request edit past event' },
            { key: 'CANCEL-EVENT-OUTSIDE', label: 'Cancel Event outside of cancellation window ' },
            { key: 'REQUEST-CANCEL-EVENT-OUTSIDE', label: 'Request Cancel event outside of cancellation window' },
        ],
    },
    {
        department: 'Pos',
        expended: { 'Catalog Access': true, 'POS Register': true },

        permissions: [
            {
                key: 'Catalog Access',
                label: 'Catalog Access',
                children: [
                    {
                        key: 'REQUEST-EDIT-PROFIT-CENTER',
                        label: 'Request Edit Profit Center',
                    },
                    {
                        key: 'EDIT-PROFIT-CENTER',
                        label: 'Edit Profit Center',
                    },
                    {
                        key: 'ADD-PROFIT-CENTER',
                        label: 'Add Profit Center',
                    },
                    {
                        key: 'REQUEST-PROFIT-CENTER',
                        label: 'Request Profit Center',
                    },
                    {
                        key: 'VIEW-POS-ITEMS',
                        label: 'View POS Items',
                    },
                    {
                        key: 'REQUEST-EDIT-POS-ITEMS',
                        label: 'Request Edit POS Items',
                    },
                    {
                        key: 'EDIT-POS-ITEMS',
                        label: 'Edit POS Items',
                    },
                    {
                        key: 'REQUEST-POS-ITEMS',
                        label: 'Request POS Items',
                    },
                    {
                        key: 'CREATE-POS-ITEMS',
                        label: 'Create POS Items',
                    },
                    {
                        key: 'DELETE-POS-ITEMS',
                        label: 'Delete Pos Items',
                    },
                    {
                        key: 'CREATE-POS-CATEGORIES',
                        label: 'Create POS Categories',
                    },
                    {
                        key: 'EDIT-POS-CATEGORIES',
                        label: 'Edit POS categories',
                    },
                    {
                        key: 'VIEW-POS-CATEGORIES',
                        label: 'View POS Categories',
                    },

                    {
                        key: 'DELETE-POS-CATEGORIES',
                        label: 'Delete Pos Categories',
                    },
                    {
                        key: 'CREATE-DISCOUNTS',
                        label: 'Create Discounts',
                    },
                    {
                        key: 'REQUEST-DISCOUNTS',
                        label: 'Request Discounts',
                    },
                    {
                        key: 'EDIT-DISCOUNTS',
                        label: 'Edit Discounts',
                    },
                    {
                        key: 'REQUESTS-EDIT-DISCOUNT',
                        label: 'Request Edit Discounts',
                    },
                    {
                        key: 'INVENTORY-TRACKING-EDIT-CURRENT-COUNT',
                        label: 'Inventory Tracking Edit Current Count',
                    },
                    {
                        key: 'INVENTORY-TRACKING-REQUEST-CURRENT-COUNT',
                        label: 'Inventory Tracking Request Current Count',
                    },
                    {
                        key: 'INVENTORY-TRACKING-EDIT-VENDORS',
                        label: 'Inventory Tracking Edit Vendors',
                    },
                    {
                        key: 'INVENTORY-TRACKING-REQUEST-EDIT-VENDORS',
                        label: 'Inventory Tracking Request Edit Vendors',
                    },
                    {
                        key: 'INVENTORY-TRACKING-CREATE-NEW-VENDORS',
                        label: 'Inventory Tracking Create New Vendors',
                    },
                    {
                        key: 'INVENTORY-TRACKING-REQUEST-NEW-VENDORS',
                        label: 'Inventory Tracking Request New Vendors',
                    },
                    {
                        key: 'INVENTORY-TRACKING-ACCESS-WHOLESALE-COSTS',
                        label: 'Inventory Tracking Access Wholesale Costs',
                    },
                    {
                        key: 'INVENTORY-TRACKING-EDIT-WHOLESALE-COSTS',
                        label: 'Inventory Tracking Edit wholesale costs',
                    },
                    {
                        key: 'POS Register',
                        label: 'POS Register',
                        children: [
                            {
                                key: 'VIEW-DRAWER-SUMMARY-CURRENT',
                                label: 'View Drawer Summary Current',
                            },
                            {
                                key: 'VIEW-DRAWER-SUMMARY-ALL',
                                label: 'View Drawer Summary All',
                            },
                            {
                                key: 'VIEW-PAST-DRAWERS',
                                label: 'View Past Drawers',
                            },
                            {
                                key: 'PRINT-DRAWER-REPORTS',
                                label: 'Print Drawer Reports',
                            },
                            {
                                key: 'CLOSE-OUT-REGISTER',
                                label: 'Close Out Register',
                            },
                            {
                                key: 'ADD-DROP',
                                label: 'Add/ Drop',
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

export const convertToBackendPermissions = (backend, selectedOnFrontend) => {
    const selectedKeys = Object.keys(selectedOnFrontend);
    const permissionsForBE = [];
    backend.forEach((dept) =>
        dept.permissions.forEach((p) => {
            if (selectedKeys.includes(p)) {
                let ind = permissionsForBE.findIndex((obj) => obj.name === dept.name);
                if (ind === -1) {
                    permissionsForBE.push({
                        name: dept.name,
                        permissions: [p],
                    });
                } else {
                    permissionsForBE[ind].permissions = [...permissionsForBE[ind].permissions, p];
                }
            }
        }),
    );
    return permissionsForBE;
};
