import React, { useState, useEffect } from 'react';
import { CustomDropDown, CustomInput, CustomInputSwitch, CustomMultiselect } from '../../../../shared/Input/AllInputs';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import formValidation from '../../../../utils/validations';
import { showFormErrors } from '../../../../utils/commonFunctions';
import { getResourceTypes } from '../../../../redux/actions/MembersSettings/resourceType';
import { addResource, editResource, getResource } from '../../../../redux/actions/MembersSettings/resources';
import { getLocations } from '../../../../redux/actions/ScheduleSettings/locationsActions';
import { hoursOptions } from '../../../../utils/dropdownConstants';
import { getCatalogItems } from '../../../../redux/actions/InventorySettings/catalogItemsAction';

const ResourcesForm = () => {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        dispatch(getResourceTypes());
        dispatch(getLocations());
        dispatch(getCatalogItems());
    }, [dispatch]);
    const { locationDropdown } = useSelector((state) => state.locations);
    const { resourceTypeDropdown } = useSelector((state) => state.resourceType);
    const { catalogServiceDropdown } = useSelector((state) => state.catalogItems);

    useEffect(() => {
        if (id) {
            dispatch(
                getResource(id, (data) => {
                    setData({
                        name: data.name,
                        resourceType: data.resourceType,
                        location: data.location,
                        availableQuantity: data.availableQuantity,
                        usedInEvents: data.usedInEvents,
                        pastDue: data.pastDue,
                        isActive: data.isActive,
                        services: data.services,
                    });
                }),
            );
        }
    }, [id, dispatch]);
    const [data, setData] = useState({
        name: '',
        resourceType: '',
        location: '',
        availableQuantity: '',
        usedInEvents: '',
        pastDue: '',
        isActive: true,
        services: [],
    });
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const handleSave = () => {
        if (showFormErrors(data, setData, ['services'])) {
            if (id) {
                dispatch(editResource(id, data, setLoading, history));
            } else {
                dispatch(addResource(data, setLoading, history));
            }
        }
    };
    return (
        <FormPage backText="Resources">
            <CustomCard col="12" title="Resource">
                <CustomGridLayout>
                    <CustomInput name="name" data={data} onChange={handleChange} required />
                    <CustomDropDown name="resourceType" options={resourceTypeDropdown} data={data} onChange={handleChange} required />
                    <CustomDropDown name="location" options={locationDropdown} data={data} onChange={handleChange} required />
                    <CustomInput name="availableQuantity" data={data} onChange={handleChange} />
                    <CustomInput name="usedInEvents" data={data} onChange={handleChange} />
                    <CustomDropDown name="pastDue" options={hoursOptions} data={data} onChange={handleChange} required />
                    <CustomMultiselect name="services" options={catalogServiceDropdown} data={data} onChange={handleChange} />
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

export default ResourcesForm;
