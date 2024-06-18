import React, { useCallback, useEffect, useState } from 'react';
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
import { showFormErrors } from '../../../utils/commonFunctions';

const Personal = () => {
    const { data, setData, initialState, getMember } = useMemberDetail();
    const [visiblePersonalDetail, setVisiblePersonal] = useState(null);
    const [visibleDemographics, setVisibleDemographics] = useState(null);
    const [visibleMembershipDetail, setVisibleMembershipDetail] = useState(null);
    const [visibleAccessCode, setVisibleAccessCode] = useState(null);
    const { id } = useParams();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state?.loader?.isLoading);
    const handleCheckboxChange = useCallback(
        (category, name) => {
            setData((prevState) => {
                const updatedCategory = {
                    ...prevState[category],
                    [name]: !prevState[category][name],
                };
                const updatedState = {
                    ...prevState,
                    [category]: updatedCategory,
                };

                dispatch(editMemberAction(id, { [category]: updatedCategory }, () => {}));

                return updatedState;
            });
        },
        [dispatch, id],
    );
    const [data1, setData1] = useState(initialState);

    useEffect(() => {
        dispatch(getMemberAction(id));
    }, [dispatch, id, visiblePersonalDetail, visibleDemographics, visibleMembershipDetail, visibleAccessCode]);

    useEffect(() => {
        if (getMember) {
            setData1({
                firstName: getMember.firstName,
                lastName: getMember.lastName,
                barCode: getMember.barCode,
                email: getMember?.email,
                dob: getMember.dob ? new Date(getMember.dob) : '',
                isActive: getMember.isActive,
                image: getMember.image ? [getMember.image] : [],
                primaryPhone: getMember.primaryPhone,
                drivingLicience: getMember.drivingLicience,
                address: getMember.address,
                newAccessCode: '',
                gender: getMember.gender,
                mobilePhone: getMember.mobilePhone,
                workNumber: getMember.workNumber,
                membershipType: getMember.membershipTypeId ? getMember?.membershipTypeId : null,
                membershipTypeName: getMember?.membershipType ? getMember?.membershipType : null,
                socialSecurity: getMember.socialSecurity,
                occupation: getMember.occupation,
                accessCode: '',
                reAccessCode: '',
                text: {
                    membership: getMember?.text?.membership,
                    services: getMember?.text?.services,
                    booking: getMember?.text?.booking,
                },
                promotional: {
                    membership: getMember?.promotional?.membership,
                    services: getMember?.promotional?.services,
                    booking: getMember?.promotional?.booking,
                },
            });
        }
    }, [getMember]);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data1);
        setData1((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    useEffect(() => {
        dispatch(getMembersipTypes());
    }, []);
    const { MembershipTypesDropdown } = useSelector((state) => state.membershipTypes);

    const handleSave = () => {
        let ignore = [];
        if (visiblePersonalDetail) {
            ignore = ['primaryPhone', 'workNumber', 'address', 'email', 'barCode', 'accessCode', 'reAccessCode', 'membershipType'];
        } else if (visibleDemographics) {
            ignore = ['firstName', 'lastName', 'barCode', 'accessCode', 'reAccessCode', 'membershipType'];
        } else if (visibleMembershipDetail) {
            ignore = ['primaryPhone', 'workNumber', 'address', 'email', 'firstName', 'lastName', 'accessCode', 'reAccessCode'];
        } else if (visibleAccessCode) {
            ignore = ['primaryPhone', 'workNumber', 'address', 'email', 'firstName', 'lastName', 'barCode', 'membershipType'];
        }
        if (showFormErrors(data1, setData1, ignore)) {
            dispatch(
                editMemberAction(id, data1, () => {
                    dispatch(getMemberAction(id));
                    setData1(initialState);
                    setVisiblePersonal(null);
                    setVisibleDemographics(null);
                    setVisibleMembershipDetail(null);
                    setVisibleAccessCode(null);
                }),
            );
        }
    };

    return (
        <>
            <CustomDialog
                width="50vh"
                title={'Edit'}
                visible={visiblePersonalDetail}
                onCancel={() => {
                    setData1(initialState);
                    setVisiblePersonal(null);
                }}
                loading={loading}
                onSave={handleSave}
            >
                <CustomGridLayout>
                    <CustomInput name="firstName" col={6} data={data1} onChange={handleChange} />
                    <CustomInput name="lastName" col={6} data={data1} onChange={handleChange} />
                    <CustomDropDown name="gender" options={genderOptions} col={6} data={data1} onChange={handleChange} />
                    <CustomCalenderInput name="dob" data={data1} onChange={handleChange} col={6} />
                    <CustomInput name="socialSecurity" col={6} data={data1} onChange={handleChange} />
                    <CustomInput name="occupation" col={6} data={data1} onChange={handleChange} />
                    <CustomInput name="employeer" col={6} data={data1} onChange={handleChange} />
                </CustomGridLayout>
            </CustomDialog>
            <CustomDialog
                width="50vh"
                title={'Edit'}
                visible={visibleDemographics}
                onCancel={() => {
                    setData1(initialState);
                    setVisibleDemographics(null);
                }}
                loading={loading}
                onSave={handleSave}
            >
                <CustomGridLayout>
                    <CustomInput name="address" col={6} data={data1} onChange={handleChange} />
                    <CustomInput name="email" col={6} data={data1} onChange={handleChange} />
                    <CustomInputMask inputClass="border-1" col={6} name="primaryPhone" mask="(999) 999-9999" data={data1} onChange={handleChange} />
                    <CustomInputMask inputClass="border-1" col={6} name="mobilePhone" mask="(999) 999-9999" data={data1} onChange={handleChange} />
                    <CustomInputMask inputClass="border-1" col={6} name="workNumber" mask="(999) 999-9999" data={data1} onChange={handleChange} />
                    <CustomInput name="drivingLicience" col={6} data={data1} onChange={handleChange} />
                </CustomGridLayout>
            </CustomDialog>
            <CustomDialog
                width="70vh"
                title={'Edit'}
                visible={visibleMembershipDetail}
                onCancel={() => {
                    setData1(initialState);
                    setVisibleMembershipDetail(null);
                }}
                loading={loading}
                onSave={handleSave}
            >
                <CustomGridLayout>
                    <CustomInputNumber name="barCode" col={6} data={data1} onChange={handleChange} />
                    <CustomDropDown name="membershipType" col={6} data={data1} options={MembershipTypesDropdown} onChange={handleChange} draggable={false} />
                </CustomGridLayout>
            </CustomDialog>
            <CustomDialog
                width="73vh"
                title={getMember?.accessCode ? 'Edit' : 'Add'}
                visible={visibleAccessCode}
                onCancel={() => {
                    setData1(initialState);
                    setVisibleAccessCode(null);
                }}
                loading={loading}
                onSave={handleSave}
            >
                <CustomGridLayout>
                    {getMember?.accessCode ? (
                        <>
                            <CustomInput name="oldAccessCode" col={6} data={data1} onChange={handleChange} />
                            <CustomInput name="accessCode" col={6} data={data1} onChange={handleChange} />
                            <CustomInput label="Re-enter Access Code" name="reAccessCode" col={6} data={data1} onChange={handleChange} />
                        </>
                    ) : (
                        <>
                            <CustomInput name="accessCode" col={6} data={data1} onChange={handleChange} />
                            <CustomInput label="Re-enter Access Code" name="reAccessCode" col={6} data={data1} onChange={handleChange} />
                        </>
                    )}
                </CustomGridLayout>
            </CustomDialog>
            <div className="grid">
                <div className="md:col-12">
                    <ProfileDetail data={data} setData={setData} id={id} initialState={initialState} getMember={getMember} />
                    <TopLayout />
                    <div className="grid">
                        <CustomCard
                            title="Personal Details "
                            col={6}
                            name="Edit"
                            onClick={() => {
                                setVisiblePersonal(id);
                            }}
                            height="250px"
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
                            height="250px"
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
                            height="150px"
                        >
                            <CustomListItem name="barCode" data={data} />
                            <CustomListItem name="membershipTypeName" data={data} />
                        </CustomCard>
                        <CustomCard
                            title="Access Code"
                            col={6}
                            name={data?.accessCode ? 'Edit' : 'Add'}
                            onClick={() => {
                                setVisibleAccessCode(id);
                            }}
                            height="150px"
                        >
                            <CustomListItem name="accessCode" data={data} />
                            <CustomListItem name="failedAttempts" data={data} />
                        </CustomCard>
                        <CustomCard title="Opt.Ins" col={6} height="200px">
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
