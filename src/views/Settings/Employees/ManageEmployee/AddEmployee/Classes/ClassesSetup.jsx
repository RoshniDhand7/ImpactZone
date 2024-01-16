import React from 'react';
import CustomTabView from '../../../../../../shared/TabView/CustomTabView';

const ClassesSetup = () => {
    const tabs = [
        { title: 'Pay', content: <h1></h1> },
        { title: 'Substitute Option', content: <h1></h1> },
    ];
    return (
        <>
            <CustomTabView tabs={tabs} />
        </>
    );
};

export default ClassesSetup;
