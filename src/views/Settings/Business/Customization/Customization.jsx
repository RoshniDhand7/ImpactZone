import React, { useState } from 'react';
import CustomCard, { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomLogoImage from '../../../../shared/Image/LogoImage';
import LogoImg from '../../../../assets/images/logo.png';

const Customization = () => {
    return (
        <>
            <CustomFilterCard buttonTitle="Edit Customization" linkTo="/settings/business/customization/edit" />
            <CustomCard col="12" title="Customization">
                <label>Logo</label>
                <img src={LogoImg} alt="logo" style={{ width: '100px' }} />
            </CustomCard>
        </>
    );
};

export default Customization;
