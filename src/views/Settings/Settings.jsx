import React from 'react';
import Bussiness from '../../assets/icons/businessettings.png';
import customer from '../../assets/icons/customer.png';
import Employee from '../../assets/icons/Employee.png';
import Schedule from '../../assets/icons/schedule.png';
import Point from '../../assets/icons/pointofsale.png';
import Alerts from '../../assets/icons/alert.png';
import Menu from '../../assets/icons/menulayout.png';
import Inventory from '../../assets/icons/inventorysetup.png';
import Member from '../../assets/icons/membersetup.png';
import Agreement from '../../assets/icons/agreementsetup.png';
import Rewards from '../../assets/icons/rewards.png';
import Integration from '../../assets/icons/integration.png';
import Mobile from '../../assets/icons/mobileapp.png';
import Training from '../../assets/icons/traning.png';
import Noti from '../../assets/icons/notifications.png';
import GridNavigation from '../../shared/GridNavigation/GridNavigation';

const Settings = () => {
    const items = [
        {
            img: Bussiness,
            link: '/settings/business',
            title: 'Business Settings',
        },
        {
            img: customer,
            link: '/settings/follow-up',
            title: 'Customer Follow-up',
        },
        {
            img: Employee,
            link: '/settings/employee',
            title: 'Employee',
        },
        {
            img: Schedule,
            link: '/settings/schedule',
            title: 'Schedule Setup',
        },
        {
            img: Point,
            link: '/settings/pos',
            title: 'Point of Sale',
        },
        {
            img: Alerts,
            link: '/settings/alerts',
            title: 'Alerts',
        },
        {
            img: Menu,
            link: '/settings/layout',
            title: 'Menu Layout',
        },
        {
            img: Inventory,
            link: '/settings/inventory',
            title: 'Inventory Setup',
        },
        {
            img: Member,
            link: '/settings/member-setup',
            title: 'Members Setup',
        },
        {
            img: Agreement,
            link: '/settings/agreement',
            title: 'Agreement Setup',
        },
        {
            img: Rewards,
            link: '/settings/rewards',
            title: 'Rewards',
        },
        {
            img: Integration,
            link: '/settings/integration',
            title: 'Integration',
        },
        {
            img: Mobile,
            link: '/settings/app',
            title: 'Mobile App',
        },
        {
            img: Training,
            link: '/settings/training',
            title: 'Training',
        },
        {
            img: Noti,
            link: '/settings/notifications',
            title: 'Notifications',
        },
    ];
    return <GridNavigation items={items} title="Settings" />;
};

export default Settings;
