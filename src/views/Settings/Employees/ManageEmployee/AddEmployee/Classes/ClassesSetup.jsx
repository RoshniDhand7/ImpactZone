import React from 'react';
import CustomTabView from '../../../../../../shared/TabView/CustomTabView';

const ClassesSetup = () => {
    const tabs = [
        { title: 'Pay', content: <h1>Pay</h1> },
        { title: 'Substitute Option', content: <h1>Substitute Option</h1> },
    ];
    return (
        <>
            <CustomTabView tabs={tabs} />
        </>
    );
};

export default ClassesSetup;
