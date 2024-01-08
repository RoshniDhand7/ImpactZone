import React from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomInput } from '../../../../shared/Input/AllInputs';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';

const ClubsForm = ({ history }) => {
    return (
        <>
            <FormPage backText="Clubs" backTo="/settings/business">
                <CustomCard col="12" title="Edit Club (Gym Floor)">
                    <CustomGridLayout>
                        <CustomInput name="Phone Number" />
                        <CustomInput name="Email" />
                        <CustomInput name="Address" />
                    </CustomGridLayout>
                    <CustomGridLayout>
                        <CustomInput name="Country" />
                        <CustomInput name="State" />
                        <CustomInput name="City" />
                    </CustomGridLayout>
                    <CustomGridLayout>
                        <CustomInput name="Zip Code" />
                    </CustomGridLayout>
                </CustomCard>
                <CustomButtonGroup>
                    <PrimaryButton label="Save" className="mx-2" />
                    <LightButton label="Cancel" onClick={() => history.replace('/settings/business')} />
                </CustomButtonGroup>
            </FormPage>
        </>
    );
};

export default ClubsForm;
