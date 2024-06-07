import React, { useState, useEffect } from 'react';
import { ReactComponent as DashboardIcon } from '../assets/svg/dashboard.svg';
import { ReactComponent as PersonalIcon } from '../assets/svg/personal.svg';
import { ReactComponent as AgreementIcon } from '../assets/svg/agreement.svg';
import { ReactComponent as RewardIcon } from '../assets/svg/rewards.svg';
import { ReactComponent as WellnessIcon } from '../assets/svg/wellness.svg';
import { ReactComponent as ServiceIcon } from '../assets/svg/service.svg';
import { ReactComponent as PaymentIcon } from '../assets/svg/payment.svg';
import { ReactComponent as BillingHistoryIcon } from '../assets/svg/billingHistory.svg';
import { ReactComponent as CheckInIcon } from '../assets/svg/checkin.svg';
import { ReactComponent as AlertIcon } from '../assets/svg/alert.svg';
import { ReactComponent as NotesIcon } from '../assets/svg/notes.svg';
import { ReactComponent as DocumentIcon } from '../assets/svg/document.svg';

import { Link, useHistory, useRouteMatch } from 'react-router-dom';

export default function Sidebar() {
    const history = useHistory();
    const { url } = useRouteMatch();
    const [activeItem, setActiveItem] = useState(null);

    useEffect(() => {
        setActiveItem(0);
    }, []);

    const items = [
        {
            label: 'Dashboard',
            icon: <DashboardIcon />,
            path: `${url}/dashboard`,

            // command: () => navigate('/dashboard'),
        },
        {
            label: 'Personal',
            icon: <PersonalIcon />,
            path: `${url}/personal`,
        },
        {
            label: 'Agreement',
            icon: <AgreementIcon />,
            path: `${url}/agreement`,
        },
        {
            label: 'Rewards',
            icon: <RewardIcon />,
            path: `${url}/rewards`,
        },
        {
            label: 'Wellness',
            icon: <WellnessIcon />,
            path: `${url}/wellness`,
        },
        {
            label: 'Services',
            icon: <ServiceIcon />,
            path: `${url}/services`,
        },
        {
            label: 'Payment Method',
            icon: <PaymentIcon />,
            path: `${url}/payment`,
        },
        {
            label: 'Billing History',
            icon: <BillingHistoryIcon />,
            path: `${url}/billing`,
        },
        {
            label: 'Check-in',
            icon: <CheckInIcon />,
            path: `${url}/check-in`,
        },
        {
            label: 'Alerts',
            icon: <AlertIcon />,
            path: `${url}/alerts`,
        },
        {
            label: 'Notes',
            icon: <NotesIcon />,
            path: `${url}/notes`,
        },
        {
            label: 'Tasks',
            icon: <DocumentIcon />,
            path: `${url}/tasks`,
        },
        {
            label: 'Documents',
            icon: <DocumentIcon />,
            path: `${url}/documents`,
        },
    ];

    return (
        <div className="layout-sidebar bg-light-gray">
            <div className="menu-bar">
                <ul className="p-0 list-none side-menu">
                    {items.map((item, index) => (
                        <li className="mb-2">
                            <Link to={item.path} className={`flex gap-3 p-2 ${activeItem === index ? 'active' : ''} `} onClick={() => setActiveItem(index)}>
                                {item.icon}
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
