import React from 'react';
import Bussiness from '../../assets/icons/businessettings.png';
import customer from '../../assets/icons/customer.png';
import Employee from '../../assets/icons/Employee.png';
import Schedule from '../../assets/icons/sedule.png';
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

import { Link } from 'react-router-dom';
import CustomTransition from '../../shared/Transitions/CustomTransition';

const Settings = () => {
    const settingsCard = [
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
            link: '/settings/members',
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
    return (
        <>
            <CustomTransition>
                <div className="bg-color">
                    <h3 className="text-bold mb-3">Settings</h3>
                    <div className="flex justify-content-center">
                        <div className="p-3 border-round-xl btn-lightblue  ">
                            <div className="grid col-12">
                                {settingsCard.map((box, i) => {
                                    return (
                                        <div key={i} className="lg:col-3 md:col-4 sm:col-6 col-12  p-3">
                                            <Link to={box.link}>
                                                <div className="bg-style bg-white cursor-pointer  border-round flex flex-column justify-content-center  align-items-center py-5 ">
                                                    <div className="" style={{ width: '60px', height: '60px' }}>
                                                        <img src={box.img} alt="" />
                                                    </div>

                                                    <div className="mt-3 text-base">{box.title}</div>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </CustomTransition>
        </>
    );
};

export default Settings;
