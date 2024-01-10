import React, { useState, useEffect } from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomDropDown, CustomInput, CustomInputMask } from '../../../../shared/Input/AllInputs';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllCountries, getCitiesByState, getStatesByCountry, mobileFormatted } from '../../../../utils/commonFunctions';
import { editClub, getClub } from '../../../../redux/actions/BusinessSettings/clubsAction';

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
    }, [id]);

    const [data, setData] = useState({
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
        console.log('states>>', allCountryList);
        setStates(updatedStates);
        setCountry(allCountryList);
    }, [dispatch]);

    const handleChange = ({ name, value }) => {
        if (name === 'state') {
            const city = getCitiesByState('US', value);
            console.log('city>>', city);
            setCities(city);
            setData((prev) => ({ ...prev, [name]: value, city: '' }));
        } else {
            setData((prev) => ({ ...prev, [name]: value }));
        }
    };
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        if (id) {
            dispatch(editClub(id, data, setLoading, history));
        }
    };
    console.log('data>>', data);
    return (
        <>
            <FormPage backText="Clubs" backTo="/settings/business">
                <CustomCard col="12" title="Edit Club (Gym Floor)">
                    <CustomGridLayout>
                        <CustomInputMask name="phoneNumber" mask="(999) 999-9999" data={data} onChange={handleChange} />
                        <CustomInput name="email" data={data} onChange={handleChange} />
                        <CustomInput name="address" data={data} onChange={handleChange} />
                    </CustomGridLayout>
                    <CustomGridLayout>
                        <CustomDropDown name="country" options={country} data={data} disabled={true} />
                        <CustomDropDown name="state" options={states} data={data} onChange={handleChange} />
                        <CustomDropDown name="city" options={cities} data={data} onChange={handleChange} />
                    </CustomGridLayout>
                    <CustomGridLayout>
                        <CustomInput name="zipCode" data={data} onChange={handleChange} />
                    </CustomGridLayout>
                </CustomCard>
                <CustomButtonGroup>
                    <PrimaryButton label="Save" className="mx-2" onClick={handleSave} />
                    <LightButton label="Cancel" onClick={() => history.replace('/settings/business')} />
                </CustomButtonGroup>
            </FormPage>
        </>
    );
};

export default ClubsForm;
