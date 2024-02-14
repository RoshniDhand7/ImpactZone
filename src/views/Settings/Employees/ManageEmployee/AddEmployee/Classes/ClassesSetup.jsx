import React from 'react';
import CustomTabView from '../../../../../../shared/TabView/CustomTabView';
import PaySetup from './PaySetup';
import SubstituteOptionSetup from './SubstituteOptionSetup';

const ClassesSetup = () => {
    const tabs = [
        { title: 'Pay', content: <PaySetup /> },
        { title: 'Substitute Option', content: <SubstituteOptionSetup /> },
    ];
    return (
        <>
            <CustomTabView name="classes" tabs={tabs} useIndex={true} />
        </>
    );
};

export default ClassesSetup;
