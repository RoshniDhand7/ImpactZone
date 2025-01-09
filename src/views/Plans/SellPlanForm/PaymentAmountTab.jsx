import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CustomCard, { CustomListItem } from '../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../shared/Button/CustomButton';
import { formatDate } from '@fullcalendar/core';

const PaymentAmountTab = ({ onTabEnable, planInfo, onCancel }) => {
    const history = useHistory();
    const [total, setTotal] = useState(0);

    useEffect(() => {
        onTabEnable(3);
    }, []);

    const handleNext = () => {
        history.replace({
            search: `?tab=billing-info`,
        });
    };

    useEffect(() => {
        let serviceSum = planInfo?.services.reduce((total, service) => total + service.unitPrice, 0);
        let assessedFeeSum = planInfo?.assessedFee.filter((item) => item.type === 'ANNUAL_FEE').reduce((total, fee) => total + fee.amount, 0);
        setTotal(serviceSum + assessedFeeSum);
    }, [planInfo]);

    return (
        <>
            <CustomCard title="Payment Amount" col="12">
                {planInfo?.services.length > 0 && (
                    <>
                        <div className="flex justify-content-between text-lg mb-2">
                            <span className="font-bold ">Services</span>
                        </div>
                        {planInfo?.services?.map((item, i) => (
                            <CustomListItem key={i} label={item.name + ` (Due On ${formatDate(item.firstDueDate)})`} value={'$' + item.unitPrice} />
                        ))}
                    </>
                )}
                {planInfo?.assessedFee.length > 0 && (
                    <>
                        <div className="flex justify-content-between text-lg mb-2">
                            <span className="font-bold ">Assesssed Fee</span>
                        </div>
                        {planInfo?.assessedFee?.map((item, i) => (
                            <CustomListItem
                                key={i}
                                label={item.name + `${item.type === 'ANNUAL_FEE' ? ` (Due On ${formatDate(item.dueDate)})` : ''}`}
                                value={'$' + item.amount}
                            />
                        ))}
                    </>
                )}

                <div className="flex justify-content-between text-lg mb-2">
                    <span className="font-bold ">Total</span>
                    <span className="font-bold ">{'$' + total}</span>
                </div>
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Next" className="mx-2" onClick={() => handleNext()} />
                <LightButton label="Cancel" onClick={onCancel} />
            </CustomButtonGroup>
        </>
    );
};

export default PaymentAmountTab;
