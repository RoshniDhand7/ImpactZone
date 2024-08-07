import React, { useState, useEffect } from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomDropDown, CustomInput, CustomInputMask } from '../../../../shared/Input/AllInputs';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllCountries, getCitiesByState, getStatesByCountry, mobileFormatted, showFormErrors } from '../../../../utils/commonFunctions';
import { editClub, getClub } from '../../../../redux/actions/BusinessSettings/clubsAction';
import formValidation from '../../../../utils/validations';

const ClubsForm = () => {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        if (id) {
            dispatch(
                getClub(id, (data) => {
                    const formattedPhoneNumber = mobileFormatted(data.phoneNumber);

                    setData({
                        ...data,
                        phoneNumber: formattedPhoneNumber,
                    });

                    if (data.country === 'US') {
                        const cities = getCitiesByState(data.country, data.state);
                        setCities(cities);
                    }
                }),
            );
        }
    }, [id, dispatch]);

    const [data, setData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        country: 'US',
        state: '',
        city: '',
        zipCode: '',
    });

    const [country, setCountry] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        const allCountryList = getAllCountries();
        const updatedStates = getStatesByCountry('US');
        setStates(updatedStates);
        setCountry(allCountryList);
    }, [dispatch]);

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
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        if (id) {
            if (showFormErrors(data, setData)) {
                dispatch(editClub(id, data, setLoading, history));
            }
        }
    };
    return (
        <>
            <FormPage backText="Clubs">
                <CustomCard col="12" title="Edit Club (Gym Floor)">
                    <CustomGridLayout>
                        <CustomInput name="name" data={data} onChange={handleChange} required />
                        <CustomInputMask id="phone" name="phoneNumber" mask="(999) 999-9999" data={data} placeholder="" onChange={handleChange} required />
                        <CustomInput name="email" data={data} onChange={handleChange} required />
                        <CustomInput name="address" data={data} onChange={handleChange} required />
                    </CustomGridLayout>
                    <CustomGridLayout>
                        <CustomDropDown name="country" options={country} data={data} disabled={true} required />
                        <CustomDropDown name="state" options={states} data={data} onChange={handleChange} required />
                        <CustomDropDown name="city" options={cities} data={data} onChange={handleChange} required />
                    </CustomGridLayout>
                    <CustomGridLayout>
                        <CustomInput name="zipCode" data={data} onChange={handleChange} required disabled={!data.state} />
                    </CustomGridLayout>
                </CustomCard>
                <CustomButtonGroup>
                    <PrimaryButton label="Save" className="mx-2" onClick={handleSave} loading={loading} />
                    <LightButton label="Cancel" onClick={() => history.replace('/settings/business')} />
                </CustomButtonGroup>
            </FormPage>
        </>
    );
};

export default ClubsForm;
