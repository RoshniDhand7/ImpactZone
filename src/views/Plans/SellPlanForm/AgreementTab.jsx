import React, { useEffect, useMemo, useState } from 'react';
import formValidation from '../../../utils/validations';
import CustomCard, { CustomGridLayout } from '../../../shared/Cards/CustomCard';
import { CustomCalenderInput, CustomDropDown, CustomGroupInput, CustomInputNumber } from '../../../shared/Input/AllInputs';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAgreementNumberAction } from '../../../redux/actions/Plans/SellPlan';
import { noOfPaymentOptions, oftenClientChargedOptions, yesNoOptions } from '../../../utils/dropdownConstants';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import debounce from 'lodash.debounce';

const AgreementTab = ({ onTabEnable, planInfo, setPlanInfo, onCancel }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        onTabEnable(2);
    }, []);

    const { newPlanId } = useParams();

    let { membershipTypesDropdown } = useSelector((state) => state.settings.members);
    const allMembersDropdown = useSelector((state) => state.membersPortal.allMembersDropdown);
    const { employeesDropdown } = useSelector((state) => state.settings.employee);
    const { campaignDropdown } = useSelector((state) => state.settings.members);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, planInfo);
        setPlanInfo((prev) => ({ ...prev, [name]: value, formErrors }));
        if (name === 'agreementNo') {
            setPlanInfo((prev) => ({ ...prev, [name]: value, formErrors }));
            if (value) {
                debouncedChangeHandler(value);
            }
        }
    };

    const changeHandler = (val) => {
        const formErrors = formValidation('agreementNo', val, planInfo);
        dispatch(
            checkAgreementNumberAction(val, newPlanId, (success) => {
                if (success) {
                    setPlanInfo((prev) => ({ ...prev, agreementNo: val, formErrors }));
                } else {
                    formErrors['agreementNo'] = 'Agreement number is not unique';
                    setPlanInfo((prev) => ({ ...prev, agreementNo: val, formErrors }));
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

    const handleChangeDynamicFields = ({ name, value, customIndex, fieldName }) => {
        const _newData = { ...planInfo };
        let obj = _newData[fieldName][customIndex];
        obj[name] = value;
        const formErrors = formValidation(name, value, obj);
        obj.formErrors = formErrors;
        _newData[fieldName][customIndex] = obj;
        setPlanInfo(() => ({ ..._newData }));
    };

    const templateRenderer = (field, rowData, index, fieldName) => {
        const commonProps = {
            fieldName: fieldName,
            customIndex: index.rowIndex,
            data: rowData,
            onChange: handleChangeDynamicFields,
            extraClassName: 'w-full',
        };
        if (['LATE_FEE', 'DECLINE_FEE', 'NO_SHOW_FEE', 'FREEZE_FEE', 'CANCELLATION_FEE'].includes(rowData.type) && field === 'dueDate') {
            return;
        }

        switch (field) {
            case 'firstDueDate':
                return <CustomCalenderInput minDate={new Date()} name="firstDueDate" {...commonProps} readOnlyInput={true} />;
            case 'numberOfPayments':
                return <CustomDropDown name="isRecurring" label="Number Of Payments" options={noOfPaymentOptions} required {...commonProps} />;
            case 'autoRenew':
                return <CustomDropDown label="Auto Renew to Open" name="autoRenew" options={yesNoOptions} required {...commonProps} />;
            case 'unitPrice':
                return <CustomInputNumber prefix="$" name="unitPrice" maxFractionDigits={4} {...commonProps} />;
            case 'dueDate':
                return <CustomCalenderInput minDate={new Date()} name="dueDate" {...commonProps} readOnlyInput={true} required />;
            case 'amount':
                return <CustomInputNumber prefix="$" name="amount" maxFractionDigits={4} {...commonProps} required />;
            case 'apply':
                return <CustomDropDown label="Apply" name="apply" options={yesNoOptions} required {...commonProps} />;
            case 'recurring':
                return <CustomDropDown label="Recurring" name="recurring" options={yesNoOptions} required {...commonProps} />;
            default:
                return rowData[field];
        }
    };

    const handleNext = () => {
        history.replace({
            search: `?tab=payment-amounts`,
        });
    };
    return (
        <>
            <CustomCard col="12" title="Membership">
                <CustomGridLayout>
                    <CustomGroupInput name="agreementNo" data={planInfo} onChange={handleChange} required prefixName={planInfo?.club} />
                    <CustomDropDown name="membershipType" options={membershipTypesDropdown} onChange={handleChange} data={planInfo} required disabled />
                    <CustomDropDown name="howOftenWillClientsBeCharged" options={oftenClientChargedOptions} onChange={handleChange} data={planInfo} disabled />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Sales Information">
                <CustomGridLayout>
                    <CustomDropDown data={planInfo} onChange={handleChange} name="salesPerson" options={employeesDropdown} required />
                    <CustomDropDown data={planInfo} onChange={handleChange} name="referredBy" options={allMembersDropdown} />
                    <CustomDropDown data={planInfo} onChange={handleChange} name="campaign" options={campaignDropdown} required />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Dates">
                <CustomGridLayout>
                    <CustomCalenderInput name="memberSince" required data={planInfo} onChange={handleChange} disabled />
                    <CustomCalenderInput name="signDate" required data={planInfo} onChange={handleChange} minDate={new Date()} />
                    <CustomCalenderInput name="beginDate" required data={planInfo} onChange={handleChange} minDate={new Date()} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Services">
                <DataTable value={planInfo?.services} scrollable scrollHeight="400px" tableStyle={{ minWidth: '50rem' }}>
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
                <DataTable value={planInfo?.assessedFee} scrollable scrollHeight="400px" tableStyle={{ minWidth: '50rem' }}>
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
                <PrimaryButton label="Next" className="mx-2" onClick={() => handleNext('?tab=payment-amounts')} />
                <LightButton label="Cancel" onClick={onCancel} />
            </CustomButtonGroup>
        </>
    );
};

export default AgreementTab;
