import React, { useEffect, useState } from 'react';
import CustomCard, { CustomListItem } from '../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';
import { editSellPlan, getSellPlan } from '../../redux/actions/Plans/SellPlan';
import { useDispatch } from 'react-redux';
import { uniqueData } from '../../utils/commonFunctions';

const PaymentAmountTab = ({ onTabEnable }) => {
    const [data, setData] = useState({
        services: [],
        assessedFee: [],
        total: null,
    });

    const { id, newPlanId, memberId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        if (id) {
            dispatch(
                getSellPlan(newPlanId, (data) => {
                    setData({
                        services: uniqueData(data.services)?.map((item) => ({ name: item.name, unitPrice: item.unitPrice })),
                        assessedFee: data.assessedFee.map((item) => ({
                            name: item.name,
                            unitPrice: item.amount,
                        })),
                        total: 0,
                    });
                }),
            );
        }
    }, [newPlanId, id, dispatch]);

    useEffect(() => {
        const totalAmount = () => {
            if (!data?.services?.length && !data?.assessedFee?.length) return 0;

            const amount = [...data.services, ...data.assessedFee];
            return amount.reduce((acc, current) => acc + current.unitPrice, 0);
        };

        setData((prev) => ({ ...prev, total: totalAmount() }));
    }, [data.services, data.assessedFee]);

    const handleNext = (tab) => {
        dispatch(
            editSellPlan(newPlanId, { totalAmount: data?.total, ...(tab && { type: 'hold', tabName: 'payment-amounts', planId: newPlanId }) }, () => {
                if (tab) {
                    history.replace('/plans/drafts');
                } else {
                    onTabEnable(0, 1, 2, 3, 4, 5);
                    history.replace(`/plans/sell-plan/${id}/${newPlanId}/${memberId}${'?tab=billing-info'}`);
                }
            }),
        );
    };

    return (
        <>
            <CustomCard title="Payment Amount" height="200px" col="12">
                <div className="flex justify-content-between text-lg mb-2">
                    <span className="font-bold ">Name</span>
                    <span className="text-dark-gray font-bold">Amount</span>
                </div>
                {data?.services?.map((item) => (
                    <CustomListItem label={item.name} value={item.unitPrice} />
                ))}
                {data?.assessedFee?.map((item) => (
                    <CustomListItem label={item.name} value={item.unitPrice} />
                ))}
                <CustomListItem label="total" name="total" data={data} />
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Next" className="mx-2" onClick={() => handleNext('')} />
                <PrimaryButton label="Save & Hold" className="mx-2" onClick={() => handleNext('?tab=payment-amounts')} />
                <PrimaryButton label="Sign Agreement" className="mx-2" />
                <LightButton label="Cancel" />
            </CustomButtonGroup>
        </>
    );
};

export default PaymentAmountTab;
