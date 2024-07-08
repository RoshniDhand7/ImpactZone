import React, { useEffect, useState } from 'react';
import CustomCard, { CustomListItem } from '../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';

const PaymentAmountTab = ({ onTabEnable }) => {
    const [data, setData] = useState({});

    const { id, newPlanId, memberId } = useParams();
    const history = useHistory();

    const handleNext = () => {
        onTabEnable(0, 1, 2, 3, 4, 5);
        history.replace(`/plans/sell-plan/${id}/${newPlanId}/${memberId}${'?tab=billing-info'}`);
    };
    return (
        <>
            <CustomCard title="Payment Amount" height="200px" col="12">
                <div className="flex justify-content-between text-lg mb-2">
                    <span className="font-bold ">Name</span>
                    <span className="text-dark-gray font-bold">Amount</span>
                </div>
                <CustomListItem name="dues" data={data} />
                <CustomListItem label="Billing Frequency" name="classes" data={data} />
                <CustomListItem name="classesStrikeZone" data={data} />
                <CustomListItem label="Ad-ons" name="fees" data={data} keys={data.services} dynamicKey="name" />
                <CustomListItem label="Total" name="clubs" data={data} keys={data?.clubs} dynamicKey="name" />
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Next" className="mx-2" onClick={handleNext} />
                <PrimaryButton label="Save & Hold" className="mx-2" />
                <PrimaryButton label="Sign Agreement" className="mx-2" />
                <LightButton label="Cancel" />
            </CustomButtonGroup>
        </>
    );
};

export default PaymentAmountTab;
