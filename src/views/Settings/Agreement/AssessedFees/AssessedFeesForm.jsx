import React, { useEffect, useState } from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import formValidation from '../../../../utils/validations';
import { CustomDropDown, CustomInput, CustomInputNumber, CustomInputSwitch } from '../../../../shared/Input/AllInputs';
import { getProfitCenters } from '../../../../redux/actions/InventorySettings/profitCenterAction';
import { useDispatch, useSelector } from 'react-redux';
import { AssessedTypeOptions, DeclinedaysOptions, daysOptions, monthDropdownOptions, preferedDueDay, yesNoOptions } from '../../../../utils/dropdownConstants';
import CustomPickList from '../../../../shared/Input/CustomPickList';
import { getClubs } from '../../../../redux/actions/BusinessSettings/clubsAction';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useHistory } from 'react-router-dom';

const AssessedFeesForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(getProfitCenters());
        dispatch(getClubs());
    }, [dispatch]);

    const { profitCenterDropdown } = useSelector((state) => state.profitCenter);
    const { clubsDropdown } = useSelector((state) => state.clubs);
    const { loading } = useSelector((state) => state?.loader?.isLoading);
    const initialState = {
        name: '',
        isActive: true,
        type: 'Annual Fee',
        profitCenter: '',
        amount: 0,
        reccuring: 'false',
        membershipPlan: [],
        preferedDueDate: 'Month and Day',
        noOfDays: 0,
        noOfMonths: 0,
        clubs: [],
    };

    const [data, setData] = useState(initialState);

    useEffect(() => {
        setData((prev) => ({
            ...prev,
            type: data?.type,
            profitCenter: '',
            amount: 0,
            reccuring: 'false',
            membershipPlan: [],
            preferedDueDate: 'Month and Day',
            noOfDays: 0,
            noOfMonths: 0,
            clubs: [],
        }));
    }, [data?.type]);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const onSave = () => {};

    return (
        <>
            <FormPage backText="Assessed Fee">
                <CustomCard col="12" title="General">
                    <CustomInputSwitch name="isActive" data={data} onChange={handleChange} />
                    <CustomGridLayout>
                        <CustomInput name="name" data={data} onChange={handleChange} required />
                        <CustomDropDown name="type" options={AssessedTypeOptions} onChange={handleChange} data={data} />
                        <CustomDropDown name="profitCenter" options={profitCenterDropdown} onChange={handleChange} data={data} />
                        <CustomInputNumber name="amount" options={yesNoOptions} onChange={handleChange} data={data} col="4" />
                        {(data?.type === 'Annual Fee' || data?.type === 'Freeze Fee') && (
                            <CustomDropDown name="reccuring" options={yesNoOptions} onChange={handleChange} data={data} />
                        )}
                    </CustomGridLayout>
                </CustomCard>
                {data?.type === 'Annual Fee' && (
                    <CustomCard col="12" title="Preferred Due Date">
                        <CustomGridLayout>
                            <CustomDropDown
                                name="preferedDueDate"
                                label="Choose how the prefered due day will be determined"
                                options={preferedDueDay}
                                onChange={handleChange}
                                data={data}
                            />
                            {data?.preferedDueDate === 'Month and Day' ? (
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
                {(data?.type === 'Late Fee' || data?.type === 'Decline Fee') && (
                    <CustomCard col="12" title="Preferred Due Date">
                        <CustomGridLayout>
                            <CustomDropDown
                                name="noOfDays"
                                label="Choose how the prefered due day will be determined"
                                options={data?.type === 'Late Fee' ? daysOptions : DeclinedaysOptions}
                                onChange={handleChange}
                                data={data}
                            />
                        </CustomGridLayout>
                    </CustomCard>
                )}
                <CustomCard col="12" title=" Clubs">
                    <CustomPickList name="clubs" selected={data?.clubs} sourceData={clubsDropdown} onPickListChange={handleChange} />
                </CustomCard>
                {data?.type === 'Annual Fee' && (
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
