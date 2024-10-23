import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import formValidation from '../../../../utils/validations';
import { showFormErrors, timeConvertToDate } from '../../../../utils/commonFunctions';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomDropDown, CustomInput, CustomInputSwitch, CustomTimeInput } from '../../../../shared/Input/AllInputs';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import useGetClubs from '../../../../hooks/useGetClubs';

import { addRegisterAction, editRegisterAction, getRegisterAction } from '../../../../redux/actions/Settings/POS/registerActions';

const RegisterForm = () => {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { clubsDropdown } = useGetClubs();

    useEffect(() => {
        if (id) {
            dispatch(
                getRegisterAction(id, (data) => {
                    setData({
                        club: data.club,
                        name: data.name,
                        autoCloseable: data.autoCloseable,
                        autoCloseableTime: data.autoCloseableTime ? timeConvertToDate(data.autoCloseableTime) : '',
                        isActive: data.isActive,
                    });
                }),
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, dispatch]);

    const [data, setData] = useState({
        club: '',
        name: '',
        autoCloseable: true,
        autoCloseableTime: '',
        isActive: true,
    });

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            if (id) {
                dispatch(editRegisterAction(id, data, setLoading, history));
            } else {
                dispatch(addRegisterAction(data, setLoading, history));
            }
        }
    };

    return (
        <>
            <FormPage backText="Register">
                <CustomCard col="12" title="Register">
                    <CustomGridLayout>
                        <CustomInput name="name" data={data} onChange={handleChange} required />
                        <CustomDropDown name="club" options={clubsDropdown} data={data} onChange={handleChange} />
                        {data?.autoCloseable && (
                            <CustomTimeInput
                                name="autoCloseableTime"
                                onChange={handleChange}
                                data={data}
                                timeOnly
                                placeholder="Select Time"
                                stepMinute={15}
                                col={3}
                            />
                        )}
                        <CustomInputSwitch col={1} name="autoCloseable" data={data} onChange={handleChange} />{' '}
                        <CustomInputSwitch name="isActive" data={data} onChange={handleChange} />
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
