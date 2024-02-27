import React from 'react';
import CustomTabView from '../../../../../../shared/TabView/CustomTabView';
import PaySetup from './PaySetup';
import BonusSetup from './BonusSetup';

const AppointmentSetup = () => {
    const tabs = [
        { title: 'Pay', content: <PaySetup /> },
        { title: 'Bonus', content: <BonusSetup type="appointment" /> },
        { title: 'Calendar Default', content: <></> },
    ];
    return (
        <>
            <CustomTabView name="appointment" tabs={tabs} useIndex={true} />
        </>
    );
};

export default AppointmentSetup;
