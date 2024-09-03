import React from 'react';
import CustomTabView from '../../../../shared/TabView/CustomTabView';
import FormPage from '../../../../shared/Layout/FormPage';
import General from './General';
import { useParams } from 'react-router-dom';
import Tracking from './Tracking';
import Usage from './Usage';
import Variations from './Variations';

const AddCatalogItems = () => {
    const { id } = useParams();

    const tabs = [
        { title: 'General', content: <General /> },
        { title: 'Tracking', content: <Tracking /> },
        { title: 'Usage', content: <Usage /> },
        { title: 'Variations', content: <Variations /> },
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
