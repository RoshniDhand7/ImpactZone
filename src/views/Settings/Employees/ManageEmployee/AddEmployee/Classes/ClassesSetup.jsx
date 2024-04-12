import React from 'react';
import CustomTabView from '../../../../../../shared/TabView/CustomTabView';
import PaySetup from './PaySetup';
import SubstituteOptionSetup from './SubstituteOptionSetup';
import { useSelector } from 'react-redux';

const ClassesSetup = () => {
    const tabs = [
        { title: 'Pay', content: <PaySetup /> },
        // { title: 'Bonus', content: <BonusSetup type="bonus" /> },
        { title: 'Substitute Option', content: <SubstituteOptionSetup /> },
    ];
    let { isClassLevel } = useSelector((state) => state?.employees);

    return (
        <>
            <CustomTabView name="classes" tabs={tabs} useIndex={true} disabledTabIndices={isClassLevel ? [] : [1]} />
        </>
    );
};

export default ClassesSetup;
