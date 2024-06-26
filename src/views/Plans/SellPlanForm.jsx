import React from 'react';
import CustomTabView from '../../shared/TabView/CustomTabView';
import FormPage from '../../shared/Layout/FormPage';
import PlanTab from './PlanTab';

const SellPlanForm = () => {
    const tabs = [
        { title: 'Plan', content: <PlanTab /> },
        { title: 'Personal', content: <h1>Personal</h1> },
        { title: 'Identification', content: <h1>Identification</h1> },
        { title: 'Agreement', content: <h1>Agreement</h1> },
        { title: 'Payment Amounts', content: <h1>Payment Amounts</h1> },
        { title: 'Billing Info', content: <h1>Billing Info</h1> },
    ];
    return (
        <>
            <FormPage backText="Plans" backTo="/plans">
                <CustomTabView tabs={tabs} />
            </FormPage>
        </>
    );
};

export default SellPlanForm;
