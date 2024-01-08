import React, { useState } from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard from '../../../../shared/Cards/CustomCard';
import CustomLogoImage from '../../../../shared/Image/LogoImage';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';

const CustomizationForm = ({ history }) => {
    const [data, setData] = useState({
        logo: [],
    });
    return (
        <>
            <FormPage backText="Customization" backTo="/settings/business">
                <CustomCard col="12" title="Customization">
                    <CustomLogoImage name="logo" data={data} removeable />
                </CustomCard>
                <CustomButtonGroup>
                    <PrimaryButton label="Save" className="mx-2" />
                    <LightButton label="Cancel" onClick={() => history.replace('/settings/business')} />
                </CustomButtonGroup>
            </FormPage>
        </>
    );
};

export default CustomizationForm;
