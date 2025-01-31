export const types = {
    SHOW_LOADER: 'SHOW_LOADER',
    HIDE_TABLE_LOADER: 'HIDE_TABLE_LOADER',
    HIDE_LOADER: 'HIDE_LOADER',
    SHOW_TABLE_LOADER: 'SHOW_TABLE_LOADER',
    SHOW_TOAST: 'SHOW_TOAST',
    PROFILE: 'PROFILE',
    CHANGE_COMPANY: 'CHANGE_COMPANY',
    CHANGE_REASON_CODE: 'CHANGE_REASON_CODE',
    CHANGE_NO_SALE_REASONS: 'CHANGE_NO_SALE_REASONS',
    CHANGE_JOB_TITLE: 'CHANGE_JOB_TITLE',
    CHANGE_CLUBS: 'CHANGE_CLUBS',

    //EMPLOYEES
    CHANGE_EMPLOYEES: 'CHANGE_EMPLOYEES',

    CHANGE_PERMISSIONS: 'CHANGE_PERMISSIONS',
    CHANGE_SECURITY_ROLES: 'CHANGE_SECURITY_ROLES',

    CHANGE_DEPARTMENTS: 'CHANGE_DEPARTMENTS',
    CHANGE_MANAGE_EMPLOYEE_CERTIFICATES: 'CHANGE_MANAGE_EMPLOYEE_CERTIFICATES',
    CHANGE_ALL_MEMBERS: 'CHANGE_ALL_MEMBERS',
    CHANGE_EMPLOYEES_PAY_TYPE: 'CHANGE_EMPLOYEES_PAY_TYPE',
    CHANGE_EMPLOYEE_CLASSES: 'CHANGE_EMPLOYEE_CLASSES',
    CHANGE_EMPLOYEE_APPOINTMENT_PAY: 'CHANGE_EMPLOYEE_APPOINTMENT_PAY',
    CHANGE_EMPLOYEES_FILTER_TYPE: 'CHANGE_EMPLOYEES_FILTER_TYPE',
    EMPLOYEE_SALES_CODE: 'EMPLOYEE_SALES_CODE',
    CHANGE_EMPLOYEE_TIMESHEET: 'CHANGE_EMPLOYEE_TIMESHEET',
    CHANGE_ALL_EMPLOYEE_TIMESHEET: 'CHANGE_ALL_EMPLOYEE_TIMESHEET',
    CHANGE_EMPLOYEE_CLUBS: 'CHANGE_EMPLOYEE_CLUBS',
    CHANGE_EMPLOYEE_AVAILABILITY: 'CHANGE_EMPLOYEE_AVAILABILITY',

    //Schedule

    CHANGE_LEVELS: 'CHANGE_LEVELS',
    CHANGE_LOCATION_TYPE: 'CHANGE_LOCATION_TYPE',
    CHANGE_LOCATIONS: 'CHANGE_LOCATIONS',
    CHANGE_SCHEDULE_EVENTS: 'CHANGE_SCHEDULE_EVENTS',
    CHANGE_SCHEDULE_SERVICES_EVENTS: 'CHANGE_SCHEDULE_SERVICES_EVENTS',
    CHANGE_EVENT_CATEGORIES: 'CHANGE_EVENT_CATEGORIES',
    CHANGE_CLASSES: 'CHANGE_CLASSES',
    CHANGE_SCHEDULING_OPTIONS: 'CHANGE_SCHEDULING_OPTIONS',

    //members Settings

    CHANGE_COMPAIGNS_GROUP: 'CHANGE_COMPAIGNS_GROUP',
    CHANGE_COMPAIGNS: 'CHANGE_COMPAIGNS',
    CHANGE_RESOURCE_TYPE: 'CHANGE_RESOURCE_TYPE',
    CHANGE_RESOURCES: 'CHANGE_RESOURCES',
    CHANGE_ACCESS_SCHEDULE: 'CHANGE_ACCESS_SCHEDULE',
    CHANGE_MEMBERSHIP_TYPES: 'CHANGE_MEMBERSHIP_TYPES',
    CHANGE_CAMPAIGN_TYPES: 'CHANGE_CAMPAIGN_TYPES',

    // Agreement

    CHANGE_AGREEMENT_CATEGORY: 'CHANGE_AGREEMENT_CATEGORY',
    CHANGE_AGREEMENT_TEMPLATE: 'CHANGE_AGREEMENT_TEMPLATE',
    CHANGE_ASSESSED_FEES: 'CHANGE_ASSESSED_FEES',
    CHANGE_MEMBERSHIP_PLAN: 'CHANGE_MEMBERSHIP_PLAN',
    CHANGE_AGREEMENT_PROMOTION: 'CHANGE_AGREEMENT_PROMOTION',

    // inventory
    CHANGE_REFERRAL_GROUPS: 'CHANGE_REFERRAL_GROUPS',
    CHANGE_COMMISSION_GROUPS: 'CHANGE_COMMISSION_GROUPS',
    CHANGE_VENDORS: 'CHANGE_VENDORS',
    CHANGE_CATEGORIES: 'CHANGE_CATEGORIES',
    CHANGE_FILTER_SETS: 'CHANGE_FILTER_SETS',
    CHANGE_TAGS: 'CHANGE_TAGS',

    CHANGE_PROFIT_CENTERS: 'CHANGE_PROFIT_CENTERS',
    CHANGE_POS_CATALOG_ITEMS: 'CHANGE_POS_CATALOG_ITEMS',
    CHANGE_CATALOG_ITEMS: 'CHANGE_CATALOG_ITEMS',
    CHANGE_CATALOG_ITEMS_FILTER: 'CHANGE_CATALOG_ITEMS_FILTER',
    CHANGE_INVENTORY_CATALOG_VARIATION: 'CHANGE_INVENTORY_CATALOG_VARIATION',
    CHANGE_TAXES: 'CHANGE_TAXES',
    CHANGE_PAYMENT_METHODS: 'CHANGE_PAYMENT_METHODS',

    // POS
    CHANGE_DISCOUNT_TYPES: 'CHANGE_DISCOUNT_TYPES',
    CHANGE_RECENT_SUGGESSIONS: 'CHANGE_RECENT_SUGGESSIONS',
    CHANGE_REGISTERS: 'CHANGE_REGISTERS',

    //members

    CHANGE_MEMBERS: 'CHANGE_MEMBERS',
    CHANGE_SERVICES: 'CHANGE_SERVICES',
    CHANGE_AGREEMENT: 'CHANGE_AGREEMENT',
    CHANGE_DOCUMENTS: 'CHANGE_DOCUMENTS',

    //Plans

    CHANGE_DRAFTS: 'CHANGE_DRAFTS',

    //Dashboard
    CHANGE_DASHBOARD: 'CHANGE_DASHBOARD',

    //POS

    CHANGE_POS_REGISTERS: 'CHANGE_POS_REGISTERS',
    CHANGE_PROMO_CODE: 'CHANGE_PROMO_CODE',
    CLEAR_POS_PROMO: 'CLEAR_POS_PROMO',

    //check in
    CHANGE_CHECK_IN: 'CHANGE_CHECK_IN',
    CHANGE_RECENT_CHECK_IN: 'CHANGE_RECENT_CHECK_IN',
    RECENT_CHECK_IN_MEMBER: 'RECENT_CHECK_IN_MEMBER',
    CHANGE_RESOURCES_LIST: 'CHANGE_RESOURCES_LIST',

    //more

    CHANGE_DRAWERS: 'CHANGE_DRAWERS',
    CHANGE_CLUB: 'CHANGE_CLUB',

    // Members

    MEMBER: {
        MEMBER: 'MEMBER',
        VIEW_MEMBER: 'VIEW_MEMBER',
        MEMBER_DATA: 'MEMBER_DATA',
        CHECK_IN: 'CHECK_IN',
        AGREEMENT: 'AGREEMENT',
        SERVICES: 'SERVICES',
        RESET_MEMBER_DATA: 'RESET_MEMBER_DATA',
        DOCUMENTS: 'DOCUMENTS',
        NOTES: 'NOTES',
        TASK: 'TASK',
        ALERT: 'ALERT',
        TRANSACTIONS: 'TRANSACTIONS',
    },

    POS: {
        SELECT_DRAWER: 'SELECT_DRAWER',
        REGISTER: 'REGISTER',
        REGISTER_STATUS: 'REGISTER_STATUS',
        REGISTER_SUMMARY: 'REGISTER_SUMMARY',
        SAVED_CART: 'SAVED_CART',
        CATEGORY: 'CATEGORY',
        CATELOG: 'CATELOG',
        MEMBER: 'MEMBER',
        RECENT_MEMBER: 'RECENT_MEMBER',
        RECEIPT: 'RECEIPT',
        NO_SALE_REASON_CODE: 'NO_SALE_REASON_CODE',
    },

    SETTINGS: {
        POS: {
            TAX: 'TAX',
            PAYMENT_METHOD: 'PAYMENT_METHOD',
            REGISTER: 'REGISTER',
            DISCOUNT: 'DISCOUNT',
        },
        INVENTORY: {
            CATELOG: 'CATELOG',
            PROFIT_CENTER: 'PROFIT_CENTER',
            CATEGORY: 'CATEGORY',
            VENDORS: 'VENDORS',
            COMMISSION_GROUP: 'COMMISSION_GROUP',
            REFERRAL_GROUP: 'REFERRAL_GROUP',
            PRE_PAY: 'PRE_PAY',
        },
        MEMBER_SETUP: {
            MEMEBERSHIP_TYPE: 'MEMEBERSHIP_TYPE',
            CAMPAIGN: 'CAMPAIGN',
            CAMPAIGN_GROUP: 'CAMPAIGN_GROUP',
            ACCESS_SCHEDULE: 'ACCESS_SCHEDULE',
            RESOURCE_TYPE: 'RESOURCE_TYPE',
            RESOURCE: 'RESOURCE',
        },
        AGREEMENT_SETUP: {
            ASSESSED_FEE: 'ASSESSED_FEE',
            AGREEMENT_TEMPLATE: 'AGREEMENT_TEMPLATE',
            AGREEMENT_PLAN: 'AGREEMENT_PLAN',
            AGREEMENT_CATEGORY: 'AGREEMENT_CATEGORY',
            AGREEMENT_PROMOTION: 'AGREEMENT_PROMOTION',
        },
        BUSINESS: {
            COMPANY: 'COMPANY',
            REASON_CODE: 'REASON_CODE',
            JOB_TITLE: 'JOB_TITLE',
            CLUBS: 'CLUBS',
        },
        SCHEDULE_SETUP: {
            LEVEL: 'LEVEL',
            LOCATION_TYPE: 'LOCATION_TYPE',
            LOCATION: 'LOCATION',
            EVENT_SETUP: 'EVENT_SETUP',
            SCHEDULE_EVENTS_LEVEL: 'SCHEDULE_EVENTS_LEVEL',
            EVENT_CATEGORY: 'EVENT_CATEGORY',
            CLASS: 'CLASS',
            SCHEDULE_OPTION: 'SCHEDULE_OPTION',
        },
        MANAGE_EMPLOYEE: {
            GENERAL: 'GENERAL',
            DEPARTMENT: 'DEPARTMENT',
        },
    },
    PLANS: {
        ACTIVE: 'ACTIVE',
        DRAFT: 'DRAFT',
    },
    CALENDAR: {
        EVENTS: 'EVENTS',
        LOCATIONS: 'LOCATIONS',
        CLASSES: 'CLASSES',
        RESOURCES: 'RESOURCES',
        BOOKING: 'BOOKING',
        BOOK_EVENTS: 'BOOK_EVENTS',
        BOOK_EVENT: 'BOOK_EVENT',
    },
    CHANGE_ATTENDANCE_CHECK_IN: 'CHANGE_ATTENDANCE_CHECK_IN',
    CHANGE_TASK: 'CHANGE_TASK',
};
