import React, { useEffect, useMemo, useState } from 'react';
import formValidation from '../../../utils/validations';
import CustomCard, { CustomGridLayout } from '../../../shared/Cards/CustomCard';
import { CustomCalenderInput, CustomDropDown, CustomGroupInput, CustomInputNumber } from '../../../shared/Input/AllInputs';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAgreementNumberAction, editSellPlan, getSellPlan } from '../../../redux/actions/Plans/SellPlan';
import { noOfPaymentOptions, oftenClientChargedOptions, yesNoOptions } from '../../../utils/dropdownConstants';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import debounce from 'lodash.debounce';
import { showArrayFormErrors, showFormErrors, uniqueData } from '../../../utils/commonFunctions';
import { AutoComplete } from 'primereact/autocomplete';
import { getMembersipTypes } from '../../../redux/actions/Settings/MembershipSetup/membershipTypeAction';
import { getCampaigns } from '../../../redux/actions/Settings/MembershipSetup/campaignsAction';
import { getEmployees } from '../../../redux/actions/Settings/Employee/employeesAction';

const AgreementTab = ({ onTabEnable, planInfo, setPlanInfo, onCancel }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getEmployees());
        dispatch(getCampaigns());
        dispatch(getMembersipTypes());
    }, [dispatch]);

    const [items, setItems] = useState([]);

    let allMembers = useSelector((state) => state.membersPortal.members);

    allMembers = allMembers.map((item) => ({
        firstName: item.firstName,
        middleName: item.MI,
        lastName: item.lastName,
        fullName: `${item.firstName} ${item.MI} ${item.lastName}`.trim(),
        id: item._id,
        path: `member/${item._id}`,
    }));

    const { id, newPlanId, memberId } = useParams();

    let { membershipTypesDropdown } = useSelector((state) => state.settings.members);

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

    const handleChange1 = (e) => {
        const inputValue = e.value;
        const trimmedValue = typeof inputValue === 'string' ? inputValue.trimStart() : inputValue;
        const formErrors = formValidation('referredBy', trimmedValue, planInfo);
        setPlanInfo((prev) => ({ ...prev, referredBy: trimmedValue, formErrors }));
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

    const handleNext = (tab) => {
        if (showFormErrors(planInfo, setPlanInfo)) {
            const validated = showArrayFormErrors(planInfo.services);
            const validatedAssessedFee = showArrayFormErrors(planInfo.assessedFee);

            if (!validated.isValid) {
                setPlanInfo((prev) => ({ ...prev, services: validated.data }));
            }
            if (!validatedAssessedFee.isValid) {
                setPlanInfo((prev) => ({ ...prev, assessedFee: validatedAssessedFee.data }));
            }
            if (validated.isValid && validatedAssessedFee.isValid) {
                const payload = {
                    ...planInfo,
                    referredBy: planInfo.referredBy?.fullName ? planInfo.referredBy?.fullName : '',
                    services: planInfo.services?.map((item) => ({
                        catalogId: item._id,
                        name: item.name,
                        unitPrice: item.unitPrice,
                        numberOfPayments: item.numberOfPayments,
                        firstDueDate: item.firstDueDate,
                        autoRenew: item.autoRenew,
                    })),
                    assessedFee: planInfo.assessedFee?.map((assesedfee) => ({
                        assessedFeeId: assesedfee._id,
                        name: assesedfee.name,
                        amount: assesedfee.amount,
                        dueDate: assesedfee.dueDate,
                        apply: assesedfee.apply,
                        recurring: assesedfee.recurring,
                    })),
                    ...(tab && { type: 'hold', tabName: 'agreement', planId: newPlanId }),
                };
                dispatch(
                    editSellPlan(newPlanId, payload, () => {
                        if (tab) {
                            history.replace('/plans/drafts');
                        } else {
                            onTabEnable(0, 1, 2, 3, 4);
                            history.replace(`/plans/sell-plan/${id}/${newPlanId}/${memberId}${'?tab=payment-amounts'}`);
                        }
                    }),
                );
            }
        }
    };

    const search = (event) => {
        let query = event.query;
        let _filteredItems = allMembers.filter((item) => {
            let _item = `${item.firstName} ${item.middleName} ${item.lastName}`.trim();
            let _query = query.trim().toLowerCase();
            return _item.toLowerCase().includes(_query);
        });
        setItems(_filteredItems);
        return _filteredItems;
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
                    <CustomDropDown name="salesPerson" data={planInfo} onChange={handleChange} required options={employeesDropdown} optionLabel="name" />
                    <div className="md:col-4">
                        <label className="text-sm font-semibold">Referred By</label>
                        <AutoComplete
                            field="fullName"
                            value={planInfo.referredBy}
                            suggestions={items}
                            completeMethod={search}
                            onChange={handleChange1}
                            className="w-full"
                            showEmptyMessage={true}
                            required={true}
                            inputClassName="w-full mt-1"
                            itemTemplate={(item) => <div>{`${item.firstName} ${item.middleName} ${item.lastName} `}</div>}
                        />
                    </div>
                    <CustomDropDown name="campaign" data={planInfo} onChange={handleChange} required options={campaignDropdown} optionLabel="name" />
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
                <PrimaryButton label="Save & Hold" className="mx-2" onClick={() => handleNext('?tab=agreement')} />
                <LightButton label="Cancel" onClick={onCancel} />
            </CustomButtonGroup>
        </>
    );
};

export default AgreementTab;
