import React from 'react';
import CustomTabView from '../../../../shared/TabView/CustomTabView';
import FormPage from '../../../../shared/Layout/FormPage';
import General from './General';

const AddCatalogItems = () => {
    const tabs = [
        { title: 'General', content: <General /> },
        { title: 'Tracking', content: <></> },
        { title: 'Usage', content: <></> },
        { title: 'Variations', content: <></> },
    ];
    return (
        <>
            <FormPage backText="Catalog Items">
                <CustomTabView tabs={tabs} />
            </FormPage>
        </>
    );
};

export default AddCatalogItems;
