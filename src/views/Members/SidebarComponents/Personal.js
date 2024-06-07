import React, { useState } from 'react';
import CustomCard, { CustomListItem } from '../../../shared/Cards/CustomCard';
import useMemberDetail from './useMemberDetail';
import TopLayout from './TopLayout';
import ProfileDetail from './ProfileDetail';
import { CustomCheckbox } from '../../../shared/Input/AllInputs';

const Personal = () => {
    const { data, setData } = useMemberDetail();

    const handleCheckboxChange = (category, name) => {
        setData((prevState) => ({
            ...prevState,
            [category]: {
                ...prevState[category],
                [name]: !prevState[category][name],
            },
        }));
    };

    return (
        <>
            <div className="grid">
                <div className="md:col-12">
                    <ProfileDetail data={data} />
                    <TopLayout />
                    <div className="grid">
                        <CustomCard title="Personal Details " col={6}>
                            <CustomListItem name="firstName" data={data} />
                            <CustomListItem name="lastName" data={data} />
                            <CustomListItem name="gender" data={data} />
                            <CustomListItem name="dob" data={data} />
                            <CustomListItem name="socialSecurity" data={data} />
                            <CustomListItem name="occupation" data={data} />
                            <CustomListItem name="employeer" data={data} />
                        </CustomCard>
                        <CustomCard title="Demographics " col={6}>
                            <CustomListItem name="address" data={data} />
                            <CustomListItem name="email" data={data} />
                            <CustomListItem name="primaryPhone" data={data} />
                            <CustomListItem name="mobilePhone" data={data} />
                            <CustomListItem name="workNumber" data={data} />
                            <CustomListItem name="emergencyContact" data={data} />
                        </CustomCard>
                        <CustomCard title="Membership Details" col={6}>
                            <CustomListItem name="barCode" data={data} />
                            <CustomListItem name="membershipTypes" data={data} />
                        </CustomCard>
                        <CustomCard title="Access Code" col={6}>
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
                                        checked={data.promotion.membership}
                                        onChange={() => handleCheckboxChange('promotion', 'membership')}
                                    />
                                    <CustomCheckbox
                                        name="services"
                                        label="Services"
                                        checked={data.promotion.services}
                                        onChange={() => handleCheckboxChange('promotion', 'services')}
                                    />
                                    <CustomCheckbox
                                        name="booking"
                                        label="Booking"
                                        checked={data.promotion.booking}
                                        onChange={() => handleCheckboxChange('promotion', 'booking')}
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
