import React from 'react';
import CustomTabView from '../../../../../../shared/TabView/CustomTabView';
import ItemCommission from './ItemCommission';
import BonusSetup from '../AppointmentSetup/BonusSetup';
import SalesCode from './SalesCode';

const SalesCommission = () => {
    const tabs = [
        { title: 'Item Commission', content: <ItemCommission /> },
        { title: 'Bonus', content: <BonusSetup type="salesCommission" /> },
        { title: 'Sales Code', content: <SalesCode /> },
    ];
    return (
        <>
            <CustomTabView name="sales-commission" tabs={tabs} useIndex={true} />
        </>
    );
};

export default SalesCommission;
