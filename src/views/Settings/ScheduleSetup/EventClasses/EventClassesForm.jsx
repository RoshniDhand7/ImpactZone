import React, { useEffect, useState } from 'react';
import { CustomCalenderInput, CustomDropDown, CustomInput } from '../../../../shared/Input/AllInputs';
import { classMeet } from '../../../../utils/dropdownConstants';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import formValidation from '../../../../utils/validations';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { getLocations } from '../../../../redux/actions/ScheduleSettings/locationsActions';
import { getEvents } from '../../../../redux/actions/ScheduleSettings/eventsActions';

const EventClassesForm = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        name: '',
        isActive: true,
        classMeet: '',
    });
    useEffect(() => {
        dispatch(getLocations());
        dispatch(getEvents());
    }, []);
    const { locationDropdown } = useSelector((state) => state.locations);
    const { allEventClassesDropDown } = useSelector((state) => state.event);
    const history = useHistory();
    const loading = useSelector((state) => state?.loader?.isLoading);
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const handleSave = () => {};

    return (
        <>
            <FormPage backText="Classes">
                <CustomGridLayout>
                    <CustomDropDown name="name" options={allEventClassesDropDown} onChange={handleChange} data={data} />
                </CustomGridLayout>

                <CustomCard title="When and Where" col="12">
                    <CustomGridLayout>
                        <CustomDropDown name="classMeet" options={classMeet} onChange={handleChange} data={data} />
                        <CustomDropDown name="location" options={locationDropdown} onChange={handleChange} data={data} />
                        <CustomCalenderInput name="startDate" onChange={handleChange} data={data} />
                        <CustomCalenderInput name="endDate" onChange={handleChange} data={data} />
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

export default EventClassesForm;
