import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addRegister, editRegister, getRegister } from '../../../../redux/actions/PosSettings/register';
import formValidation from '../../../../utils/validations';
import { showFormErrors } from '../../../../utils/commonFunctions';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomDropDown, CustomInput } from '../../../../shared/Input/AllInputs';
import CustomPickList from '../../../../shared/Input/CustomPickList';
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

    const { employeesDropdown } = useSelector((state) => state.employees);
    const { clubsDropdown } = useGetClubs();

    useEffect(() => {
        if (id) {
            dispatch(
                getRegister(id, (data) => {
                    setData({
                        name: data.name,
                        employee: data.employee,
                        club: data.club,
                    });
                }),
            );
        }
    }, [id, dispatch]);
    const [data, setData] = useState({
        name: '',
        employee: null,
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
                        <CustomInput name="name" data={data} onChange={handleChange} required />
                        <CustomDropDown name="employee" options={employeesDropdown} data={data} onChange={handleChange} optionLabel="name" />
                    </CustomGridLayout>
                </CustomCard>
                <CustomCard col="12" title="Clubs">
                    <CustomPickList name="club" selected={data?.club} sourceData={clubsDropdown} onPickListChange={handleChange} />
                    {data?.formErrors?.club && <div className="text-sm p-error">{data?.formErrors?.club}</div>}
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
