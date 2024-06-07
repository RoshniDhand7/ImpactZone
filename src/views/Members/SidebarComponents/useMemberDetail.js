import React, { useEffect, useState } from 'react';
import { getMemberAction } from '../../../redux/actions/Dashboard/Members';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const useMemberDetail = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const [data, setData] = useState({
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
        membershipTypes: '',
        mobilePhone: '',
        workNumber: '',
        membershipType: '',
        text: {
            membership: false,
            services: false,
            booking: false,
        },
        promotion: {
            membership: false,
            services: false,
            booking: false,
        },
    });
    useEffect(() => {
        dispatch(
            getMemberAction(id, (data) => {
                setData({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    barCode: data.barCode,
                    isActive: data.isActive,
                    image: data.image,
                    primaryPhone: data.primaryPhone,
                    address: data.address,
                    gender: data.gender,
                    dob: data.dob,
                    mobilePhone: data.mobilePhone,
                    workNumber: data.workNumber,
                    membershipType: data.membershipType,
                    text: {
                        membership: false,
                        services: false,
                        booking: false,
                    },
                    promotion: {
                        membership: false,
                        services: false,
                        booking: false,
                    },
                });
            }),
        );
    }, [dispatch, id]);
    return { data, setData };
};

export default useMemberDetail;
