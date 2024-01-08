import React from 'react';
import CustomTabView from '../../../../shared/TabView/CustomTabView';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomInput } from '../../../../shared/Input/AllInputs';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';

export default function CompanyForm({ history }) {
    const General = () => {
        return (
            <>
                <CustomCard col="12" title="General">
                    <CustomGridLayout>
                        <CustomInput name="companyId" />
                        <CustomInput name="billingCountry" />
                        <CustomInput name="companyName" />
                        <CustomInput label="Allow Multi-Club Clock In/Out" />
                        <CustomInput label="Clock In Department Required" />
                    </CustomGridLayout>
                </CustomCard>
                <CustomCard col="12" title="Address">
                    <CustomGridLayout>
                        <CustomInput name="country" />
                        <CustomInput name="address1" />
                        <CustomInput name="address2" />
                        <CustomInput name="city" />
                        <CustomInput name="state" />
                        <CustomInput name="zipCode" />
                    </CustomGridLayout>
                </CustomCard>
                <CustomCard col="12" title="Contact Information">
                    <CustomGridLayout>
                        <CustomInput name="workNumber" />
                        <CustomInput name="workExtention" />
                        <CustomInput name="faxNumber" />
                        <CustomInput name="primaryEmail" />
                        <CustomInput name="alternateEmail" />
                        <CustomInput name="companyUrl" />
                    </CustomGridLayout>
                </CustomCard>
                <CustomCard col="12" title="Data Export">
                    <CustomGridLayout>
                        <CustomInput name="companyCode" />
                        <CustomInput name="batchId" />
                    </CustomGridLayout>
                </CustomCard>
                <CustomCard col="12" title="Remote Check Ins">
                    <CustomGridLayout>
                        <CustomInput name="checkInLimit" />
                        <CustomInput name="per" />
                        <CustomInput name="restrictionType" />
                    </CustomGridLayout>
                </CustomCard>
            </>
        );
    };

    const Online = () => {
        return (
            <>
                <CustomCard col="12" title="Booking">
                    <CustomGridLayout>
                        <CustomInput name="bookOutFrom" />
                        <CustomInput name="bookOutTo" />
                    </CustomGridLayout>
                </CustomCard>
                <CustomCard col="12" title="Cancellation">
                    <CustomGridLayout>
                        <CustomInput name="allowCancelOnline" />
                        <CustomInput name="timeBeforeEvent" />
                    </CustomGridLayout>
                </CustomCard>
            </>
        );
    };

    const tabs = [
        { title: 'General', content: <General /> },
        { title: 'Online', content: <Online /> },
    ];

    return (
        <FormPage backText="Company" backTo="/settings/business?tab=company">
            <CustomTabView tabs={tabs} />
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" />
                <LightButton label="Cancel" onClick={() => history.replace('/settings/business')} />
            </CustomButtonGroup>
        </FormPage>
    );
}
