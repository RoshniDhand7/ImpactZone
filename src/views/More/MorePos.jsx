import React from 'react';
import Attendance from '../../assets/icons/Attendance.png';
import CustomTransition from '../../shared/Transitions/CustomTransition';
import Point from '../../assets/icons/pointofsale.png';
import Receipts from '../../assets/icons/Receipts.png';
import CloseOutDrawer from '../../assets/icons/CloseOutDrawer.png';
import Drawers from '../../assets/icons/Drawers.png';
import DrawersSummary from '../../assets/icons/DrawersSummary.png';
import GiftCardTransactions from '../../assets/icons/GiftCardTransactions.png';

import { Link } from 'react-router-dom';

export default function MorePos() {
    const moreCards = [
        {
            img: Point,
            link: '/pos',
            title: 'Point of Sale',
        },
        {
            img: Attendance,
            link: '',
            title: 'Saved Carts',
        },

        {
            img: Receipts,
            link: '/more',
            title: 'Receipts',
        },
        {
            img: CloseOutDrawer,
            link: '/more',
            title: 'Close Out Drawer',
        },
        {
            img: Drawers,
            link: '/more/pos/drawers',
            title: 'Drawers',
        },
        {
            img: DrawersSummary,
            link: '/more/pos/drawer-summary',
            title: 'Drawers Summary',
        },
        {
            img: GiftCardTransactions,
            link: '/more',
            title: 'Gift Card Transactions',
        },
    ];
    return (
        <>
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
        </>
    );
}
