import React from 'react';
import CustomCard, { CustomFilterCard, CustomGridLayout, CustomListItem } from '../../../../shared/Cards/CustomCard';
import FormPage from '../../../../shared/Layout/FormPage';

const ViewEmployeeForm = () => {
    const data = {
        timeZone: 'GTTYY7643',
        dateOfBirth: '11/09/1998',
        socialSecurity: 'Unknown',
        email: 'roshni@yopmail.com',
        multiClubInOut: '',
        available: '',
    };
    return (
        <>
            <FormPage backText="Manage Employees" backTo="/settings/employee">
                <CustomGridLayout>
                    <CustomCard title="Security Details" height="200px">
                        <CustomListItem name="timeZone" data={data} />
                        <CustomListItem name="dateOfBirth" data={data} />
                        <CustomListItem name="socialSecurity" data={data} />
                        <CustomListItem name="email" data={data} />
                        <CustomListItem label="Multi-Club Clock In/Out" name="multiClubInOut" data={data} />
                        <CustomListItem label="Available" name="available" data={data} />
                        <CustomListItem label="Selected" name="available" data={data} />
                    </CustomCard>
                    <CustomCard title="General Details" height="200px">
                        <CustomListItem name="hireDate" data={data} />
                        <CustomListItem name="appId" data={data} />
                        <CustomListItem name="primaryPhone" data={data} />
                        <CustomListItem name="workPhone" data={data} />
                        <CustomListItem name="mobilePhone" data={data} />
                        <CustomListItem name="faxPhone" data={data} />
                        <CustomListItem name="emergencyPhone" data={data} />
                        <CustomListItem name="streetAddress" data={data} />
                        <CustomListItem name="city" data={data} />
                        <CustomListItem name="state" data={data} />
                        <CustomListItem name="zipCode" data={data} />
                        <CustomListItem name="emailUpdates" data={data} />
                        <CustomListItem name="userName" data={data} />
                        <CustomListItem name="notes" data={data} />
                        <CustomListItem name="departments" data={data} />
                    </CustomCard>
                    <CustomCard title="Club Details" height="200px">
                        <CustomListItem name="available" data={data} />
                        <CustomListItem name="selected" data={data} />
                    </CustomCard>
                    <CustomCard title="Time Sheet Details" height="200px">
                        <CustomListItem name="club" data={data} />
                        <CustomListItem name="department" data={data} />
                        <CustomListItem name="clockIn" data={data} />
                        <CustomListItem name="clockOut" data={data} />
                        <CustomListItem label="duration" name="available" data={data} />
                        <CustomListItem label="modificationOn" name="available" data={data} />
                    </CustomCard>
                    <CustomCard title="Note Details" height="200px">
                        <CustomListItem name="takenBy" data={data} />
                        <CustomListItem name="date/time" data={data} />
                        <CustomListItem name="note" data={data} />
                    </CustomCard>
                    <CustomCard title="Certification Details" height="200px">
                        <CustomListItem name="name" data={data} />
                        <CustomListItem name="certificationNumber" data={data} />
                        <CustomListItem name="description" data={data} />
                        <CustomListItem name="issuer" data={data} />
                        <CustomListItem label="acquiredDate" name="available" data={data} />
                        <CustomListItem label="expirationDate" name="available" data={data} />
                    </CustomCard>
                </CustomGridLayout>
            </FormPage>
        </>
    );
};

export default ViewEmployeeForm;
