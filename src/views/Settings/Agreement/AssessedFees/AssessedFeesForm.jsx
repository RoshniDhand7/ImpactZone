import React, { useEffect, useState } from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import formValidation from '../../../../utils/validations';
import { CustomDropDown, CustomInput, CustomInputNumber, CustomInputSwitch } from '../../../../shared/Input/AllInputs';
import { useDispatch, useSelector } from 'react-redux';
import { assessedTypeOptions, daysOptions, declineDaysOptions, monthDropdownOptions, preferedDueDay, yesNoOptions } from '../../../../utils/dropdownConstants';
import CustomPickList from '../../../../shared/Input/CustomPickList';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';
import { showFormErrors } from '../../../../utils/commonFunctions';
import useGetClubs from '../../../../hooks/useGetClubs';
import { addAssessedFee, editAssessedFee, getAssesedFees, getAssessedFee } from '../../../../redux/actions/Settings/AgreementSetup/assessedFeeAction';
import { getProfitCenters } from '../../../../redux/actions/Settings/InventorySetup/profitCenterAction';

const AssessedFeesForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    useEffect(() => {
        dispatch(getProfitCenters());
    }, [dispatch]);
    const { clubsDropdown } = useGetClubs();

    const { profitCenterDropdown } = useSelector((state) => state.profitCenter);
    const { loading } = useSelector((state) => state?.loader?.isLoading);
    const initialState = {
        name: '',
        isActive: true,
        type: 'ANNUAL_FEE',
        profitCenter: '',
        amount: 0,
        recurring: false,
        membershipPlan: [],
        dueDateDeterminedBy: 'MONTH_AND_DAY',
        noOfDays: 0,
        noOfMonths: 0,
        clubs: [],
    };

    const [data, setData] = useState(initialState);

    useEffect(() => {
        if (id) {
            dispatch(
                getAssessedFee(id, (data) => {
                    setData({
                        name: data.name,
                        isActive: data.isActive,
                        type: data.type,
                        profitCenter: data.profitCenter,
                        amount: data.amount,
                        recurring: data.recurring,
                        membershipPlan: data.membershipPlan,
                        dueDateDeterminedBy: data.dueDateDeterminedBy,
                        noOfDays: data.noOfDays,
                        noOfMonths: data.noOfMonths,
                        clubs: data.clubs,
                    });
                }),
            );
        }
    }, [id, dispatch]);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        if (name === 'type') {
            setData((prev) => ({
                ...prev,
                type: value,
                profitCenter: '',
                amount: 0,
                recurring: false,
                membershipPlan: [],
                dueDateDeterminedBy: '',
                noOfDays: 0,
                noOfMonths: 0,
                clubs: [],
            }));
        } else {
            setData((prev) => ({ ...prev, [name]: value, formErrors }));
        }
    };

    const onSave = () => {
        let ignore = [];
        switch (data?.type) {
            case 'ANNUAL_FEE':
                if (data?.dueDateDeterminedBy === 'DAYS_FROM_BEGIN_DATE') {
                    ignore = ['noOfMonths'];
                }
                break;
            case 'LATE_FEE':
            case 'DECLINE_FEE':
                ignore = ['noOfMonths'];
                break;
            default:
                ignore = ['noOfDays', 'noOfMonths'];
                break;
        }

        if (showFormErrors(data, setData, ignore)) {
            if (id) {
                dispatch(
                    editAssessedFee(id, data, () => {
                        dispatch(getAssesedFees());
                        history.goBack();
                    }),
                );
            } else {
                dispatch(
                    addAssessedFee(data, () => {
                        dispatch(getAssesedFees());
                        history.goBack();
                    }),
                );
            }
        }
    };

    return (
        <>
            <FormPage backText="Assessed Fee">
                <CustomCard col="12" title="General">
                    <CustomGridLayout>
                        <CustomInput name="name" data={data} onChange={handleChange} required />
                        <CustomDropDown name="type" options={assessedTypeOptions} onChange={handleChange} data={data} />
                        <CustomDropDown name="profitCenter" options={profitCenterDropdown} onChange={handleChange} data={data} required />
                        <CustomInputNumber name="amount" options={yesNoOptions} onChange={handleChange} data={data} required maxFractionDigits={4} />
                        {(data?.type === 'ANNUAL_FEE' || data?.type === 'FREEZE_FEE') && (
                            <CustomDropDown name="recurring" options={yesNoOptions} onChange={handleChange} data={data} />
                        )}
                        <CustomInputSwitch name="isActive" data={data} onChange={handleChange} />
                    </CustomGridLayout>
                </CustomCard>
                {data?.type === 'ANNUAL_FEE' && (
                    <CustomCard col="12" title="Preferred Due Date">
                        <CustomGridLayout>
                            <CustomDropDown
                                name="dueDateDeterminedBy"
                                label="Choose how the prefered due day will be determined"
                                options={preferedDueDay}
                                onChange={handleChange}
                                data={data}
                            />
                            {data?.dueDateDeterminedBy === 'MONTH_AND_DAY' ? (
                                <>
                                    <CustomDropDown name="noOfMonths" options={monthDropdownOptions} onChange={handleChange} data={data} />
                                    <CustomDropDown name="noOfDays" options={daysOptions} onChange={handleChange} data={data} />
                                </>
                            ) : (
                                <>
                                    <CustomDropDown name="noOfDays" options={daysOptions} onChange={handleChange} data={data} />
                                </>
                            )}
                        </CustomGridLayout>
                    </CustomCard>
                )}
                {(data?.type === 'LATE_FEE' || data?.type === 'DECLINE_FEE') && (
                    <CustomCard col="12" title="Preferred Due Date">
                        <CustomGridLayout>
                            <CustomDropDown
                                name="noOfDays"
                                label="Choose how the prefered due day will be determined"
                                options={data?.type === 'LATE_FEE' ? daysOptions : declineDaysOptions}
                                onChange={handleChange}
                                data={data}
                            />
                        </CustomGridLayout>
                    </CustomCard>
                )}
                <CustomCard col="12" title=" Clubs">
                    <CustomPickList name="clubs" selected={data?.clubs} sourceData={clubsDropdown} onPickListChange={handleChange} />
                </CustomCard>
                {data?.type === 'ANNUAL_FEE' && (
                    <CustomCard col="12" title="Membership Plans">
                        <CustomPickList name="membershipPlan" selected={data?.membershipPlan} sourceData={[]} onPickListChange={handleChange} />
                    </CustomCard>
                )}

                <CustomButtonGroup>
                    <PrimaryButton label="Save" className="mx-2" onClick={onSave} loading={loading} />
                    <LightButton label="Cancel" onClick={() => history.goBack()} />
                </CustomButtonGroup>
            </FormPage>
        </>
    );
};

export default AssessedFeesForm;
