import React from 'react';
import { PanelMenu } from 'primereact/panelmenu';
import { ReactComponent as DashboardIcon } from '../assets/svg/dashboard.svg';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
// import { ReactComponent as MonetizationIcon } from '../assets/images/svg/monetization.svg';
// import { ReactComponent as EngagementIcon } from '../assets/images/svg/engagement-and-retention.svg';
// import { ReactComponent as ProgressionIcon } from '../assets/images/svg/progression.svg';
// import { ReactComponent as EndlessunnerFocusedIcon } from '../assets/images/svg/endless-runner-focused.svg';
// import { ReactComponent as SettingsIcon } from '../assets/images/svg/settings.svg';

export default function Sidebar() {
    const history = useHistory();
    const { url } = useRouteMatch();

    const items = [
        {
            label: 'Dashboard',
            icon: <DashboardIcon />,
            path: `${url}/dashboard`,

            // command: () => navigate('/dashboard'),
        },
        {
            label: 'Personal',
            // icon: <MonetizationIcon />,
            path: `${url}/personal`,
        },
        {
            label: 'Agreement',
            // icon: <EngagementIcon />,
        },
        {
            label: 'Rewards',
            // icon: <ProgressionIcon />,
        },
        {
            label: 'Wellness',
            // icon: <EndlessunnerFocusedIcon />,
        },
        {
            label: 'Services',
            // icon: <SettingsIcon />,
        },
        {
            label: 'Payment Method',
            // icon: <SettingsIcon />,
        },
        {
            label: 'Billing History',
            // icon: <SettingsIcon />,
        },
        {
            label: 'Check-in',
            // icon: <SettingsIcon />,
        },
        {
            label: 'Alerts',
            // icon: <SettingsIcon />,
        },
        {
            label: 'Notes',
            // icon: <SettingsIcon />,
        },
        {
            label: 'Tasks',
            // icon: <SettingsIcon />,
        },
        {
            label: 'Documents',
            // icon: <SettingsIcon />,
        },
    ];

    return (
        <div className="layout-sidebar bg-light-gray">
            <div className="menu-bar">
                <ul className="p-0 list-none side-menu">
                    {items.map((item) => (
                        <li className="mb-2">
                            <Link to={item.path} className="flex gap-3 p-2 ">
                                {item.icon}
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                {/* <PanelMenu model={items} className="w-full" /> */}
            </div>
        </div>
    );
}
