import React from 'react';
import Attendance from '../../assets/icons/Attendance.png';
import CustomTransition from '../../shared/Transitions/CustomTransition';
import Point from '../../assets/icons/pointofsale.png';
import Schedule from '../../assets/icons/schedule.png';
import Member from '../../assets/icons/membersetup.png';
import CustomerRelations from '../../assets/icons/customerRelations.png';
import Training from '../../assets/icons/traning.png';
import Inventory from '../../assets/icons/inventorysetup.png';
import Links from '../../assets/icons/Links.png';
import Reports from '../../assets/icons/Reports.png';
import Help from '../../assets/icons/Help.png';
import Agreement from '../../assets/icons/agreementsetup.png';
import MobileApp from '../../assets/icons/mobileapp.png';
import Forms from '../../assets/icons/Forms.png';
import Maintenance from '../../assets/icons/Maintenance.png';
import FacilityLayout from '../../assets/icons/FacilityLayout.png';

import GridNavigation from '../../shared/GridNavigation/GridNavigation';

export default function More() {
    const items = [
        {
            img: Attendance,
            link: '/more/attendance',
            title: 'Attendance',
        },
        {
            img: Point,
            link: '/more/pos',
            title: 'Point of Sale',
        },
        {
            img: Schedule,
            link: '',
            title: 'Schedule',
        },
        {
            img: Member,
            link: '/more/members',
            title: 'Members',
        },
        {
            img: CustomerRelations,
            link: '',
            title: 'Customer Relations',
        },
        {
            img: Training,
            link: '',
            title: 'Training',
        },
        {
            img: Inventory,
            link: '',
            title: 'Inventory',
        },
        {
            img: Links,
            link: '/more',
            title: 'Links',
        },
        {
            img: Reports,
            link: '/more',
            title: 'Reports',
        },
        {
            img: Help,
            link: '/more',
            title: 'Help',
        },
        {
            img: Agreement,
            link: '/more',
            title: 'Agreements',
        },
        {
            img: MobileApp,
            link: '/more',
            title: 'Mobile App',
        },
        {
            img: Forms,
            link: '/more',
            title: 'Forms',
        },
        {
            img: Maintenance,
            link: '/more',
            title: 'Maintenance',
        },
        {
            img: FacilityLayout,
            link: '/more',
            title: 'Facility Layout',
        },
    ];
    return (
        <>
            <CustomTransition>
                <GridNavigation title="More" items={items} />
            </CustomTransition>
        </>
    );
}
