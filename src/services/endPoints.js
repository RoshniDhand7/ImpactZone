const endPoints = {
    PLANS: {
        PLAN: '/plans/',
        ACTIVE: '/plans/active/',
        MEMBER: '/plans/member/',
        AGREEMENT: '/plans/agreement/',
    },
    SETTINGS: {
        POS: {
            REGISTER: '/settings/pos/register/',
        },
        MEMBER_SETUP: {
            MEMBERSHIP_TYPE: '/settings/member-setup/membership-type/',
            MEMBERSHIP_TYPE_REORDER_PRIORITY: '/settings/member-setup/membership-type/reorder-priority/',
            CAMPAIGN: '/settings/member-setup/campaign/',
            CAMPAIGN_GROUP: '/settings/member-setup/campaign-group/',
            ACCESS_SCHEDULE: '/settings/member-setup/access-schedule/',
            RESOURCE_TYPE: '/settings/member-setup/resource-type/',
            RESOURCE: '/settings/member-setup/resource/',
        },
        //BUSINESS
        BUSINESS: {
            COMPANY: '/settings/business/company/',
            REASON_CODE: '/settings/business/reason-code/',
            CLUBS: '/clubs/',
            JOB_TITLE: '/title/',
            DEFAULT_SETTING: '/default-setting/',
        },

        //AGREEMENT SETUP
        AGREEMENT_SETUP: {
            AGREEMENT_TEMPLATE: '/settings/agreement-setup/agreement-template/',
            AGREEMENT_CATEGORY: '/settings/agreement-setup/agreement-category/',
            ASSESSED_FEE: '/settings/agreement-setup/assessed-fee/',
            AGREEMENT_PLAN: '/settings/agreement-setup/agreement-plan/',
            AGREEMENT_PROMOTION: '/settings/agreement-setup/agreement-promotion/',
        },

        //SCHEDULE SETUP
        SCHEDULE_SETUP: {
            LEVEL: '/settings/schedule-setup/level/',
            LOCATION_TYPE: '/settings/schedule-setup/location-type/',
            LOCATION: '/settings/schedule-setup/location/',
            EVENT_SETUP: '/settings/schedule-setup/event-setup/',
            EVENT_CATEGORY: '/settings/schedule-setup/event-category/',
            SCHEDULE_OPTION: '/settings/schedule-setup/schedule-option/',
            CLASS: '/settings/schedule-setup/class/',
            SCHEDULE_EVENTS_LEVEL: '/settings/schedule-setup/event-setup/level-services/',
            SCHEDULE_EVENT_LEVEL: '/settings/schedule-setup/event-setup/level-service/',
        },
        INVENTORY_SETUP: {
            PRE_PAY: '/settings/inventory-setup/pre-pay/',
        },
        MANAGE_EMPLOYEE: {
            GENERAL: '/settings/manage-employee/general/',
            DEPARTMENT: '/settings/manage-employee/department/',
        },
    },
    POS: {
        SALE: '/point-of-sale/sale/',
        RETURN: '/point-of-sale/sale/return/',
        VOID: '/point-of-sale/sale/void/',
        REGISTER: '/point-of-sale/registers/',
        REGISTER_STATUS: '/point-of-sale/registers/status',
        ADD_DROP: '/point-of-sale/add-drop',
        NO_SALE_REASON_CODE: '/point-of-sale/no-sale/reason-code',
        NO_SALE: '/point-of-sale/no-sale',
        CATALOG: '/point-of-sale/catalog',
    },
    VALIDATE_ACCESS_CODE: '/validate-access-code/',
    //member
    MEMBERS_V2: {
        MEMBERS: '/memberV2/',
        MEMBER: '/memberV2/detail/',
        SERVICES: '/memberV2/services/',
        AGREEMENT: '/memberV2/agreement/',
        AGREEMENT_VIEW: '/memberV2/agreement-view/',
        DOCUMENT: '/memberV2/document/',
        CHECK_IN: '/memberV2/check-in/',
        DOCUMENT_VIEW: '/memberV2/document-view/',
        NOTES: '/memberV2/note/',
        TASK: '/memberV2/task/',
        ALERT: '/memberV2/notification/',
        TRANSACTIONS: '/memberV2/prepay-transaction/',
    },

    AUTH: {
        PROFILE: '/profile',
        LOGIN: '/login',
        FORGOT_PASSWORD: '/forgot-password',
        CHANGE_FORGOT_PASSWORD: '/change-forgot-password',
        CHANGE_PASSWORD: '/change-password',
    },
    CALENDAR: {
        EVENTS: '/calendar/events/',
        LOCATIONS: '/calendar/locations/',
        CLASSES: '/calendar/classes/',
        RESOURCES: '/calendar/resources/',
        CALENDAR_BOOKING: '/calendar/booking/class/',
        BOOKING: '/calendar/booking/',
        MEMBER: '/settings/schedule-setup/class/sub-schedule/',
        REMOVE_MEMBER: '/calendar/booking/remove-member/',
        REMOVE_EVENT: '/settings/schedule-setup/class/remove-event/',
        REPEAT_EVENT: '/settings/schedule-setup/class/repeat-event',
    },

    UPLOAD_FILES: '/upload',
    EMPLOYEE: '/settings/manage-employee/general/',
    EMPLOYEE_TYPE: '/employee-data/',
    EMPLOYEE_PAY_TYPE: '/settings/manage-employee/general/class/',
    DEFAULT_CALENDAR: '/employee-appointment-sort/',
    GET_PERMISSIONS: '/permissions/',
    SECURITY_ROLE: '/security-role/',
    DEPARTMENTS: '/department/',
    EMPLOYEE_DEPARTMENTS: '/employee-department/',
    EMPLOYEE_CLASSES: '/settings/manage-employee/class-setup/',
    UPDATE_CLASS_LEVEL: '/employee-classes-level/',
    UPDATE_APPOINTMENT_CLASS_LEVEL: '/employee-appointment-level/',
    COMPAIGNS_GROUP: '/campaign-group/',
    COMPAIGN: '/campaign/',
    RESOURCE_TYPE: '/resource-type/',
    RESOURCES: '/resource/',
    AGREEMENT_CATEGORY: '/agreement-category/',
    REFERRAL_GROUPS: '/referral-group/',
    COMMISSION_GROUPS: '/commission-group/',
    VENDORS: '/vendor/',
    CATEGORIES: '/settings/inventory-setup/category/',
    FILTER_SETS: '/filter-set/',
    TAGS: '/tag/',
    PROFIT_CENTERS: '/settings/inventory-setup/profit-center/',
    MANAGE_EMPLOYEE_CERTIFICATES: '/certification/',
    SUSTITITION_OPTIONS: '/employee-substitute-option/',
    EMPLOYEE_APPOINTMENT: '/employee-appointment/',
    EMPLOYEE_SALES_CODE: '/sales-code/',
    EMPLOYEE_APPOINTMENT_IS_DEFAULT: '/employee-appointment-default-pay/',
    AGREEMENT_TEMPLATE: '/agreement-template/',
    ASSETS: '/asset/',
    SALES_COMMISSION: '/sales-commission/',
    NOTES: '/notes',
    ACCESS_SCHEDULE: '/access-schedule/',
    POS_INVENTORY_CATALOG: '/pos-inventory-catalog/',
    INVENTORY_CATALOG: '/settings/inventory-setup/catalog/',
    INVENTORY_CATALOG_FILTER: '/settings/inventory-setup/catalog/',

    INVENTORY_CATALOG_USAGE: '/settings/inventory-setup/catalog/usage/',
    INVENTORY_CATALOG_USAGE_TYPE: '/settings/inventory-setup/catalog/usage-type/',
    INVENTORY_CATALOG_VARIATION: '/settings/inventory-setup/catalog/variation/',
    INVENTORY_CATALOG_VARIATION_DETAIL: '/inventory-variation-detail/',
    INVENTORY_CATALOG_VARIATION_ALL: '/inventory-variation-all/',
    INVENTORY_SUB_VARIATION: '/inventory-sub-variation/',
    SUB_VARIATION_DELETE: '/inventory-sub-variation/',
    SCHEDULE_EVENTS_LEVEL: '/event-setup-level-services/',
    SCHEDULE_EVENT_LEVEL: '/event-setup-level-service/',
    SCHEDULE_EVENT_CLEAR: '/event-setup-level-services-clear/',
    EVENT_CATEGORY: '/event-category/',
    MEMBERSHIP_TYPES: '/member-setup/',
    ASSESSED_FEE: '/assessed-fee/',
    AGREEMENT_PROMOTION: '/agreement-promotion/',
    TAXES: '/tax/',
    PAYMENT_METHODS: '/payment-method/',
    DISCOUNT_TYPES: '/discount/',
    // MEMBERS: '/member/',
    MEMBER_BARCODE: '/member-barcode/',
    GET_MEMBERS: '/search-member',
    SELL_PLAN: '/plan/',
    DRAFT_PLAN: '/draft/',
    MEMBER_SELL_PLAN: '/personal-data/',
    UNIQUE_AGREEMENT: '/unique-agrement/',
    PLAN_AGREEMENT: '/digital-aggrement/',
    RECENT_SUGGESSIONS: '/suggestion-list/',
    ADD_RECENT_SUGGESSION: '/suggestion/',
    DASHBOARD: '/dashboard-count/',
    PROMO_CODE: '/promo-code/',
    PREPAY_BALANCE: '/point-of-sale/prepay/balance/',
    VALIDATE_PROMO_CODE: '/validate-promo-code/',
    REGISTERS: '/cash-register/',
    VERIFY_ACCESS_CODE: '/verify-cash-register/',
    CASH_REGISTER_CHECK_IN: '/cash-register-check-in/',
    CASH_REGISTER_CHECK_OUT: '/cash-register-check-out/',
    DEFAULT_SETTINGS: '/default-setting/',
    GET_MEMBERSHIP_PLAN_INFO: '/member-agreement-plan',
    CAMPAIGN_TYPES: '/campaign-type/',
    REGISTER_SETTINGS: '/cash-register-setting/',
    EMPLOYEE_BARCODE: '/clock-in/validate-barcode/',
    EMPLOYEE_CHECKINOUT: '/clock-in/out/',
    EMPLOYEE_TIMESHEET: '/clock-in/employee-timesheet/',
    ALL_EMPLOYEE_TIMESHEET: '/clock-in/employee-timesheet/all/',
    DRAWERS: '/drawers/',

    SAVED_CART: '/point-of-sale/saved-carts/',
    ATTENDANCE_CHECK_IN: '/attendance-checkin/',
    EMPLOYEE_CLUBS: '/employee-clubs/',
    EMPLOYEE_AVAILABILITY: '/availability/',
    CHECK_IN: '/check-in/',
    CHECK_IN_LAST: '/check-in/last/',
    RECENT_CHECK_IN: '/check-in/history/',
    RESOURCE_RESERVE: '/check-in/resources/',
    RESOURCES_RETURN: '/check-in/resources/return/',
    RESOURCES_LIST: '/check-in/resources/',

    //Task

    TASK: '/task/',

    //Alert

    ALERT: '/memberV2/notification/',
};
export default endPoints;
