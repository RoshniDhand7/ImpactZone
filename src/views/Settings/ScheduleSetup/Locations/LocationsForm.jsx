import React, { useState, useEffect } from 'react';
import { CustomDropDown, CustomInput, CustomInputSwitch } from '../../../../shared/Input/AllInputs';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addLevel, editLevel, getLevel } from '../../../../redux/actions/ScheduleSettings/levelActions';
import { addLocationType, editLocationType, getLocationType } from '../../../../redux/actions/ScheduleSettings/locationTypeActions';
import { yesNoOptions } from '../../../../utils/dropdownConstants';
import { addLocation, editLocation, getLocation } from '../../../../redux/actions/ScheduleSettings/locationsActions';

const LocationsForm = () => {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (id) {
            dispatch(
                getLocation(id, (data) => {
                    setData({
                        name: data.name,
                        locationType: data.locationType,
                        club: data.club,
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
        setData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSave = () => {
        if (id) {
            dispatch(editLocation(id, data, setLoading, history));
        } else {
            dispatch(addLocation(data, setLoading, history));
        }
    };
    return (
        <>
            <FormPage backText="Locations">
                <CustomCard col="12" title="Add Locations">
                    <CustomGridLayout>
                        <CustomInput name="name" data={data} onChange={handleChange} />
                        {/* <CustomDropDown name="allowOverbooking" options={yesNoOptions} data={data} onChange={handleChange} /> */}
                        {/* <CustomInputSwitch name="isActive" data={data} onChange={handleChange} /> */}
                    </CustomGridLayout>
                </CustomCard>
                <CustomButtonGroup>
                    <PrimaryButton label="Save" className="mx-2" onClick={handleSave} loading={loading} />
                    <LightButton label="Cancel" onClick={() => history.replace('/settings/schedule')} />
                </CustomButtonGroup>
            </FormPage>
        </>
    );
};

export default LocationsForm;
