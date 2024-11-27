import React from 'react';
import { ReactComponent as DocumentIcon } from '../../../assets/svg/nomination.svg';
import { ReactComponent as CalendarIcon } from '../../../assets/svg/calendar.svg';
import { ReactComponent as POSIcon } from '../../../assets/svg/pos.svg';
import { ReactComponent as TaskIcon } from '../../../assets/svg/task.svg';
import { ReactComponent as AlertIcon } from '../../../assets/svg/checkin.svg';
import { ReactComponent as MessageIcon } from '../../../assets/svg/message.svg';

const TopLayout = () => {
    const LIST = [
        {
            label: 'Quick Enroll',
            icon: <DocumentIcon />,
        },
        {
            label: 'Calendar',
            icon: <CalendarIcon />,
        },
        {
            label: 'POS',
            icon: <POSIcon />,
        },
        {
            label: 'Create Task',
            icon: <TaskIcon />,
        },
        {
            label: 'Create Alert',
            icon: <AlertIcon />,
        },
        {
            label: 'Send Message',
            icon: <MessageIcon />,
        },
    ];

    return (
        <div className="p-3 border-round-xl shadow-2 align-items-center bg-lightest-blue flex gap-5 mb-3 justify-content-between">
            {LIST.map((item) => (
                <div className="text-center cursor-pointer hover:surface-200 p-2 border-round" key={item.label} style={{ minWidth: '90px' }}>
                    {item.icon}
                    <p className="font-semibold text-xs text-dark-blue mt-2 cursor-pointer">{item.label}</p>
                </div>
            ))}
        </div>
    );
};

export default TopLayout;
