import React, { useState, useEffect } from 'react';
import { CustomDropDown, CustomInput, CustomInputSwitch } from '../../../../shared/Input/AllInputs';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addLocation, editLocation, getLocation } from '../../../../redux/actions/ScheduleSettings/locationsActions';
import { getLocationTypes } from '../../../../redux/actions/ScheduleSettings/locationTypeActions';
import { getClubsDetails } from '../../../../redux/actions/BusinessSettings/clubsAction';
import formValidation from '../../../../utils/validations';
import { showFormErrors } from '../../../../utils/commonFunctions';

const LocationsForm = () => {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(getLocationTypes());
        dispatch(getClubsDetails());
    }, []);
    const { allClubs } = useSelector((state) => state.clubs);
    const { allLocationType } = useSelector((state) => state.locationType);

    useEffect(() => {
        if (id) {
            dispatch(
                getLocation(id, (data) => {
                    setData({
                        name: data.name,
                        locationType: data.locationType,
                        club: data.club,
                        isActive:data.isActive
                    });
                }),
            );
        }
    }, [id, dispatch]);
    const [data, setData] = useState({
        name: '',
        locationType: '',
        club: '',
    });
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            if (id) {
                dispatch(editLocation(id, data, setLoading, history));
            } else {
                dispatch(addLocation(data, setLoading, history));
            }
        }
    };
    return (
        <FormPage backText="Locations">
            <CustomCard col="12" title="Add Locations">
                <CustomGridLayout>
                    <CustomInput name="name" data={data} onChange={handleChange} required />
                    <CustomDropDown
                        name="locationType"
                        options={allLocationType?.map((item) => {
                            return { label: item.name, value: item._id };
                        })}
                        data={data}
                        optionLabel="label"
                        onChange={handleChange}
                        required
                    />
                    <CustomDropDown
                        name="club"
                        options={allClubs?.map((item) => {
                            return { label: item.name, value: item._id };
                        })}
                        data={data}
                        optionLabel="label"
                        onChange={handleChange}
                        required
                    />
                    <CustomInputSwitch name="isActive" data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" onClick={handleSave} loading={loading} />
                <LightButton label="Cancel" onClick={() => history.goBack()} />
            </CustomButtonGroup>
        </FormPage>
    );
};

export default LocationsForm;
