import { useEffect, useState } from 'react';
import { getMemberAction } from '../../../redux/actions/Dashboard/Members';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const useMemberDetail = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const initialState = {
        firstName: '',
        lastName: '',
        barCode: 0,
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
        email: '',
        MI: '',
        homeno: '',
        emergencyContact: '',
        membershipType: null,
        membershipTypeName: null,
        mobilePhone: '',
        workNumber: '',
        driverLicense: '',
        newAccessCode: '',
        accessCode: '',
        reAccessCode: '',
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
                email: getMember?.email,
                dob: getMember.dob ? new Date(getMember.dob) : '',
                isActive: getMember.isActive,
                image: getMember.image ? [getMember.image] : [],
                MI: getMember.MI,
                primaryPhone: getMember.primaryPhone,
                driverLicense: getMember.driverLicense,
                address: getMember.address,
                gender: getMember.gender,
                mobilePhone: getMember.mobilePhone,
                workNumber: getMember.workNumber,
                membershipType: getMember.membershipTypeId ? getMember?.membershipTypeId : null,
                membershipTypeName: getMember?.membershipType ? getMember?.membershipType : null,
                socialSecurity: getMember.socialSecurity,
                occupation: getMember.occupation,
                accessCode: getMember.accessCode,
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

    return { data, setData, initialState, getMember };
};

export default useMemberDetail;
