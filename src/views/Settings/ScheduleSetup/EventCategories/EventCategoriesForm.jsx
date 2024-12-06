import React, { useEffect, useState } from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import { CustomInput, CustomInputSwitch } from '../../../../shared/Input/AllInputs';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import formValidation from '../../../../utils/validations';
import CustomPickList from '../../../../shared/Input/CustomPickList';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { showFormErrors } from '../../../../utils/commonFunctions';
import { getEvents } from '../../../../redux/actions/Settings/ScheduleSetup/eventsActions';
import { addEventCategory, editEventCategory, getEventCategory } from '../../../../redux/actions/Settings/ScheduleSetup/eventCategoryAction';

const EventCategoriesForm = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);
    const [data, setData] = useState({
        name: '',
        isActive: true,
        event: [],
    });
    useEffect(() => {
        if (id) {
            dispatch(
                getEventCategory(id, (data) => {
                    setData({
                        name: data.name,
                        isActive: data.isActive,
                        event: data.event,
                    });
                }),
            );
        }
    }, [id, dispatch]);
    const history = useHistory();
    const loading = useSelector((state) => state?.loader?.isLoading);
    const { eventsDropDown } = useSelector((state) => state?.settings.schedule);
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            if (id) {
                dispatch(editEventCategory(id, data, history));
            } else {
                dispatch(addEventCategory(data, history));
            }
        }
    };

    return (
        <>
            <FormPage backText="Event Categories">
                <CustomGridLayout>
                    <CustomInput name="name" data={data} onChange={handleChange} required />
                    <CustomInputSwitch name="isActive" data={data} onChange={handleChange} extraClassName="text-right" />
                </CustomGridLayout>
                <CustomCard title="Add Event Setups" col="12">
                    <CustomPickList name="event" selected={data?.event} sourceData={eventsDropDown} onPickListChange={handleChange} showTargetControls={true} />
                </CustomCard>
                <CustomButtonGroup>
                    <PrimaryButton label="Save" className="mx-2" onClick={handleSave} loading={loading} />
                    <LightButton label="Cancel" onClick={() => history.goBack()} />
                </CustomButtonGroup>
            </FormPage>
        </>
    );
};

export default EventCategoriesForm;
