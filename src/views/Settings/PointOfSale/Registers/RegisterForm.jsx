import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addRegister, editRegister, getRegister } from '../../../../redux/actions/PosSettings/register';
import formValidation from '../../../../utils/validations';
import { showFormErrors } from '../../../../utils/commonFunctions';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomDropDown, CustomInput } from '../../../../shared/Input/AllInputs';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import useGetClubs from '../../../../hooks/useGetClubs';
import { getEmployees } from '../../../../redux/actions/EmployeeSettings/employeesAction';

const RegisterForm = () => {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        dispatch(getEmployees());
    }, [dispatch]);

    const { clubsDropdown } = useGetClubs();

    useEffect(() => {
        if (id) {
            dispatch(
                getRegister(id, (data) => {
                    setData({
                        registerId: data.registerId,
                        club: data.club,
                    });
                }),
            );
        }
    }, [id, dispatch]);
    const [data, setData] = useState({
        registerId: '',
        club: null,
    });
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            if (id) {
                dispatch(editRegister(id, data, setLoading, history));
            } else {
                dispatch(addRegister(data, setLoading, history));
            }
        }
    };

    return (
        <>
            <FormPage backText="Register">
                <CustomCard col="12" title="General">
                    <CustomGridLayout>
                        <CustomInput name="registerId" data={data} onChange={handleChange} required />
                        <CustomDropDown name="club" options={clubsDropdown} data={data} onChange={handleChange} optionLabel="name" />
                    </CustomGridLayout>
                </CustomCard>

                <CustomButtonGroup>
                    <PrimaryButton label="Save" className="mx-2" onClick={handleSave} loading={loading} />
                    <LightButton label="Cancel" onClick={() => history.goBack()} />
                </CustomButtonGroup>
            </FormPage>
        </>
    );
};

export default RegisterForm;