import React, { useEffect } from 'react';
import CustomCard, { CustomGridLayout, CustomListItem, CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyDetail } from '../../../../redux/actions/Settings/Business/companyActions';

export default function Company() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCompanyDetail());
    }, [dispatch]);
    let { company } = useSelector((state) => state?.settings.business);

    return (
        <>
            <CustomFilterCard buttonTitle="Edit Company Details" linkTo="/settings/business/company/edit" />

            <CustomGridLayout>
                <CustomCard title="General Details" height="200px">
                    <CustomListItem data={company} name="companyId" value={company?._id} />
                    <CustomListItem data={company} name="billingCountry" />
                    <CustomListItem data={company} name="companyName" />
                    <CustomListItem data={company} label="Allow Multi-Club Clock In/Out" name="multiClubInOut" />
                    <CustomListItem data={company} label="Clock In Department Required" name="clockInRequired" />
                </CustomCard>
                <CustomCard title="Address Details" height="200px">
                    <CustomListItem data={company} name="country" />
                    <CustomListItem data={company} name="address1" />
                    <CustomListItem data={company} name="address2" />
                    <CustomListItem data={company} name="city" />
                    <CustomListItem data={company} name="state" />
                    <CustomListItem data={company} name="zipCode" />
                </CustomCard>
                <CustomCard title="Contact Information" height="200px">
                    <CustomListItem data={company} name="workNumber" />
                    <CustomListItem data={company} name="workExtention" />
                    <CustomListItem data={company} name="faxNumber" />
                    <CustomListItem data={company} name="primaryEmail" />
                    <CustomListItem data={company} name="alternateEmail" />
                    <CustomListItem data={company} name="companyUrl" label="Company URL" />
                </CustomCard>
                <CustomCard title="Data Export Information" height="200px">
                    <CustomListItem data={company} name="companyCode" />
                    <CustomListItem data={company} name="batchId" />
                </CustomCard>
                <CustomCard title="Remote Check Ins Information" height="200px">
                    <CustomListItem data={company} name="checkInLimit" />
                    <CustomListItem data={company} name="per" />
                    <CustomListItem data={company} name="restrictionType" />
                </CustomCard>
                <CustomCard title="Booking and Cancellation Info" height="200px">
                    <CustomListItem data={company} name="bookOutFrom" />
                    <CustomListItem data={company} name="bookOutTo" />
                    <CustomListItem data={company} name="allowCancelOnline" />
                    <CustomListItem data={company} name="timeBeforeEvent" />
                </CustomCard>
            </CustomGridLayout>
        </>
    );
}
