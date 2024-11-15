import React from 'react';
import Attendance from '../../assets/icons/Attendance.png';
import Point from '../../assets/icons/pointofsale.png';
import Receipts from '../../assets/icons/Receipts.png';
import CloseOutDrawer from '../../assets/icons/CloseOutDrawer.png';
import Drawers from '../../assets/icons/Drawers.png';
import DrawersSummary from '../../assets/icons/DrawersSummary.png';
import GiftCardTransactions from '../../assets/icons/GiftCardTransactions.png';
import GridNavigation from '../../shared/GridNavigation/GridNavigation';

export default function MorePos() {
    const items = [
        {
            img: Point,
            link: '/pos',
            title: 'Point of Sale',
        },
        {
            img: Attendance,
            link: '/more/pos/saved-carts',
            title: 'Saved Carts',
        },

        {
            img: Receipts,
            link: '/more/pos/receipts',
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
    return <GridNavigation items={items} backable />;
}
