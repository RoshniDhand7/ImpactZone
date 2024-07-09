import React, { useState } from 'react';
import CustomTabView from '../../shared/TabView/CustomTabView';
import FormPage from '../../shared/Layout/FormPage';
import PlanTab from './PlanTab';
import PersonalTab from './PersonalTab';
import IdentificationTab from './IdentificationTab';
import { useParams } from 'react-router-dom';
import AgreementTab from './AgreementTab';
import PaymentAmountTab from './PaymentAmountTab';
import BillingInfoTab from './BillingInfoTab';

const SellPlanForm = () => {
    const [tabId, setTabId] = useState([0, 1]);
    const onTabEnable = (...indices) => {
        setTabId((prevEnabledTabs) => {
            const newEnabledTabs = [...prevEnabledTabs];
            indices.forEach((index) => {
                if (!newEnabledTabs.includes(index)) {
                    newEnabledTabs.push(index);
                }
            });

            return newEnabledTabs;
        });
    };

    const { newPlanId } = useParams();

    const tabs = [
        { title: 'Plan', content: <PlanTab onTabEnable={onTabEnable} /> },
        { title: 'Personal', content: <PersonalTab onTabEnable={onTabEnable} /> },
        { title: 'Identification', content: <IdentificationTab onTabEnable={onTabEnable} /> },
        { title: 'Agreement', content: <AgreementTab onTabEnable={onTabEnable} /> },
        { title: 'Payment Amounts', content: <PaymentAmountTab onTabEnable={onTabEnable} /> },
        { title: 'Billing Info', content: <BillingInfoTab onTabEnable={onTabEnable} /> },
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
