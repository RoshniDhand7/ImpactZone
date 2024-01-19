import React, { useState, useEffect } from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomInput, CustomTextArea } from '../../../../shared/Input/AllInputs';
import Permissions from './Permissions';
import { useDispatch } from 'react-redux';
import { addSecurityRole, editSecurityRole, getPermissions, getSecurityRole } from '../../../../redux/actions/EmployeeSettings/securityRolesAction';
import { useHistory, useParams } from 'react-router-dom';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { showToast } from '../../../../redux/actions/toastAction';
import { showFormErrors } from '../../../../utils/commonFunctions';
import formValidation from '../../../../utils/validations';

const SecurityRolesForm = () => {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(
                getSecurityRole(id, (data) => {
                    setSelectedPermissions(data.rawPermissions);
                    setData({
                        name: data.name,
                        description: data.description,
                    });
                }),
            );
        }
    }, [id, dispatch]);

    useEffect(() => {
        dispatch(getPermissions());
    }, [dispatch]);

    const [data, setData] = useState({
        name: '',
        description: '',
    });

    const [loading, setLoading] = useState(false);
    const [selectedPermissions, setSelectedPermissions] = useState({});
    const handlePermissionSelection = (selections) => {
        setSelectedPermissions(selections);
    };

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            if (Object.keys(selectedPermissions).length) {
                if (id) {
                    dispatch(editSecurityRole(id, data, selectedPermissions, setLoading, history));
                } else {
                    dispatch(addSecurityRole(data, selectedPermissions, setLoading, history));
                }
            } else {
                dispatch(
                    showToast({
                        severity: 'error',
                        summary: 'Permission Matrix',
                        detail: 'Select atleast one permission',
                    }),
                );
            }
        } else {
            dispatch(
                showToast({
                    severity: 'error',
                    summary: 'Personal Information',
                    detail: 'Missing information',
                }),
            );
        }
    };

    return (
        <>
            <FormPage backText="Security Roles">
                <CustomCard col="12" title="General">
                    <CustomGridLayout>
                        <CustomInput data={data} name="name" onChange={handleChange} required col={3} />
                        <CustomTextArea data={data} onChange={handleChange} name="description" />
                    </CustomGridLayout>
                </CustomCard>

                <Permissions selected={selectedPermissions} setSelected={handlePermissionSelection} />

                <CustomButtonGroup>
                    <PrimaryButton label="Save" className="mx-2" loading={loading} onClick={handleSave} />
                    <LightButton label="Cancel" onClick={() => history.goBack()} />
                </CustomButtonGroup>
            </FormPage>
        </>
    );
};

export default SecurityRolesForm;
