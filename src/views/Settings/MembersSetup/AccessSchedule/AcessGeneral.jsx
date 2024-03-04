import React from 'react';
import Access from './Access';
import CustomTabView from '../../../../shared/TabView/CustomTabView';
import FormPage from '../../../../shared/Layout/FormPage';
import General from './General';
import { useParams } from 'react-router-dom';

const AcessGeneral = () => {
    const { id } = useParams();
    const tabs = [
        { title: 'General', content: <General /> },
        { title: 'Access', content: <Access /> },
    ];
    return (
        <>
            <FormPage backText="Access Schedule">
                <CustomTabView tabs={tabs} disabledTabIndices={id ? [] : [1]} />;
            </FormPage>
        </>
    );
};

export default AcessGeneral;
