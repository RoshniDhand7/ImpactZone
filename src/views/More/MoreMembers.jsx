import React from 'react';
import Maintenance from '../../assets/icons/Maintenance.png';
import CustomTransition from '../../shared/Transitions/CustomTransition';
import Manage from '../../assets/icons/Manage.png';
import Reserve from '../../assets/icons/Reserve.png';
import agreementsetup from '../../assets/icons/agreementsetup.png';

import { Link } from 'react-router-dom';

export default function MoreMembers() {
    const moreCards = [
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
            link: '',
            title: 'Tasks',
        },
    ];
    return (
        <CustomTransition>
            <div className="bg-color">
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
    );
}
