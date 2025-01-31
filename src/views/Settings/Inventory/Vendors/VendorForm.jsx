import React, { useState, useEffect } from 'react';
import { CustomDropDown, CustomInput, CustomInputMask, CustomInputSwitch, CustomTextArea } from '../../../../shared/Input/AllInputs';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import formValidation from '../../../../utils/validations';
import { getCitiesByState, getStatesByCountry, showFormErrors } from '../../../../utils/commonFunctions';
import { addVendors, editVendors, getVendor } from '../../../../redux/actions/Settings/InventorySetup/vendorsAction';

const VendorForm = () => {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const updatedStates = getStatesByCountry('US');
        setStates(updatedStates);
    }, [dispatch]);
    useEffect(() => {
        if (id) {
            dispatch(
                getVendor(id, (data) => {
                    setData({
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        address1: data.address1,
                        address2: data.address2,
                        city: data.city,
                        state: data.state,
                        zipCode: data.zipCode,
                        alternateVendors: data.alternateVendors,
                        isActive: data.isActive,
                        paymentTerms: data.paymentTerms,
                        deliveryTerms: data.deliveryTerms,
                        repName: data.repName,
                        repCellPhone: data.repCellPhone,
                        notes: data.notes,
                        alternateEmail: data.alternateEmail,
                    });
                    const cities = getCitiesByState('US', data.state);
                    setCities(cities);
                }),
            );
        }
    }, [id, dispatch]);
    const { vendorsDropdown } = useSelector((state) => state.vendors);

    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipCode: '',
        alternateVendors: '',
        isActive: true,
        paymentTerms: '',
        deliveryTerms: '',
        repName: '',
        repCellPhone: '',
        notes: '',
        alternateEmail: '',
    });
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation('name', value, data);

        if (name === 'state') {
            const city = getCitiesByState('US', value);
            setCities(city);
            setData((prev) => ({ ...prev, [name]: value, city: '' }));
        } else if (name === 'name') {
            setData((prev) => ({ ...prev, [name]: value, formErrors }));
        } else {
            setData((prev) => ({ ...prev, [name]: value, formErrors: {} }));
        }
    };

    const handleSave = () => {
        if (showFormErrors(data, setData, ['zipCode', 'address1', 'address2', 'state', 'city', 'phone', 'email', 'notes'])) {
            if (id) {
                dispatch(editVendors(id, data, setLoading, history));
            } else {
                dispatch(addVendors(data, setLoading, history));
            }
        }
    };

    return (
        <FormPage backText="Vendor">
            <CustomCard col="12" title="Add Vendor">
                <CustomGridLayout>
                    <CustomInputSwitch name="isActive" data={data} onChange={handleChange} col="12" />
                    <CustomInput name="name" data={data} onChange={handleChange} required />
                    <CustomInput name="address1" data={data} onChange={handleChange} />
                    <CustomInput name="address2" data={data} onChange={handleChange} />
                    <CustomDropDown name="state" options={states} data={data} onChange={handleChange} />
                    <CustomDropDown name="city" options={cities} data={data} onChange={handleChange} />
                    <CustomInput name="zipCode" data={data} onChange={handleChange} disabled={!data.state} />
                    <CustomInputMask name="phone" id="phone" mask="(999) 999-9999" data={data} placeholder="" onChange={handleChange} />
                    <CustomInput data={data} name="email" onChange={handleChange} />
                    <CustomInput data={data} name="alternateEmail" onChange={handleChange} />
                    <CustomDropDown name="alternateVendors" options={vendorsDropdown} data={data} onChange={handleChange} />
                    <CustomInput data={data} name="paymentTerms" onChange={handleChange} />
                    <CustomInput data={data} name="deliveryTerms" onChange={handleChange} />
                    <CustomInput data={data} name="repName" onChange={handleChange} />
                    <CustomInputMask name="repCellPhone" id="repCellPhone" mask="(999) 999-9999" data={data} placeholder="" onChange={handleChange} />
                    <CustomTextArea name="notes" data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" onClick={handleSave} loading={loading} />
                <LightButton label="Cancel" onClick={() => history.goBack()} />
            </CustomButtonGroup>
        </FormPage>
    );
};

export default VendorForm;
