import React, { useEffect, useState } from 'react';
import { CustomDropDown, CustomInputNumber } from '../../../../../../shared/Input/AllInputs';
import { classesPayTypeOptions } from '../../../../../../utils/dropdownConstants';
import CustomDialog from '../../../../../../shared/Overlays/CustomDialog';
import { CustomGridLayout } from '../../../../../../shared/Cards/CustomCard';
import { addEmployeeClasses, editEmployeeClasses, getEmployeeClaases } from '../../../../../../redux/actions/EmployeeSettings/classesAction';
import { useDispatch } from 'react-redux';
import formValidation from '../../../../../../utils/validations';
import { showFormErrors } from '../../../../../../utils/commonFunctions';

const AddandEditClasses = ({ visible, setVisible, id, employeeClassId, setEmployeeClassId }) => {
    const [loading, setLoading] = useState(false);
    const [employeeClasses, setEmployeeClassesData] = useState({});
    const dispatch = useDispatch();

    const onClose = () => {
        setVisible(false);
        setData(incrementalPay);
        setEmployeeClassId(null);
    };

    useEffect(() => {
        if (employeeClassId) {
            funcGetEmpDepartments(employeeClassId);
        }
    }, [employeeClassId]);

    const funcGetEmpDepartments = (id) => {
        dispatch(
            getEmployeeClaases(id, setLoading, (data) => {
                setEmployeeClassesData(data);
            }),
        );
    };

    const incrementalPay = {
        payType: 'INCREMENTAL_PAY',
        oneToFiveClients: 0,
        sixToTenClients: 0,
        elevenToFifteenClients: 0,
        sixteenToTwentyClients: 0,
        twentyOneToTwentyFiveClients: 0,
        twentySixPlusClients: 0,
        noRegistrationPay: 0,
    };

    const payperClassPayload = {
        payType: 'PAY_PER_CLASS',
        payPerClassRate: 0,
        noRegistrationPay: 0,
    };

    const PayPerClient = {
        payType: 'PAY_PER_CLIENT',
        baseRate: 0,
        payPerClientRate: 0,
        eachClientOver: [
            {
                noOfClients: 0,
                rate: 0,
            },
            {
                noOfClients: 0,
                rate: 0,
            },
            {
                noOfClients: 0,
                rate: 0,
            },
        ],
        maxPayPerClient: 0,
        noRegistrationPay: 0,
    };

    const percentageRate = {
        payType: 'PERCENTAGE_RATE',
        percentage: 0,
        noRegistrationPay: 0,
    };

    const [data, setData] = useState(incrementalPay);

    useEffect(() => {
        if (!employeeClassId) {
            if (data?.payType === 'INCREMENTAL_PAY') {
                setData(incrementalPay);
            } else if (data?.payType === 'PAY_PER_CLASS') {
                setData(payperClassPayload);
            } else if (data?.payType === 'PAY_PER_CLIENT') {
                setData(PayPerClient);
            } else if (data?.payType === 'PERCENTAGE_RATE') {
                setData(percentageRate);
            }
        }
    }, [data?.payType]);

    useEffect(() => {
        if (employeeClassId && employeeClasses) {
            const {
                oneToFiveClients,
                sixToTenClients,
                elevenToFifteenClients,
                sixteenToTwentyClients,
                twentyOneToTwentyFiveClients,
                twentySixPlusClients,
                noRegistrationPay,
                payPerClassRate,
                baseRate,
                payPerClientRate,
                maxPayPerClient,
                percentage,
            } = employeeClasses;
            let newData = {};
            switch (employeeClasses?.payType) {
                case 'INCREMENTAL_PAY':
                    newData = {
                        payType: 'INCREMENTAL_PAY',
                        oneToFiveClients,
                        sixToTenClients,
                        elevenToFifteenClients,
                        sixteenToTwentyClients,
                        twentyOneToTwentyFiveClients,
                        twentySixPlusClients,
                        noRegistrationPay,
                    };
                    break;
                case 'PAY_PER_CLASS':
                    newData = {
                        payType: 'PAY_PER_CLASS',
                        payPerClassRate,
                        noRegistrationPay,
                    };
                    break;
                case 'PAY_PER_CLIENT':
                    newData = {
                        payType: 'PAY_PER_CLIENT',
                        baseRate,
                        payPerClientRate,
                        eachClientOver: employeeClasses.eachClientOver.map((item) => ({
                            noOfClients: item.noOfClients,
                            rate: item.rate,
                        })),
                        maxPayPerClient,
                        noRegistrationPay,
                    };
                    break;
                case 'PERCENTAGE_RATE':
                    newData = {
                        payType: 'PERCENTAGE_RATE',
                        percentage,
                        noRegistrationPay,
                    };
                    break;
                default:
                    newData = {};
                    break;
            }
            setData(newData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employeeClasses]);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const handleChange1 = (index, key, value) => {
        const newList = [...data.eachClientOver]; // Use data instead of PayPerClient
        newList[index][key] = value;
        setData((prev) => ({ ...prev, eachClientOver: newList }));
    };

    const handleSave = () => {
        let ignore = [];
        if (data?.payType === 'INCREMENTAL_PAY') {
            ignore = ['payPerClassRate', 'baseRate', 'payPerClientRate', 'maxPayPerClient', 'percentage'];
        } else if (data?.payType === 'PAY_PER_CLASS') {
            ignore = [
                'oneToFiveClients',
                'sixToTenClients',
                'elevenToFifteenClients',
                'sixteenToTwentyClients',
                'twentyOneToTwentyFiveClients',
                'twentySixPlusClients',
                'baseRate',
                'payPerClientRate',
                'maxPayPerClient',
                'percentage',
            ];
        } else if (data?.payType === 'PAY_PER_CLIENT') {
            ignore = [
                'oneToFiveClients',
                'sixToTenClients',
                'elevenToFifteenClients',
                'sixteenToTwentyClients',
                'twentyOneToTwentyFiveClients',
                'twentySixPlusClients',
                'percentage',
                'payPerClassRate',
            ];
        } else {
            ignore = [
                'oneToFiveClients',
                'sixToTenClients',
                'elevenToFifteenClients',
                'sixteenToTwentyClients',
                'twentyOneToTwentyFiveClients',
                'twentySixPlusClients',
                'baseRate',
                'payPerClientRate',
                'maxPayPerClient',
                'payPerClassRate',
            ];
        }
        if (showFormErrors(data, setData, ignore)) {
            if (employeeClassId) {
                dispatch(
                    editEmployeeClasses(employeeClassId, data, setLoading, () => {
                        onClose();
                    }),
                );
            }
            dispatch(
                addEmployeeClasses({ ...data, employee: id }, setLoading, () => {
                    onClose();
                }),
            );
        }
    };

    return (
        <div>
            <CustomDialog title={employeeClassId ? 'Edit' : 'Add'} visible={visible} onCancel={onClose} loading={loading} onSave={handleSave}>
                <CustomGridLayout>
                    <CustomDropDown
                        name="payType"
                        data={data}
                        onChange={handleChange}
                        options={classesPayTypeOptions}
                        col={12}
                        disabled={employeeClassId ? true : false}
                    />
                    {data?.payType === 'INCREMENTAL_PAY' && (
                        <>
                            <CustomInputNumber label="1-5 Clients" name="oneToFiveClients" data={data} onChange={handleChange} />
                            <CustomInputNumber label="6-10 Clients" name="sixToTenClients" data={data} onChange={handleChange} />
                            <CustomInputNumber label="11-15 Clients" name="elevenToFifteenClients" data={data} onChange={handleChange} />
                            <CustomInputNumber label="16-20 Clients" name="sixteenToTwentyClients" data={data} onChange={handleChange} />
                            <CustomInputNumber label="21-25 Clients" data={data} name="twentyOneToTwentyFiveClients" onChange={handleChange} />
                            <CustomInputNumber label="26+ Clients" data={data} name="twentySixPlusClients" onChange={handleChange} />
                            <CustomInputNumber name="noRegistrationPay" data={data} onChange={handleChange} />
                        </>
                    )}

                    {data?.payType === 'PAY_PER_CLASS' && (
                        <>
                            <CustomInputNumber data={data} name="payPerClassRate" onChange={handleChange} />
                            <CustomInputNumber name="noRegistrationPay" data={data} onChange={handleChange} />
                        </>
                    )}
                    {data?.payType === 'PAY_PER_CLIENT' && (
                        <>
                            <CustomInputNumber name="baseRate" data={data} onChange={handleChange} />
                            <CustomInputNumber name="payPerClientRate" data={data} onChange={handleChange} />
                            {data?.eachClientOver?.map((client, index) => (
                                <div className=" col-12 " key={index}>
                                    <div className="grid">
                                        <CustomInputNumber
                                            name="noOfClients"
                                            value={client?.noOfClients}
                                            onChange={(e) => handleChange1(index, 'noOfClients', e.value)}
                                            col={6}
                                        />
                                        <CustomInputNumber name="rate" value={client?.rate} onChange={(e) => handleChange1(index, 'rate', e.value)} col={6} />
                                    </div>
                                </div>
                            ))}
                            <CustomInputNumber data={data} name="noRegistrationPay" onChange={handleChange} />
                            <CustomInputNumber data={data} name="maxPayPerClient" onChange={handleChange} />
                        </>
                    )}
                    {data?.payType === 'PERCENTAGE_RATE' && (
                        <>
                            <CustomInputNumber data={data} name="percentage" onChange={handleChange} />
                            <CustomInputNumber name="noRegistrationPay" data={data} onChange={handleChange} />
                        </>
                    )}
                </CustomGridLayout>
            </CustomDialog>
        </div>
    );
};

export default AddandEditClasses;
