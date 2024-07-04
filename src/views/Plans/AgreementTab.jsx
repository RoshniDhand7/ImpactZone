import React, { useEffect, useState } from 'react';
import formValidation from '../../utils/validations';
import CustomCard, { CustomGridLayout } from '../../shared/Cards/CustomCard';
import { CustomCalenderInput, CustomDropDown, CustomGroupInput, CustomInput, CustomInputNumber } from '../../shared/Input/AllInputs';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editSellPlan, getSellPlan } from '../../redux/actions/Plans/SellPlan';
import { noOfPaymentOptions, oftenClientChargedOptions, yesNoOptions } from '../../utils/dropdownConstants';
import { getMembersipTypes } from '../../redux/actions/MembersSettings/membershipTypes';
import { getCampaigns } from '../../redux/actions/MembersSettings/campaigns';
import { getEmployees } from '../../redux/actions/EmployeeSettings/employeesAction';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { getAssesedFees } from '../../redux/actions/AgreementSettings/assessedFees';
import moment from 'moment';
import { showArrayFormErrors, showFormErrors } from '../../utils/commonFunctions';

const AgreementTab = ({ onTabEnable }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [data, setData] = useState({
        oftenClientCharged: '',
        membershipType: '',
        services: '',
        club: '',
        salesPerson: '',
        memberSince: '',
        signDate: '',
        beginDate: '',
        firstDueDate: '',
        agreementNumber: '',
        // dueDate: '',
        // assessedFeeName: '',
    });
    useEffect(() => {
        dispatch(getEmployees());
        dispatch(getCampaigns());
        dispatch(getMembersipTypes());
        dispatch(getAssesedFees());
    }, [dispatch]);
    useEffect(() => {}, []);

    let { allAssessedFeesDropdown } = useSelector((state) => state.assessedFees);

    const { id, newPlanId, memberId } = useParams();

    const { MembershipTypesDropdown } = useSelector((state) => state.membershipTypes);
    const { employeesDropdown } = useSelector((state) => state.employees);
    const { compaignDropdown } = useSelector((state) => state.campaign);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    useEffect(() => {
        if (newPlanId) {
            onTabEnable([0, 1, 2, 3, 4]);
        }
    }, [newPlanId]);

    useEffect(() => {
        if (id) {
            dispatch(
                getSellPlan(newPlanId, (data) => {
                    console.log('data>>', data);
                    setData({
                        ...data,
                        services: uniqueData(data.services),
                        salesPerson: data.addmember.salesPerson,
                        campaign: data.addmember.campaign,
                        memberSince: new Date(data.addmember.createdAt),
                        signDate: new Date(),
                        beginDate: new Date(),
                        // assessedFeeName: data.assessedFee._id,
                        agreementNumber: data.agreementNumber,
                        // dueDate: data?.dueDate ? new Date(data.dueDate) : '',
                    });
                }),
            );
        }
    }, []);

    const uniqueData = (data) => {
        let unique = data.filter((obj, index) => {
            return index === data.findIndex((o) => obj._id === o._id);
        });
        unique = unique?.map((item, i) => ({
            ...item,
            numberOfPayments: item.service === 'Membership Plan' ? 'one time' : 'recurring',
            unitPrice: item.unitPrice,
            firstDueDate: new Date(moment().add(1, 'months')),
            autoRenew: item.autoRenew.toString(),
        }));
        console.log('unique', unique);
        return unique;
    };

    const handleChangeDynamicFields = ({ name, value, customIndex, fieldName }) => {
        const _newData = { ...data };
        let obj = _newData[fieldName][customIndex];
        obj[name] = value;
        const formErrors = formValidation(name, value, obj);
        obj.formErrors = formErrors;
        _newData[fieldName][customIndex] = obj;
        setData(() => ({ ..._newData }));
    };

    const templateRenderer = (field, rowData, index) => {
        const commonProps = {
            fieldName: 'services',
            customIndex: index.rowIndex,
            data: rowData,
            onChange: handleChangeDynamicFields,
            extraClassName: 'w-full',
        };

        switch (field) {
            case 'firstDueDate':
                return <CustomCalenderInput name="firstDueDate" {...commonProps} readOnlyInput={true} />;
            case 'numberOfPayments':
                return <CustomDropDown name="numberOfPayments" options={noOfPaymentOptions} required {...commonProps} />;
            case 'autoRenew':
                return <CustomDropDown label="Auto Renew to Open" name="autoRenew" options={yesNoOptions} required {...commonProps} />;
            case 'unitPrice':
                return <CustomInputNumber prefix="$" name="unitPrice" minFractionDigits={4} maxFractionDigits={4} {...commonProps} />;
            default:
                return rowData[field];
        }
    };
    const handleNext = () => {
        if (showFormErrors(data, setData)) {
            const validated = showArrayFormErrors(data.services);

            console.log(validated, 'validated');

            if (!validated.isValid) {
                setData((prev) => ({ ...prev, services: validated.data }));
            }
            if (validated.isValid) {
                const payload = {
                    ...data,
                    services: data.services?.map((item) => ({
                        catalogId: item._id,
                        name: item.name,
                        unitPrice: item.unitPrice,
                        numberOfPayments: item.numberOfPayments,
                        firstDueDate: item.firstDueDate,
                        autoRenew: item.autoRenew,
                    })),
                };
                dispatch(
                    editSellPlan(newPlanId, payload, () => {
                        onTabEnable([0, 1, 2, 3, 4]);
                        history.replace(`/plans/sell-plan/${id}/${newPlanId}/${memberId}${'?tab=payment-amounts'}`);
                    }),
                );
            }
        }
    };
    console.log('data>>', data);

    return (
        <>
            <CustomCard col="12" title="Membership">
                <CustomGridLayout>
                    <CustomGroupInput name="agreementNumber" data={data} onChange={handleChange} required prefixName={data.club.name} />
                    <CustomDropDown name="membershipType" options={MembershipTypesDropdown} onChange={handleChange} data={data} required disabled />
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
                    <CustomInput name="referredBy" col={3} data={data} onChange={handleChange} />
                    <CustomDropDown name="campaign" data={data} onChange={handleChange} required options={compaignDropdown} optionLabel="name" />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Dates">
                <CustomGridLayout>
                    <CustomCalenderInput name="memberSince" required data={data} onChange={handleChange} />
                    <CustomCalenderInput name="signDate" required data={data} onChange={handleChange} />
                    <CustomCalenderInput name="beginDate" required data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Services">
                <DataTable value={data?.services} scrollable scrollHeight="400px" tableStyle={{ minWidth: '50rem' }}>
                    <Column field="name" header="Name" className="bg-light-green font-bold" />
                    <Column
                        body={(rowData, index) => templateRenderer('firstDueDate', rowData, index)}
                        header="First Due Date"
                        className="bg-light-green font-bold"
                    />
                    <Column
                        body={(rowData, index) => templateRenderer('numberOfPayments', rowData, index)}
                        header="Number of Payments"
                        className="bg-light-green font-bold"
                    />
                    <Column
                        body={(rowData, index) => templateRenderer('autoRenew', rowData, index)}
                        header="Auto Renew To Open"
                        className="bg-light-green font-bold"
                    />
                    <Column
                        body={(rowData, index) => templateRenderer('unitPrice', rowData, index)}
                        header="Payment Amount"
                        className="bg-light-green font-bold"
                    />
                </DataTable>
            </CustomCard>
            {/* <CustomCard col="12" title="Fees">
                <CustomGridLayout>
                    <CustomCalenderInput name="dueDate" required data={data} onChange={handleChange} />
                    <CustomDropDown name="assessedFeeName" options={allAssessedFeesDropdown} onChange={handleChange} data={data} required />
                    <CustomInputNumber
                        prefix="$"
                        name="assessedFeeAmount"
                        onChange={handleChange}
                        data={data}
                        col={4}
                        minFractionDigits={4}
                        maxFractionDigits={4}
                    />
                    <CustomDropDown name="assessedFeeApply" options={yesNoOptions} onChange={handleChange} data={data} required />
                    <CustomDropDown name="assessedFeeRecurring" options={yesNoOptions} onChange={handleChange} data={data} required />
                </CustomGridLayout>
            </CustomCard> */}
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
