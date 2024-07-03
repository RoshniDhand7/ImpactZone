import React, { useState } from 'react';
import CustomTabView from '../../shared/TabView/CustomTabView';
import FormPage from '../../shared/Layout/FormPage';
import PlanTab from './PlanTab';
import PersonalTab from './PersonalTab';
import IdentificationTab from './IdentificationTab';
import { useParams } from 'react-router-dom';

const SellPlanForm = () => {
    const [tabId, setTabId] = useState([]);
    const onTabEnable = (index) => {
        setTabId(index);
    };
    const { newPlanId } = useParams();

    const tabs = [
        { title: 'Plan', content: <PlanTab onTabEnable={onTabEnable} /> },
        { title: 'Personal', content: <PersonalTab onTabEnable={onTabEnable} /> },
        { title: 'Identification', content: <IdentificationTab onTabEnable={onTabEnable} /> },
        { title: 'Agreement', content: <h1>Agreement</h1> },
        { title: 'Payment Amounts', content: <h1>Payment Amounts</h1> },
        { title: 'Billing Info', content: <h1>Billing Info</h1> },
    ];
    const getDisabledTabIndices = () => {
        if (newPlanId) {
            return tabs.map((_, index) => (tabId.includes(index) ? null : index)).filter((index) => index !== null);
        }
        return [1, 2, 3, 4, 5, 6, 7];
    };
    return (
        <>
            <FormPage backText="Plans" backTo="/plans">
                <CustomTabView tabs={tabs} disabledTabIndices={getDisabledTabIndices()} />
            </FormPage>
        </>
    );
};

export default SellPlanForm;
