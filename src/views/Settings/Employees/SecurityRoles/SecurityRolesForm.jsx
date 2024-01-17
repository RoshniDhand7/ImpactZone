import React, { useState } from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomInput, CustomTextArea } from '../../../../shared/Input/AllInputs';
import Permissions from './Permissions';

const SecurityRolesForm = () => {
    const [selectedPermissions, setSelectedPermissions] = useState({});
    const handlePermissionSelection = (selections) => {
        console.log(selections);
        setSelectedPermissions(selections);
    };

    return (
        <>
            <FormPage backText="Security Roles">
                <CustomCard col="12" title="General">
                    <CustomGridLayout>
                        <CustomInput name="name" required col={3} />
                        <CustomTextArea name="description" />
                    </CustomGridLayout>
                </CustomCard>
                <CustomCard col="12" title="Permissions">
                    <Permissions selected={selectedPermissions} setSelected={handlePermissionSelection} />
                </CustomCard>
            </FormPage>
        </>
    );
};

export default SecurityRolesForm;
