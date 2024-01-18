import React, { useEffect, useState } from 'react';
import CustomCard, { CustomGridLayout, CustomListItem } from '../../../../shared/Cards/CustomCard';
import FormPage from '../../../../shared/Layout/FormPage';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getEmployee } from '../../../../redux/actions/EmployeeSettings/employeesAction';

const ViewEmployeeForm = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        timeZone: '',
        dateOfBirth: '',
        socialSecurity: '',
        email: '',
        multiClubClockIn: '',
    });

    useEffect(() => {
        if (id) {
            dispatch(
                getEmployee(id, (data) => {
                    setData({
                        timeZone: data.timeZone,
                        dateOfBirth: data.dob,
                        socialSecurity: data.socialSecurity,
                        email: data.email,
                        multiClubClockIn: data.multiClubClockIn,
                    });
                }),
            );
        }
    }, [id, dispatch]);
    // const  = {
    //     timeZone: 'GTTYY7643',
    //     dateOfBirth: '11/09/1998',
    //     socialSecurity: 'Unknown',
    //     email: 'roshni@yopmail.com',
    //     multiClubInOut: '',
    //     available: '',
    // };
    return (
        <>
            <FormPage backText="Manage Employees" backTo="/settings/employee">
                <CustomGridLayout>
                    <CustomCard title="Security Details" height="200px">
                        <CustomListItem name="dateOfBirth" data={data} />
                        <CustomListItem name="socialSecurity" data={data} />
                        <CustomListItem name="email" data={data} />
                        <CustomListItem label="Multi-Club Clock In/Out" name="multiClubClockIn" data={data} />
                        {/* <CustomListItem label="Available" name="available" />
                        <CustomListItem label="Selected" name="available" /> */}
                    </CustomCard>
                    {/* <CustomCard title="General Details" height="200px">
                        <CustomListItem name="hireDate" />
                        <CustomListItem name="appId" />
                        <CustomListItem name="primaryPhone" />
                        <CustomListItem name="workPhone" />
                        <CustomListItem name="mobilePhone" />
                        <CustomListItem name="faxPhone" />
                        <CustomListItem name="emergencyPhone" />
                        <CustomListItem name="streetAddress" />
                        <CustomListItem name="city" />
                        <CustomListItem name="state" />
                        <CustomListItem name="zipCode" />
                        <CustomListItem name="emailUpdates" />
                        <CustomListItem name="userName" />
                        <CustomListItem name="notes" />
                        <CustomListItem name="departments" />
                    </CustomCard>
                    <CustomCard title="Club Details" height="200px">
                        <CustomListItem name="available" />
                        <CustomListItem name="selected" />
                    </CustomCard>
                    <CustomCard title="Time Sheet Details" height="200px">
                        <CustomListItem name="club" />
                        <CustomListItem name="department" />
                        <CustomListItem name="clockIn" />
                        <CustomListItem name="clockOut" />
                        <CustomListItem label="duration" name="available" />
                        <CustomListItem label="modificationOn" name="available" />
                    </CustomCard>
                    <CustomCard title="Note Details" height="200px">
                        <CustomListItem name="takenBy" />
                        <CustomListItem name="date/time" />
                        <CustomListItem name="note" />
                    </CustomCard>
                    <CustomCard title="Certification Details" height="200px">
                        <CustomListItem name="name" />
                        <CustomListItem name="certificationNumber" />
                        <CustomListItem name="description" />
                        <CustomListItem name="issuer" />
                        <CustomListItem label="acquiredDate" name="available" />
                        <CustomListItem label="expirationDate" name="available" />
                    </CustomCard> */}
                </CustomGridLayout>
            </FormPage>
        </>
    );
};

export default ViewEmployeeForm;
