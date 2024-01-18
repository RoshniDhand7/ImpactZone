import React, { useState, useEffect } from 'react';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../../shared/Button/CustomButton';
import { CustomCalenderInput, CustomDropDown, CustomInput, CustomInputMask, CustomTextArea } from '../../../../../shared/Input/AllInputs';
import CustomCard, { CustomGridLayout } from '../../../../../shared/Cards/CustomCard';
import { getAllCountries, getCitiesByState, getStatesByCountry, showFormErrors } from '../../../../../utils/commonFunctions';
import { useDispatch } from 'react-redux';
import { yesNoOptions } from '../../../../../utils/dropdownConstants';
import PhotoUpload from '../../../../../shared/Input/DragDropFiles';
import formValidation from '../../../../../utils/validations';
import { editEmployee } from '../../../../../redux/actions/EmployeeSettings/employeesAction';
import { useHistory, useParams } from 'react-router';

const General = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const [country, setCountry] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const allCountryList = getAllCountries();
        const updatedStates = getStatesByCountry('US');
        setStates(updatedStates);
        setCountry(allCountryList);
    }, [dispatch]);

    const [data, setData] = useState({
        hireDate: '',
        terminationDate: '',
        adpId: '',
        primaryPhone: '',
        workPhone: '',
        workPhoneExt: '',
        mobilePhone: '',
        faxPhone: '',
        emergencyPhone: '',
        emergencyPhoneExt: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        emailNotification: true,
        onlineNickName: '',
        bio: '',
    });
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        if (name === 'state') {
            const city = getCitiesByState('US', value);
            setCities(city);
            setData((prev) => ({ ...prev, [name]: value, city: '', formErrors }));
        } else {
            setData((prev) => ({ ...prev, [name]: value, formErrors }));
        }
    };
    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            if (id) {
                dispatch(editEmployee(id, data, setLoading, history));
            }
        }
    };
    return (
        <>
            <CustomCard col="12" title="Employement">
                <CustomGridLayout>
                    <CustomCalenderInput name="hireDate" onChange={handleChange} data={data} />
                    <CustomInput name="adpId" onChange={handleChange} data={data} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Contact">
                <CustomGridLayout>
                    <CustomInputMask
                        id="primaryPhone"
                        name="primaryPhone"
                        mask="(999) 999-9999"
                        placeholder="(999) 999-9999"
                        onChange={handleChange}
                        data={data}
                    />
                    <CustomInputMask id="workPhone" name="workPhone" mask="(999) 999-9999" placeholder="(999) 999-9999" onChange={handleChange} data={data} />
                    <CustomInputMask
                        id="mobilePhone"
                        name="mobilePhone"
                        mask="(999) 999-9999"
                        placeholder="(999) 999-9999"
                        onChange={handleChange}
                        data={data}
                    />
                    <CustomInputMask id="faxPhone" name="faxPhone" mask="(999) 999-9999" placeholder="(999) 999-9999" onChange={handleChange} data={data} />
                    <CustomInputMask
                        id="emergencyPhone"
                        name="emergencyPhone"
                        mask="(999) 999-9999"
                        placeholder="(999) 999-9999"
                        onChange={handleChange}
                        data={data}
                    />
                    <CustomInput name="street" />
                    <CustomDropDown name="state" options={states} onChange={handleChange} data={data} />
                    <CustomDropDown name="city" options={cities} onChange={handleChange} data={data} />
                    <CustomInput name="zipCode" onChange={handleChange} data={data} />
                    <CustomDropDown name="emailNotification" options={yesNoOptions} onChange={handleChange} data={data} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Online">
                <CustomInput name="onlineNickname" onChange={handleChange} data={data} />
                <CustomTextArea name="bio" onChange={handleChange} data={data} />
            </CustomCard>
            <CustomCard col="12" title="Photo">
                <PhotoUpload />
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" onClick={handleSave} />
                <LightButton label="Cancel" />
            </CustomButtonGroup>
        </>
    );
};

export default General;
