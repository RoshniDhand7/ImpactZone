import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMemberData } from '../../../redux/actions/MembersPortal/memberPortalActions';

const useMemberDetail = () => {
    const { id } = useParams();

    const memberData = useSelector((state) => state.membersPortal.dashboard);
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
        !memberData && dispatch(getMemberData(id, 'dashboard'));
    }, []);

    useEffect(() => {
        if (memberData) {
            setData({
                firstName: memberData.firstName,
                lastName: memberData.lastName,
                barCode: memberData.barCode,
                email: memberData?.email ?? '',
                dob: memberData.dob ? new Date(memberData.dob) : '',
                isActive: memberData.isActive,
                image: memberData.image ? [memberData.image] : [],
                MI: memberData.MI,
                primaryPhone: memberData.primaryPhone,
                driverLicense: memberData.driverLicense,
                address: memberData.address,
                gender: memberData.gender,
                mobilePhone: memberData.mobilePhone,
                workNumber: memberData.workNumber,
                membershipType: memberData.membershipTypeId ? memberData?.membershipTypeId : null,
                membershipTypeName: memberData?.membershipType ? memberData?.membershipType : null,
                socialSecurity: memberData.socialSecurity,
                occupation: memberData.occupation,
                accessCode: memberData.accessCode,
                reAccessCode: '',
                text: {
                    membership: memberData?.text?.membership,
                    services: memberData?.text?.services,
                    booking: memberData?.text?.booking,
                },
                promotional: {
                    membership: memberData?.promotional?.membership,
                    services: memberData?.promotional?.services,
                    booking: memberData?.promotional?.booking,
                },
            });
        }
    }, [memberData]);

    return { data, setData, initialState };
};

export default useMemberDetail;
