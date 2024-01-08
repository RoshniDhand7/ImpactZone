import React from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomInput, CustomTextArea } from '../../../../shared/Input/AllInputs';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';

const JobTitleForm = ({ history }) => {
    return (
        <>
            <FormPage backText="Job Title" backTo="/settings/business">
                <CustomCard col="12" title="Job Title">
                    <CustomInput name="Job Title" />
                    <CustomTextArea label="Description" name="description" maxLength="266" />
                </CustomCard>
                <CustomButtonGroup>
                    <PrimaryButton label="Save" className="mx-2" />
                    <LightButton label="Cancel" onClick={() => history.replace('/settings/business')} />
                </CustomButtonGroup>
            </FormPage>
        </>
    );
};

export default JobTitleForm;
