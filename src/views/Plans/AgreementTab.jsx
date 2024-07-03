import React, { useEffect, useState } from 'react';
import formValidation from '../../utils/validations';
import CustomCard, { CustomGridLayout } from '../../shared/Cards/CustomCard';
import { CustomCalenderInput, CustomDropDown, CustomGroupInput, CustomInput, CustomInputNumber } from '../../shared/Input/AllInputs';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../shared/Button/CustomButton';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSellPlan } from '../../redux/actions/Plans/SellPlan';
import { noOfPaymentOptions, oftenClientChargedOptions, yesNoOptions } from '../../utils/dropdownConstants';
import { getMembersipTypes } from '../../redux/actions/MembersSettings/membershipTypes';
import { getCampaigns } from '../../redux/actions/MembersSettings/campaigns';
import { getEmployees } from '../../redux/actions/EmployeeSettings/employeesAction';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

const AgreementTab = () => {
    const dispatch = useDispatch();

    const [data, setData] = useState({
        oftenClientCharged: '',
        membershipType: '',
        services: '',
        club: '',
    });
    useEffect(() => {
        dispatch(getEmployees());
        dispatch(getCampaigns());
        dispatch(getMembersipTypes());
    }, [dispatch]);

    const { id, newPlanId, memberId } = useParams();

    const { MembershipTypesDropdown } = useSelector((state) => state.membershipTypes);
    const { employeesDropdown } = useSelector((state) => state.employees);
    const { compaignDropdown } = useSelector((state) => state.campaign);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    useEffect(() => {
        if (id) {
            dispatch(
                getSellPlan(id, (data) => {
                    console.log('data>>', data);
                    setData({ ...data, services: uniqueData(data.services), club: data.club });
                }),
            );
        }
    }, []);
    const uniqueData = (data) => {
        const uniqueEntity = new Set();
        return data.filter((item) => {
            const duplicate = uniqueEntity.has(item._id);
            uniqueEntity.add(item._id);
            return !duplicate;
        });
    };

    const columns = [{ field: 'name', header: 'Name' }];
    const handleRowChange = (event, rowData, field) => {
        const updatedData = data.services.map((item) => {
            if (item._id === rowData._id) {
                // assuming each row has a unique 'id' field
                return { ...item, [field]: event.value };
            }
            return item;
        });

        // Update the data state with the new data
        setData({ ...data, services: updatedData });
    };
    const dueDateTemplate = (rowData) => {
        return (
            <>
                <CustomCalenderInput
                    name="firstDueDate"
                    value={rowData.firstDueDate}
                    onChange={(e) => handleRowChange(e, rowData, 'firstDueDate')}
                    extraClassName="w-full"
                />
            </>
        );
    };

    const noOfPaymentTemplate = (rowData) => {
        return (
            <>
                <CustomDropDown
                    name="numberOfPayments"
                    value={rowData.numberOfPayments}
                    options={noOfPaymentOptions}
                    onChange={(e) => handleRowChange(e, rowData, 'numberOfPayments')}
                    data={data}
                    extraClassName="w-full"
                    required
                />
            </>
        );
    };

    const renewToOpenTemplate = (rowData) => {
        return (
            <>
                <CustomDropDown
                    label="Auto Renew to Open"
                    name="autoRenew"
                    value={rowData.autoRenew}
                    options={yesNoOptions}
                    onChange={(e) => handleRowChange(e, rowData, 'autoRenew')}
                    data={data}
                    extraClassName="w-full"
                    required
                />
            </>
        );
    };

    const paymentAmountTemplate = (rowData) => {
        return (
            <>
                <CustomInputNumber
                    prefix="$"
                    name="paymentAmount"
                    value={rowData.paymentAmount}
                    onChange={(e) => handleRowChange(e, rowData, 'paymentAmount')}
                    data={data}
                    extraClassName="w-full"
                    minFractionDigits={4}
                    maxFractionDigits={4}
                />
            </>
        );
    };

    console.log('data>>', data);

    const handleNext = () => {};
    return (
        <>
            <CustomCard col="12" title="Membership">
                <CustomGridLayout>
                    <CustomGroupInput name="Agreement Number " required prefixName={data.club.name} />
                    <CustomDropDown name="membershipType" options={MembershipTypesDropdown} onChange={handleChange} data={data} required />
                    <CustomDropDown
                        name="oftenClientCharged"
                        label="How Often will Clients Be Charged"
                        options={oftenClientChargedOptions}
                        onChange={handleChange}
                        data={data}
                    />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Sales Information">
                <CustomGridLayout>
                    <CustomDropDown name="salesPerson" data={data} onChange={handleChange} required options={employeesDropdown} optionLabel="name" />
                    <CustomInput name="referredBy" col={3} required data={data} onChange={handleChange} />
                    <CustomDropDown name="campaign" data={data} onChange={handleChange} required options={compaignDropdown} optionLabel="name" />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Dates">
                <CustomGridLayout>
                    <CustomCalenderInput name="memberSince" data={data} onChange={handleChange} />
                    <CustomCalenderInput name="signDate" data={data} onChange={handleChange} />
                    <CustomDropDown name="beginDate" data={data} onChange={handleChange} required options={compaignDropdown} optionLabel="name" />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Services">
                <DataTable value={data?.services} scrollable scrollHeight="400px" tableStyle={{ minWidth: '50rem' }}>
                    <Column field="name" header="Name" className="bg-light-green font-bold" />
                    <Column body={dueDateTemplate} header="First Due Date" className="bg-light-green font-bold" />
                    <Column body={noOfPaymentTemplate} header="Number of Payments" className="bg-light-green font-bold" />
                    <Column field="name" body={renewToOpenTemplate} header="Auto Renew To Open" className="bg-light-green font-bold" />
                    <Column body={paymentAmountTemplate} header="Payment Amount" className="bg-light-green font-bold" />
                </DataTable>
            </CustomCard>
            <CustomCard col="12" title="Fees">
                <CustomGridLayout>
                    <CustomCalenderInput name="dueDate" data={data} onChange={handleChange} />
                    <CustomDropDown name="accessedFeeName" options={MembershipTypesDropdown} onChange={handleChange} data={data} required />
                    <CustomInputNumber prefix="$" name="amount" onChange={handleChange} data={data} col={4} minFractionDigits={4} maxFractionDigits={4} />
                    <CustomDropDown name="apply" options={yesNoOptions} onChange={handleChange} data={data} required />
                    <CustomDropDown name="recurring" options={yesNoOptions} onChange={handleChange} data={data} required />
                </CustomGridLayout>
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

export default AgreementTab;
