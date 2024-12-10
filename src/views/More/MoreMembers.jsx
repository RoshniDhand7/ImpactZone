import React from 'react';
import Maintenance from '../../assets/icons/Maintenance.png';
import CustomTransition from '../../shared/Transitions/CustomTransition';
import Manage from '../../assets/icons/Manage.png';
import Reserve from '../../assets/icons/Reserve.png';
import agreementsetup from '../../assets/icons/agreementsetup.png';

import GridNavigation from '../../shared/GridNavigation/GridNavigation';

export default function MoreMembers() {
    const items = [
        {
            img: Manage,
            link: '/more/members/manage',
            title: 'Manage',
        },
        {
            img: Maintenance,
            link: '',
            title: 'Recurring Services',
        },
        {
            img: Reserve,
            link: '',
            title: 'Reserve',
        },
        {
            img: agreementsetup,
            link: '/more/members/tasks',
            title: 'Tasks',
        },
    ];
    return (
        <CustomTransition>
            <GridNavigation items={items} backable />
        </CustomTransition>
    );
}
