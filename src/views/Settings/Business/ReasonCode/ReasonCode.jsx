import React from 'react';
import CustomCard, {
  CustomGridLayout,
  CustomListItem,
  CustomFilterCard,
} from '../../../../shared/Cards/CustomCard';

export default function ReasonCode() {
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
      <CustomFilterCard
        buttonTitle="Add Reason Code"
        linkTo="/settings/business/reason-code/add"
      />
      <CustomGridLayout>
        <CustomCard title="General Details" height="200px">
          <CustomListItem data={data} name="companyId" />
          <CustomListItem data={data} name="billingCountry" />
          <CustomListItem data={data} name="companyName" />
          <CustomListItem
            data={data}
            label="Allow Multi-Club Clock In/Out"
            name="multiClubInOut"
          />
          <CustomListItem
            data={data}
            label="Clock In Department Required"
            name="clockInRequired"
          />
        </CustomCard>
        <CustomCard title="Address Details" height="200px">
          <CustomListItem data={data} name="country" />
          <CustomListItem data={data} name="address1" />
          <CustomListItem data={data} name="address2" />
          <CustomListItem data={data} name="city" />
          <CustomListItem data={data} name="state" />
          <CustomListItem data={data} name="zipCode" />
        </CustomCard>
        <CustomCard title="Contact Information" height="200px">
          <CustomListItem data={data} name="workNumber" />
          <CustomListItem data={data} name="workExtention" />
          <CustomListItem data={data} name="faxNumber" />
          <CustomListItem data={data} name="primaryEmail" />
          <CustomListItem data={data} name="alternateEmail" />
          <CustomListItem data={data} name="companyUrl" label="Company URL" />
        </CustomCard>
        <CustomCard title="Data Export Information" height="200px">
          <CustomListItem data={data} name="companyCode" />
          <CustomListItem data={data} name="batchId" />
        </CustomCard>
        <CustomCard title="Remote Check Ins Information" height="200px">
          <CustomListItem data={data} name="checkInLimit" />
          <CustomListItem data={data} name="per" />
          <CustomListItem data={data} name="restrictionType" />
        </CustomCard>
        <CustomCard title="Booking and Cancellation Info" height="200px">
          <CustomListItem data={data} name="bookOutFrom" />
          <CustomListItem data={data} name="bookOutTo" />
          <CustomListItem data={data} name="allowCancelOnline" />
          <CustomListItem data={data} name="timeBeforeEvent" />
        </CustomCard>
      </CustomGridLayout>
    </>
  );
}
