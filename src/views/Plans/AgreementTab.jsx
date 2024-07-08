import React, { useEffect, useMemo, useState } from 'react';
import formValidation from '../../utils/validations';
import CustomCard, { CustomGridLayout } from '../../shared/Cards/CustomCard';
import { CustomCalenderInput, CustomDropDown, CustomGroupInput, CustomInput, CustomInputNumber } from '../../shared/Input/AllInputs';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAgreementNumberAction, editSellPlan, getSellPlan } from '../../redux/actions/Plans/SellPlan';
import { noOfPaymentOptions, oftenClientChargedOptions, yesNoOptions } from '../../utils/dropdownConstants';
import { getMembersipTypes } from '../../redux/actions/MembersSettings/membershipTypes';
import { getCampaigns } from '../../redux/actions/MembersSettings/campaigns';
import { getEmployees } from '../../redux/actions/EmployeeSettings/employeesAction';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import moment from 'moment';
import debounce from 'lodash.debounce';
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
        assessedFee: '',
        agreementNo: 0,
    });
    useEffect(() => {
        dispatch(getEmployees());
        dispatch(getCampaigns());
        dispatch(getMembersipTypes());
    }, [dispatch]);
    useEffect(() => {}, []);

    const { id, newPlanId, memberId } = useParams();

    const { MembershipTypesDropdown } = useSelector((state) => state.membershipTypes);
    const { employeesDropdown } = useSelector((state) => state.employees);
    const { compaignDropdown } = useSelector((state) => state.campaign);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
        if (name === 'agreementNo') {
            setData((prev) => ({ ...prev, [name]: value, formErrors }));
            if (value) {
                debouncedChangeHandler(value);
            }
        }
    };

    const changeHandler = (val) => {
        const formErrors = formValidation('agreementNo', val, data);
        dispatch(
            checkAgreementNumberAction(val, newPlanId, (success) => {
                if (success) {
                    setData((prev) => ({ ...prev, ['agreementNo']: val, formErrors }));
                } else {
                    formErrors['agreementNo'] = 'Agreement number is not unique';
                    setData((prev) => ({ ...prev, ['agreementNo']: val, formErrors }));
                }
            }),
        );
    };

    const debouncedChangeHandler = useMemo(
        () =>
            debounce((val) => {
                changeHandler(val);
            }, 1000),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    useEffect(() => {
        if (id) {
            dispatch(
                getSellPlan(newPlanId, (data) => {
                    setData({
                        ...data,
                        services: uniqueData(data.services),
                        salesPerson: data.addmember.salesPerson,
                        campaign: data.addmember.campaign,
                        memberSince: new Date(data.addmember.createdAt),
                        signDate: data.signDate ? new Date(data.signDate) : new Date(),
                        beginDate: data.beginDate ? new Date(data.beginDate) : new Date(),
                        agreementNumber: data.agreementNumber,
                        assessedFee: data.assessedFee.map((item) => ({
                            ...item,
                            dueDate: item.dueDate ? new Date(item.dueDate) : '',
                            recurring: item.recurring.toString(),
                            apply: item.apply.toString(),
                        })),
                    });
                }),
            );
        }
    }, []);
    const uniqueData = (data) => {
        const uniqueCatalogs = new Set();
        const unique = data.filter((item) => {
            const duplicate = uniqueCatalogs.has(item.catalogId);
            uniqueCatalogs.add(item.catalogId);
            return !duplicate;
        });

        return unique.map((item) => ({
            ...item,
            numberOfPayments: item.numberOfPayments,
            unitPrice: item.unitPrice,
            firstDueDate: item.firstDueDate ? new Date(item.firstDueDate) : new Date(moment().add(1, 'months')),
            autoRenew: item.autoRenew.toString(),
        }));
    };

    // const uniqueData = (data) => {
    //     let unique = data.filter((obj, index) => {
    //         return index === data.findIndex((o) => obj.catalogId === o.catalogId);
    //     });
    //     unique = unique?.map((item, i) => ({
    //         ...item,
    //         numberOfPayments: item.numberOfPayments,
    //         unitPrice: item.unitPrice,
    //         firstDueDate: new Date(moment().add(1, 'months')),
    //         autoRenew: item.autoRenew.toString(),
    //     }));
    //     return unique;
    // };

    const handleChangeDynamicFields = ({ name, value, customIndex, fieldName }) => {
        const _newData = { ...data };
        let obj = _newData[fieldName][customIndex];
        obj[name] = value;
        const formErrors = formValidation(name, value, obj);
        obj.formErrors = formErrors;
        _newData[fieldName][customIndex] = obj;
        setData(() => ({ ..._newData }));
    };

    const templateRenderer = (field, rowData, index, fieldName) => {
        const commonProps = {
            fieldName: fieldName,
            customIndex: index.rowIndex,
            data: rowData,
            onChange: handleChangeDynamicFields,
            extraClassName: 'w-full',
        };

        switch (field) {
            case 'firstDueDate':
                return <CustomCalenderInput minDate={new Date()} name="firstDueDate" {...commonProps} readOnlyInput={true} />;
            case 'numberOfPayments':
                return <CustomDropDown name="numberOfPayments" options={noOfPaymentOptions} required {...commonProps} />;
            case 'autoRenew':
                return <CustomDropDown label="Auto Renew to Open" name="autoRenew" options={yesNoOptions} required {...commonProps} />;
            case 'unitPrice':
                return <CustomInputNumber prefix="$" name="unitPrice" minFractionDigits={4} maxFractionDigits={4} {...commonProps} />;
            case 'dueDate':
                return <CustomCalenderInput minDate={new Date()} name="dueDate" {...commonProps} readOnlyInput={true} required />;
            case 'amount':
                return <CustomInputNumber prefix="$" name="amount" minFractionDigits={4} maxFractionDigits={4} {...commonProps} required />;
            case 'apply':
                return <CustomDropDown label="Apply" name="apply" options={yesNoOptions} required {...commonProps} />;
            case 'recurring':
                return <CustomDropDown label="Recurring" name="recurring" options={yesNoOptions} required {...commonProps} />;
            default:
                return rowData[field];
        }
    };
    const handleNext = () => {
        if (showFormErrors(data, setData)) {
            const validated = showArrayFormErrors(data.services);
            const validatedAssessedFee = showArrayFormErrors(data.assessedFee);

            if (!validated.isValid) {
                setData((prev) => ({ ...prev, services: validated.data }));
            }
            if (!validatedAssessedFee.isValid) {
                setData((prev) => ({ ...prev, assessedFee: validatedAssessedFee.data }));
            }
            if (validated.isValid && validatedAssessedFee.isValid) {
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
                    assessedFee: data.assessedFee?.map((assesedfee) => ({
                        assessedFeeId: assesedfee._id,
                        name: assesedfee.name,
                        amount: assesedfee.amount,
                        dueDate: assesedfee.dueDate,
                        apply: assesedfee.apply,
                        recurring: assesedfee.recurring,
                    })),
                };
                dispatch(
                    editSellPlan(newPlanId, payload, () => {
                        onTabEnable(0, 1, 2, 3, 4);
                        history.replace(`/plans/sell-plan/${id}/${newPlanId}/${memberId}${'?tab=payment-amounts'}`);
                    }),
                );
            }
        }
    };

    return (
        <>
            <CustomCard col="12" title="Membership">
                <CustomGridLayout>
                    <CustomGroupInput name="agreementNo" data={data} onChange={handleChange} required prefixName={data?.club?.name} />
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
                    <CustomCalenderInput name="memberSince" required data={data} onChange={handleChange} disabled />
                    <CustomCalenderInput name="signDate" required data={data} onChange={handleChange} minDate={new Date()} />
                    <CustomCalenderInput name="beginDate" required data={data} onChange={handleChange} minDate={new Date()} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Services">
                <DataTable value={data?.services} scrollable scrollHeight="400px" tableStyle={{ minWidth: '50rem' }}>
                    <Column field="name" header="Name" className="bg-light-green font-bold" />
                    <Column
                        body={(rowData, index) => templateRenderer('firstDueDate', rowData, index, 'services')}
                        header="First Due Date"
                        className="bg-light-green font-bold"
                    />
                    <Column
                        body={(rowData, index) => templateRenderer('numberOfPayments', rowData, index, 'services')}
                        header="Number of Payments"
                        className="bg-light-green font-bold"
                    />
                    <Column
                        body={(rowData, index) => templateRenderer('autoRenew', rowData, index, 'services')}
                        header="Auto Renew To Open"
                        className="bg-light-green font-bold"
                    />
                    <Column
                        body={(rowData, index) => templateRenderer('unitPrice', rowData, index, 'services')}
                        header="Payment Amount"
                        className="bg-light-green font-bold"
                    />
                </DataTable>
            </CustomCard>
            <CustomCard col="12" title="Assessed Fees">
                <DataTable value={data?.assessedFee} scrollable scrollHeight="400px" tableStyle={{ minWidth: '50rem' }}>
                    <Column field="name" header="Name" className="bg-light-green font-bold" />
                    <Column
                        body={(rowData, index) => templateRenderer('dueDate', rowData, index, 'assessedFee')}
                        header="Due Date"
                        className="bg-light-green font-bold"
                    />
                    <Column
                        body={(rowData, index) => templateRenderer('amount', rowData, index, 'assessedFee')}
                        header="Amount"
                        className="bg-light-green font-bold"
                    />
                    <Column
                        body={(rowData, index) => templateRenderer('apply', rowData, index, 'assessedFee')}
                        header="Apply"
                        className="bg-light-green font-bold"
                    />
                    <Column
                        body={(rowData, index) => templateRenderer('recurring', rowData, index, 'assessedFee')}
                        header="Recurring"
                        className="bg-light-green font-bold"
                    />
                </DataTable>
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
