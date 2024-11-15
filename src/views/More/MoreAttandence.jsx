import React from 'react';
import Alerts from '../../assets/icons/alert.png';
import CustomTransition from '../../shared/Transitions/CustomTransition';
import Checkinhistory from '../../assets/icons/Checkinhistory.png';

import GridNavigation from '../../shared/GridNavigation/GridNavigation';

export default function MoreAttandance() {
    const items = [
        {
            img: Checkinhistory,
            link: '/more/attendance/check-in-history',
            title: 'Check In History',
        },
        {
            img: Alerts,
            link: '',
            title: 'Alerts',
        },
    ];
    return (
        <CustomTransition>
            <GridNavigation items={items} backable />
        </CustomTransition>
    );
}
