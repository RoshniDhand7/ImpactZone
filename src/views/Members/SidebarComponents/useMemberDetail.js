import React, { useEffect, useState } from 'react';
import { getMemberAction } from '../../../redux/actions/Dashboard/Members';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const useMemberDetail = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const initialState = {
        firstName: '',
        lastName: '',
        barCode: '',
        isActive: true,
        image: '',
        primaryPhone: '',
        address: '',
        name: '',
        gender: '',
        dob: '',
        socialSecurity: '',
        occupation: '',
        employeer: '',
        address: '',
        email: '',
        homeno: '',
        emergencyContact: '',
        barCode: '',
        membershipType: null,
        mobilePhone: '',
        workNumber: '',
        drivingLicience: '',
        text: {
            membership: false,
            services: false,
            booking: false,
        },
        promotional: {
            membership: false,
            services: false,
            booking: false,
        },
    };

    const [data, setData] = useState(initialState);
    useEffect(() => {
        dispatch(getMemberAction(id));
    }, [dispatch, id]);
    const { getMember } = useSelector((state) => state.members);

    useEffect(() => {
        if (getMember) {
            setData({
                firstName: getMember.firstName,
                lastName: getMember.lastName,
                barCode: getMember.barCode,
                dob: getMember.dob ? new Date(getMember.dob) : '',
                isActive: getMember.isActive,
                image: getMember.image,
                primaryPhone: getMember.primaryPhone,
                drivingLicience: getMember.drivingLicience,
                address: getMember.address,
                gender: getMember.gender,
                mobilePhone: getMember.mobilePhone,
                workNumber: getMember.workNumber,
                membershipType: getMember.membershipType ? getMember?.membershipType : null,
                socialSecurity: getMember.socialSecurity,
                occupation: getMember.occupation,
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

    return { data, setData, initialState, getMember };
};

export default useMemberDetail;
