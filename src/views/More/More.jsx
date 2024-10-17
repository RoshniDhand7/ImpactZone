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

import { Link } from 'react-router-dom';

export default function More() {
    const moreCards = [
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
                <div className="bg-color">
                    <h3 className="text-bold mb-3">More</h3>
                    <div className="flex justify-content-center">
                        <div className="p-3 border-round-xl btn-lightblue w-full">
                            <div className="grid col-12">
                                {moreCards.map((box, i) => {
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
}
