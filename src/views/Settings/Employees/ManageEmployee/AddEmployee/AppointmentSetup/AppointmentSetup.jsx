import React from 'react';
import CustomTabView from '../../../../../../shared/TabView/CustomTabView';
import PaySetup from './PaySetup';
import BonusSetup from './BonusSetup';
import CalendarDefault from './CalendarDefault';
import { useSelector } from 'react-redux';

const AppointmentSetup = () => {
    const tabs = [
        { title: 'Pay', content: <PaySetup /> },
        { title: 'Bonus', content: <BonusSetup type="appointment" /> },
        { title: 'Calendar Default', content: <CalendarDefault /> },
    ];
    let { isClassLevel } = useSelector((state) => state?.employees);

    return (
        <>
            <CustomTabView name="appointment" tabs={tabs} useIndex={true} disabledTabIndices={isClassLevel ? [] : [1, 2]} />
        </>
    );
};

export default AppointmentSetup;
