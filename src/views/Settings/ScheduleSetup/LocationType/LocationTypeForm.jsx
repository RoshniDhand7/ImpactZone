import React, { useState, useEffect } from 'react';
import { CustomDropDown, CustomInput, CustomInputSwitch } from '../../../../shared/Input/AllInputs';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { yesNoOptions } from '../../../../utils/dropdownConstants';
import { showFormErrors } from '../../../../utils/commonFunctions';
import formValidation from '../../../../utils/validations';
import { addLocationType, editLocationType, getLocationType } from '../../../../redux/actions/Settings/ScheduleSetup/locationTypeActions';

const LocationTypeForm = () => {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (id) {
            dispatch(
                getLocationType(id, (data) => {
                    setData({
                        name: data.name,
                        allowOverbooking: data.allowOverbooking,
                        isActive: data.isActive,
                    });
                }),
            );
        }
    }, [id, dispatch]);
    const [data, setData] = useState({
        name: '',
        allowOverbooking: false,
        isActive: true,
    });
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            if (id) {
                dispatch(editLocationType(id, data, setLoading, history));
            } else {
                dispatch(addLocationType(data, setLoading, history));
            }
        }
    };
    return (
        <>
            <FormPage backText="Location Type">
                <CustomCard col="12" title="Add Location Type">
                    <CustomGridLayout>
                        <CustomInput name="name" data={data} onChange={handleChange} required />
                        <CustomDropDown name="allowOverbooking" options={yesNoOptions} data={data} onChange={handleChange} />
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

export default LocationTypeForm;
