import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addRegister, editRegister, getRegister } from '../../../../redux/actions/PosSettings/register';
import formValidation from '../../../../utils/validations';
import { showFormErrors, timeConvertToDate, timeString } from '../../../../utils/commonFunctions';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomCalenderInput, CustomDropDown, CustomInput, CustomInputNumber, CustomInputSwitch } from '../../../../shared/Input/AllInputs';
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
                        autoCloseable: data?.autoCloseable,
                        autoCloseableTime: data?.autoCloseableTime ? timeConvertToDate(data.autoCloseableTime) : date,
                        amountLeftInDrawer: data?.amountLeftInDrawer,
                    });
                }),
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, dispatch]);
    const date = new Date();
    date.setHours(12, 0, 0);
    const [data, setData] = useState({
        registerId: '',
        club: null,
        autoCloseable: false,
        autoCloseableTime: date,
        amountLeftInDrawer: 0,
    });
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);

        if (name === 'autoCloseableTime') {
            let currentMin = value.getMinutes();
            let startTime = value;
            if (currentMin % 15 !== 0) {
                startTime = new Date(value.getTime() + (15 - (currentMin % 15)) * 60000);
            }
            setData((prev) => ({ ...prev, [name]: startTime, formErrors }));
        } else {
            setData((prev) => ({ ...prev, [name]: value, formErrors }));
        }
    };
    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            if (id) {
                dispatch(editRegister(id, { ...data, autoCloseableTime: timeString(data?.autoCloseableTime) }, setLoading, history));
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
                {id && (
                    <CustomCard col="12" title="Setting">
                        <CustomGridLayout>
                            <CustomInputSwitch name="autoCloseable" data={data} onChange={handleChange} />
                            {data?.autoCloseable && (
                                <CustomCalenderInput
                                    name="autoCloseableTime"
                                    onChange={handleChange}
                                    data={data}
                                    timeOnly
                                    placeholder="Select Time"
                                    hourFormat="12"
                                    col={6}
                                    stepMinute={15}
                                />
                            )}
                            <CustomInputNumber name="amountLeftInDrawer" data={data} col="6" onChange={handleChange} />
                        </CustomGridLayout>
                    </CustomCard>
                )}

                <CustomButtonGroup>
                    <PrimaryButton label="Save" className="mx-2" onClick={handleSave} loading={loading} />
                    <LightButton label="Cancel" onClick={() => history.goBack()} />
                </CustomButtonGroup>
            </FormPage>
        </>
    );
};

export default RegisterForm;
