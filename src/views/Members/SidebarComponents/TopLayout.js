import React from 'react';
import { ReactComponent as DocumentIcon } from '../../../assets/svg/nomination.svg';
import { ReactComponent as CalendarIcon } from '../../../assets/svg/calendar.svg';
import { ReactComponent as POSIcon } from '../../../assets/svg/pos.svg';
import { ReactComponent as TaskIcon } from '../../../assets/svg/task.svg';
import { ReactComponent as AlertIcon } from '../../../assets/svg/checkin.svg';
import { ReactComponent as MessageIcon } from '../../../assets/svg/message.svg';

const TopLayout = () => {
    return (
        <>
            <div className=" p-4 border-round-xl shadow-2 align-items-center bg-lightest-blue flex gap-5 mb-3 justify-content-between">
                <div className="text-center">
                    <DocumentIcon />
                    <p className="font-semibold text-xs text-dark-blue mt-2">Quick Enroll</p>
                </div>
                <div className="text-center">
                    <CalendarIcon />
                    <p className="font-semibold text-xs text-dark-blue mt-2">Calendar</p>
                </div>
                <div className="text-center">
                    <POSIcon />
                    <p className="font-semibold text-xs text-dark-blue mt-2">POS</p>
                </div>
                <div className="text-center">
                    <TaskIcon />
                    <p className="font-semibold text-xs text-dark-blue mt-2">Create Task</p>
                </div>
                <div className="text-center">
                    <AlertIcon />
                    <p className="font-semibold text-xs text-dark-blue mt-2">Create Alert</p>
                </div>
                <div className="text-center">
                    <MessageIcon />
                    <p className="font-semibold text-xs text-dark-blue mt-2">Send Message</p>
                </div>
            </div>
        </>
    );
};

export default TopLayout;
