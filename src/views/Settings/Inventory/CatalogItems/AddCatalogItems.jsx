import React from 'react';
import CustomTabView from '../../../../shared/TabView/CustomTabView';
import FormPage from '../../../../shared/Layout/FormPage';
import General from './General';
import { useParams } from 'react-router-dom';

const AddCatalogItems = () => {
    const { id } = useParams();

    const tabs = [
        { title: 'General', content: <General /> },
        { title: 'Tracking', content: <></> },
        { title: 'Usage', content: <></> },
        { title: 'Variations', content: <></> },
    ];
    return (
        <>
            <FormPage backText="Catalog Items">
                <CustomTabView tabs={tabs} disabledTabIndices={id ? [] : [1, 2, 3]} />
            </FormPage>
        </>
    );
};

export default AddCatalogItems;
