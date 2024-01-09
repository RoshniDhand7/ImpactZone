import React, { useState, useEffect } from 'react';
import CustomCard, { CustomGridLayout, CustomListItem, CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import { getCompanyDetails } from '../../../../redux/actions/BusinessSettings/companyActions';
import { useDispatch, useSelector } from 'react-redux';

export default function Company() {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        dispatch(getCompanyDetails(setLoading));
    }, [dispatch]);
    let { allCompany } = useSelector((state) => state?.company);
    let data = {
        companyId: 'DT030591',
        billingCountry: 'United States',
        companyName: 'fitX',
        multiClubInOut: false,
        clockInRequired: true,
        country: 'India',
        address1: 'F-301',
        address2: 'Sector 74',
        city: 'Mohali',
        state: 'Punjab',
        zipCode: '160055',
        workNumber: '9876543210',
        workExtention: '160055',
        faxNumber: '345623',
        primaryEmail: 'primary@gmail.com',
        alternateEmail: 'abc@gmail.com',
        companyUrl: 'https://url.com',
        companyCode: 'DT030591',
        batchId: 'DT03059121',
        checkInLimit: 'No Limit',
        per: 'Week (7 Days)',
        restrictionType: 'Company',
        bookOutFrom: '14 days',
        bookOutTo: '2 Days',
        allowCancelOnline: false,
        timeBeforeEvent: '12 hours',
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Edit Company Details" linkTo="/settings/business/company/edit" />

            <CustomGridLayout>
                <CustomCard title="General Details" height="200px">
                    <CustomListItem data={allCompany} name="companyId" />
                    <CustomListItem data={allCompany} name="billingCountry" />
                    <CustomListItem data={allCompany} name="companyName" />
                    <CustomListItem data={allCompany} label="Allow Multi-Club Clock In/Out" name="multiClubInOut" />
                    <CustomListItem data={allCompany} label="Clock In Department Required" name="clockInRequired" />
                </CustomCard>
                <CustomCard title="Address Details" height="200px">
                    <CustomListItem data={allCompany} name="country" />
                    <CustomListItem data={allCompany} name="address1" />
                    <CustomListItem data={allCompany} name="address2" />
                    <CustomListItem data={allCompany} name="city" />
                    <CustomListItem data={allCompany} name="state" />
                    <CustomListItem data={allCompany} name="zipCode" />
                </CustomCard>
                <CustomCard title="Contact Information" height="200px">
                    <CustomListItem data={allCompany} name="workNumber" />
                    <CustomListItem data={allCompany} name="workExtention" />
                    <CustomListItem data={allCompany} name="faxNumber" />
                    <CustomListItem data={allCompany} name="primaryEmail" />
                    <CustomListItem data={allCompany} name="alternateEmail" />
                    <CustomListItem data={allCompany} name="companyUrl" label="Company URL" />
                </CustomCard>
                <CustomCard title="allCompany Export Information" height="200px">
                    <CustomListItem data={allCompany} name="companyCode" />
                    <CustomListItem data={allCompany} name="batchId" />
                </CustomCard>
                <CustomCard title="Remote Check Ins Information" height="200px">
                    <CustomListItem data={allCompany} name="checkInLimit" />
                    <CustomListItem data={allCompany} name="per" />
                    <CustomListItem data={allCompany} name="restrictionType" />
                </CustomCard>
                <CustomCard title="Booking and Cancellation Info" height="200px">
                    <CustomListItem data={allCompany} name="bookOutFrom" />
                    <CustomListItem data={allCompany} name="bookOutTo" />
                    <CustomListItem data={allCompany} name="allowCancelOnline" />
                    <CustomListItem data={allCompany} name="timeBeforeEvent" />
                </CustomCard>
            </CustomGridLayout>
        </>
    );
}
