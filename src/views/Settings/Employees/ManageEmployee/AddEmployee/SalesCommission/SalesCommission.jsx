import React from 'react';
import CustomTabView from '../../../../../../shared/TabView/CustomTabView';
import ItemCommission from './ItemCommission';
import BonusSetup from '../AppointmentSetup/BonusSetup';

const SalesCommission = () => {
    const tabs = [
        { title: 'Item Commission', content: <ItemCommission/> },
        { title: 'Bonus', content: <BonusSetup/> },
    ];
    return (
        <>
            <CustomTabView name="sales-commission" tabs={tabs} useIndex={true} />
        </>
    );
};

export default SalesCommission;