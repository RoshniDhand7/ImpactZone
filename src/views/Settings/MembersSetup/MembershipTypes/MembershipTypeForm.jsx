import React, { useEffect, useState } from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomDropDown, CustomInput, CustomInputNumber, CustomInputSwitch } from '../../../../shared/Input/AllInputs';
import formValidation from '../../../../utils/validations';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SpecialRestrictionOptions, defaultDiscountOptions, yesNoOptions } from '../../../../utils/dropdownConstants';
import CustomPickList from '../../../../shared/Input/CustomPickList';
import { getIds, showFormErrors } from '../../../../utils/commonFunctions';
import { getAccessSchedules } from '../../../../redux/actions/MembersSettings/accessSchedule';
import AddServices from '../../Inventory/CatalogItems/AddServices';
import useGetClubs from '../../../../hooks/useGetClubs';
import useDiscount from '../../../../hooks/useDiscount';
import { addMembershipType, editMembershipType, getMembershipType } from '../../../../redux/actions/Settings/MembershipSetup/membershipTypeAction';

const MembershipTypeForm = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(getAccessSchedules());
    }, [dispatch]);
    const [data, setData] = useState({
        name: '',
        description: '',
        discount: 'None',
        accessRestriction: false,
        accessSchedule: null,
        remoteCheckin: false,
        transferToAnotherType: null,
        clubCreditAmount: '',
        specialResrictions: 'None',
        minimumAgeAllowed: 0,
        maximumAgeAllowed: 0,
        maximumDaysAllowed: 0,
        maximumDistanceAllowed: 0,
        clubs: [],
        services: [],
        isActive: true,
    });

    const { AccessScheduleDropdown } = useSelector((state) => state.accessSchedule);
    let { membershipTypesDropdown } = useSelector((state) => state.settings.members);
    membershipTypesDropdown = membershipTypesDropdown?.filter((item) => item.name !== data?.name);

    const { clubsDropdown } = useGetClubs();
    const { allDiscountDropdown } = useDiscount();

    const history = useHistory();

    const { isTableLoading } = useSelector((state) => state?.tableLoader);

    useEffect(() => {
        if (id) {
            dispatch(
                getMembershipType(id, (data) => {
                    setData({
                        name: data.name,
                        description: data.description,
                        discount: data.discount === null ? 'None' : data.discount,
                        accessRestriction: data.accessRestriction,
                        accessSchedule: data.accessSchedule,
                        remoteCheckin: data.remoteCheckin,
                        transferToAnotherType: data.transferToAnotherType,
                        clubCreditAmount: data.clubCreditAmount,
                        specialResrictions: data.specialResrictions,
                        minimumAgeAllowed: data.minimumAgeAllowed,
                        maximumAgeAllowed: data.maximumAgeAllowed,
                        maximumDaysAllowed: data.maximumDaysAllowed,
                        maximumDistanceAllowed: data.maximumDistanceAllowed,
                        clubs: data.clubs,
                        services: data.services,
                        isActive: true,
                    });
                }),
            );
        }
    }, [id, dispatch]);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const discountTypeOptions = [...defaultDiscountOptions, ...allDiscountDropdown];

    const onSave = () => {
        let ignore = [];
        switch (data?.specialResrictions) {
            case 'By Age':
                ignore = ['maximumDaysAllowed', 'maximumDistanceAllowed', 'services'];
                break;
            case 'By Location':
                ignore = ['minimumAgeAllowed', 'maximumAgeAllowed', 'maximumDaysAllowed', 'services'];
                break;
            case 'By Days':
                ignore = ['maximumAgeAllowed', 'minimumAgeAllowed', 'maximumDistanceAllowed', 'services'];
                break;
            default:
                ignore = ['maximumDaysAllowed', 'maximumDistanceAllowed', 'minimumAgeAllowed', 'maximumAgeAllowed', 'services', 'clubs'];
                break;
        }
        if (showFormErrors(data, setData, ignore)) {
            if (id) {
                dispatch(
                    editMembershipType(id, { ...data, services: getIds(data.services), discount: data.discount === 'None' ? null : data.discount }, history),
                );
            } else {
                dispatch(
                    addMembershipType({ ...data, services: getIds(data.services), discount: data.discount === 'None' ? null : data.discount }, () =>
                        history.goBack(),
                    ),
                );
            }
        }
    };
    return (
        <>
            <FormPage backText="Membership Types">
                <CustomCard col="12" title="General">
                    <CustomInputSwitch name="isActive" data={data} onChange={handleChange} />
                    <CustomGridLayout>
                        <CustomInput name="name" data={data} onChange={handleChange} required />
                        <CustomInput name="description" data={data} onChange={handleChange} />
                        <CustomDropDown name="discount" options={discountTypeOptions} onChange={handleChange} data={data} />
                        <CustomDropDown name="accessRestriction" options={yesNoOptions} onChange={handleChange} data={data} />
                        {data?.accessRestriction && (
                            <CustomDropDown name="accessSchedule" options={AccessScheduleDropdown} onChange={handleChange} data={data} />
                        )}
                        <CustomDropDown name="remoteCheckin" options={yesNoOptions} onChange={handleChange} data={data} />
                        <CustomDropDown name="transferToAnotherType" options={membershipTypesDropdown} onChange={handleChange} data={data} />
                        <CustomInputNumber prefix="$" name="clubCreditAmount" data={data} onChange={handleChange} col="4" />
                        <CustomDropDown name="specialResrictions" options={SpecialRestrictionOptions} onChange={handleChange} data={data} />
                        {data?.specialResrictions === 'By Age' && (
                            <>
                                <CustomInputNumber name="minimumAgeAllowed" data={data} onChange={handleChange} col="4" />
                                <CustomInputNumber name="maximumAgeAllowed" data={data} onChange={handleChange} col="4" />
                            </>
                        )}
                        {data?.specialResrictions === 'By Location' && (
                            <>
                                <CustomInputNumber name="maximumDistanceAllowed" data={data} onChange={handleChange} col="4" />
                            </>
                        )}
                        {data?.specialResrictions === 'By Days' && (
                            <>
                                <CustomInputNumber name="maximumDaysAllowed" data={data} onChange={handleChange} col="4" />
                            </>
                        )}
                    </CustomGridLayout>
                </CustomCard>
                <CustomCard col="12" title=" Clubs">
                    <CustomPickList name="clubs" selected={data?.clubs} sourceData={clubsDropdown} onPickListChange={handleChange} />
                </CustomCard>
                <AddServices data={data} setData={setData} id={id} loading={isTableLoading} name="Add Services" />
                <CustomButtonGroup>
                    <PrimaryButton label="Save" className="mx-2" onClick={onSave} loading={isTableLoading} />
                    <LightButton label="Cancel" onClick={() => history.goBack()} />
                </CustomButtonGroup>
            </FormPage>
        </>
    );
};

export default MembershipTypeForm;
