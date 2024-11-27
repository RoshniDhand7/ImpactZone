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

import { Link, useLocation, useRouteMatch } from 'react-router-dom';

export default function Sidebar() {
    const { url } = useRouteMatch();
    const [active, setActive] = useState('Dashboard');

    const location = useLocation();

    // Get the last route from the pathname
    const lastRoute = location.pathname.split('/').pop(); // Get the last segment

    const categories = [
        {
            label: 'Dashboard',
            icon: <DashboardIcon />,
            path: `${url}/dashboard`,
            key: 'dashboard',
        },
        {
            label: 'Personal',
            icon: <PersonalIcon />,
            path: `${url}/personal`,
            key: 'personal',
        },
        {
            label: 'Agreement',
            icon: <AgreementIcon />,
            path: `${url}/agreement`,
            key: 'agreement',
        },
        {
            label: 'Rewards',
            icon: <RewardIcon />,
            path: `${url}/rewards`,
            key: 'rewards',
        },
        {
            label: 'Wellness',
            icon: <WellnessIcon />,
            path: `${url}/wellness`,
            key: 'wellness',
        },
        {
            label: 'Services',
            icon: <ServiceIcon />,
            path: `${url}/services`,
            key: 'services',
        },
        {
            label: 'Payment Method',
            icon: <PaymentIcon />,
            path: `${url}/payment`,
            key: 'payment',
        },
        {
            label: 'Billing History',
            icon: <BillingHistoryIcon />,
            path: `${url}/billing`,
            key: 'billing',
        },
        {
            label: 'Check-in',
            icon: <CheckInIcon />,
            path: `${url}/check-in`,
            key: 'check-in',
        },
        {
            label: 'Alerts',
            icon: <AlertIcon />,
            path: `${url}/alerts`,
            key: 'alerts',
        },
        {
            label: 'Notes',
            icon: <NotesIcon />,
            path: `${url}/notes`,
            key: 'notes',
        },
        {
            label: 'Tasks',
            icon: <DocumentIcon />,
            path: `${url}/tasks`,
            key: 'tasks',
        },
        {
            label: 'Documents',
            icon: <DocumentIcon />,
            path: `${url}/documents`,
            key: 'documents',
        },
    ];

    useEffect(() => {
        setActive(lastRoute);
    }, []);

    return (
        <div className="h-full">
            <div className="div-shadow h-full">
                <div className="text-xl font-semibold p-2">Categories</div>
                {categories.map((item) => (
                    <Link
                        key={item?.key}
                        className={`flex gap-2 align-items-center py-2 px-3 sidebar-item ${item.key === active && 'active'}`}
                        to={item.path}
                        onClick={() => setActive(item?.key)}
                    >
                        {item.icon}
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}
