import React from 'react';
import FormPage from '../../../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../../../shared/Cards/CustomCard';
import { CustomCalenderInput, CustomInput, CustomTextArea } from '../../../../../../shared/Input/AllInputs';

const CertificationForm = () => {
    return (
        <>
            <FormPage backText="Certifications" backTo="/settings/employee/manage-employee/add">
                <CustomCard col="12" title="Personal">
                    <CustomGridLayout>
                        <CustomInput name="name" col={3} />
                        <CustomInput name="certificationNumber" />
                        <CustomInput name="issuer" required />
                        <CustomCalenderInput name="acquiredDate" />
                        <CustomCalenderInput name="expirationDate" />
                        <CustomTextArea name="description" />
                    </CustomGridLayout>
                </CustomCard>
            </FormPage>
        </>
    );
};

export default CertificationForm;
