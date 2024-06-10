import React, { useEffect, useState } from 'react';
import CustomCard, { CustomGridLayout, CustomListItem } from '../../../shared/Cards/CustomCard';
import useMemberDetail from './useMemberDetail';
import TopLayout from './TopLayout';
import ProfileDetail from './ProfileDetail';
import { CustomCalenderInput, CustomCheckbox, CustomDropDown, CustomInput, CustomInputMask, CustomInputNumber } from '../../../shared/Input/AllInputs';
import { useParams } from 'react-router-dom';
import CustomDialog from '../../../shared/Overlays/CustomDialog';
import { genderOptions } from '../../../utils/dropdownConstants';
import formValidation from '../../../utils/validations';
import { useDispatch, useSelector } from 'react-redux';
import { editMemberAction, getMemberAction } from '../../../redux/actions/Dashboard/Members';
import moment from 'moment';
import { getMembersipTypes } from '../../../redux/actions/MembersSettings/membershipTypes';

const Personal = () => {
    const { data, setData, initialState, getMember } = useMemberDetail();
    const { id } = useParams();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state?.loader?.isLoading);

    const handleCheckboxChange = (category, name) => {
        setData((prevState) => ({
            ...prevState,
            [category]: {
                ...prevState[category],
                [name]: !prevState[category][name],
            },
        }));
        dispatch(editMemberAction(id, data, () => {}));
    };

    const [visiblePersonalDetail, setVisiblePersonal] = useState(null);
    const [visibleDemographics, setVisibleDemographics] = useState(null);
    const [visibleMembershipDetail, setVisibleMembershipDetail] = useState(null);
    const [visibleAccessCode, setVisibleAccessCode] = useState(null);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    useEffect(() => {
        dispatch(getMembersipTypes());
    }, []);
    const { MembershipTypesDropdown } = useSelector((state) => state.membershipTypes);

    console.log(data, 'data');

    const handleSave = () => {
        dispatch(
            editMemberAction(id, data, () => {
                dispatch(getMemberAction(id));
                setData(initialState);
                setVisiblePersonal(null);
                setVisibleDemographics(null);
                setVisibleMembershipDetail(null);
            }),
        );
    };

    return (
        <>
            <CustomDialog
                width="50vh"
                title={'Edit'}
                visible={visiblePersonalDetail}
                onCancel={() => {
                    dispatch(getMemberAction(id));
                    setData(initialState);
                    setVisiblePersonal(null);
                }}
                loading={loading}
                onSave={handleSave}
            >
                <CustomGridLayout>
                    <CustomInput name="firstName" col={6} data={data} onChange={handleChange} />
                    <CustomInput name="lastName" col={6} data={data} onChange={handleChange} />
                    <CustomDropDown name="gender" options={genderOptions} col={6} data={data} onChange={handleChange} />
                    <CustomCalenderInput name="dob" data={data} onChange={handleChange} col={6} />
                    <CustomInput name="socialSecurity" col={6} data={data} onChange={handleChange} />
                    <CustomInput name="occupation" col={6} data={data} onChange={handleChange} />
                    <CustomInput name="employeer" col={6} data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomDialog>
            <CustomDialog
                width="50vh"
                title={'Edit'}
                visible={visibleDemographics}
                onCancel={() => {
                    dispatch(getMemberAction(id));
                    setData(initialState);
                    setVisibleDemographics(null);
                }}
                loading={loading}
                onSave={handleSave}
            >
                <CustomGridLayout>
                    <CustomInput name="address" col={6} data={data} onChange={handleChange} />
                    <CustomInput name="email" col={6} data={data} onChange={handleChange} />
                    <CustomInputMask inputClass="border-1" col={6} name="primaryPhone" mask="(999) 999-9999" data={data} onChange={handleChange} />
                    <CustomInputMask inputClass="border-1" col={6} name="mobilePhone" mask="(999) 999-9999" data={data} onChange={handleChange} />
                    <CustomInputMask inputClass="border-1" col={6} name="workNumber" mask="(999) 999-9999" data={data} onChange={handleChange} />
                    <CustomInput name="drivingLicience" col={6} data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomDialog>
            <CustomDialog
                width="50vh"
                title={'Edit'}
                visible={visibleMembershipDetail}
                onCancel={() => {
                    dispatch(getMemberAction(id));
                    setData(initialState);
                    setVisibleMembershipDetail(null);
                }}
                loading={loading}
                onSave={handleSave}
            >
                <CustomGridLayout>
                    <CustomInputNumber name="barCode" col={6} data={data} onChange={handleChange} />
                    <CustomDropDown name="membershipType" col={6} data={data} options={MembershipTypesDropdown} onChange={handleChange} draggable={false} />
                </CustomGridLayout>
            </CustomDialog>
            <CustomDialog
                width="50vh"
                title={'Add'}
                visible={visibleAccessCode}
                onCancel={() => {
                    dispatch(getMemberAction(id));
                    setData(initialState);
                    setVisibleAccessCode(null);
                }}
                loading={loading}
                onSave={handleSave}
            >
                <CustomGridLayout>
                    {getMember?.accessCode ? (
                        <>
                            <CustomInput name="oldAccessCode" col={6} data={data} onChange={handleChange} />
                            <CustomInput name="NewAccessCode" col={6} data={data} onChange={handleChange} />
                            <CustomInput label="Re-enter Access Code" name="ReAccessCode" col={6} data={data} onChange={handleChange} />
                        </>
                    ) : (
                        <>
                            <CustomInput name="accessCode" col={6} data={data} onChange={handleChange} />
                            <CustomInput label="Re-enter Access Code" name="ReAccessCode" col={6} data={data} onChange={handleChange} />
                        </>
                    )}
                </CustomGridLayout>
            </CustomDialog>
            <div className="grid">
                <div className="md:col-12">
                    <ProfileDetail data={data} />
                    <TopLayout />
                    <div className="grid">
                        <CustomCard
                            title="Personal Details "
                            col={6}
                            name="Edit"
                            onClick={() => {
                                setVisiblePersonal(id);
                            }}
                        >
                            <CustomListItem name="firstName" data={data} />
                            <CustomListItem name="lastName" data={data} />
                            <CustomListItem name="gender" data={data} />
                            <CustomListItem name="dob" value={moment(data?.dob).format('DD-MM-YYYY')} />
                            <CustomListItem name="socialSecurity" data={data} />
                            <CustomListItem name="occupation" data={data} />
                            <CustomListItem name="employeer" data={data} />
                        </CustomCard>
                        <CustomCard
                            title="Demographics "
                            col={6}
                            name="Edit"
                            onClick={() => {
                                setVisibleDemographics(id);
                            }}
                        >
                            <CustomListItem name="address" data={data} />
                            <CustomListItem name="email" data={data} />
                            <CustomListItem name="primaryPhone" data={data} />
                            <CustomListItem name="mobilePhone" data={data} />
                            <CustomListItem name="workNumber" data={data} />
                            <CustomListItem name="drivingLicience" data={data} />
                        </CustomCard>
                        <CustomCard
                            title="Membership Details"
                            col={6}
                            name="Edit"
                            onClick={() => {
                                setVisibleMembershipDetail(id);
                            }}
                        >
                            <CustomListItem name="barCode" data={data} />
                            <CustomListItem name="membershipType" data={data} />
                        </CustomCard>
                        <CustomCard
                            title="Access Code"
                            col={6}
                            name={data?.accessCode ? 'Edit' : 'Add'}
                            onClick={() => {
                                setVisibleAccessCode(id);
                            }}
                        >
                            <CustomListItem name="accessCode" data={data} />
                            <CustomListItem name="failedAttempts" data={data} />
                        </CustomCard>
                        <CustomCard title="Opt.Ins" col={6}>
                            <div className="grid">
                                <div className="col-6">
                                    <small className="font-semibold text-dark-blue">Texts</small>
                                    <CustomCheckbox
                                        name="membership"
                                        label="Membership"
                                        checked={data.text.membership}
                                        onChange={() => handleCheckboxChange('text', 'membership')}
                                    />
                                    <CustomCheckbox
                                        name="services"
                                        label="Services"
                                        checked={data.text.services}
                                        onChange={() => handleCheckboxChange('text', 'services')}
                                    />
                                    <CustomCheckbox
                                        name="booking"
                                        label="Booking"
                                        checked={data.text.booking}
                                        onChange={() => handleCheckboxChange('text', 'booking')}
                                    />
                                </div>
                                <div className="col-6">
                                    <small className="font-semibold text-dark-blue">Promotional</small>

                                    <CustomCheckbox
                                        name="membership"
                                        label="Membership"
                                        checked={data.promotional.membership}
                                        onChange={() => handleCheckboxChange('promotional', 'membership')}
                                    />
                                    <CustomCheckbox
                                        name="services"
                                        label="Services"
                                        checked={data.promotional.services}
                                        onChange={() => handleCheckboxChange('promotional', 'services')}
                                    />
                                    <CustomCheckbox
                                        name="booking"
                                        label="Booking"
                                        checked={data.promotional.booking}
                                        onChange={() => handleCheckboxChange('promotional', 'booking')}
                                    />
                                </div>
                            </div>
                        </CustomCard>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Personal;
