import { useEffect, useState } from 'react';
import CustomCard, { CustomGridLayout } from '../../shared/Cards/CustomCard';
import { CustomCalenderInput, CustomDropDown, CustomInput, CustomInputMask } from '../../shared/Input/AllInputs';
import formValidation from '../../utils/validations';
import { getAllCountries, getCitiesByState, getStatesByCountry, showFormErrors } from '../../utils/commonFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { genderOptions } from '../../utils/dropdownConstants';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../shared/Button/CustomButton';
import { editSellPlan, getSellPlanMember } from '../../redux/actions/Plans/SellPlan';
import moment from 'moment';
import { useHistory, useParams } from 'react-router-dom';
import usePlacesAutocomplete from '../Members/usePlacesAutoComplete';

const PersonalTab = ({ onTabEnable }) => {
    const { newPlanId, memberId } = useParams();

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const [data, setData] = useState({
        dob: '',
        firstName: '',
        lastName: '',
        address: '',
        gender: '',
        email: '',
        primaryPhone: '',
        city: '',
        state: '',
        zipCode: '',
        emergencyFirstName: '',
        emergencyLastName: '',
        emergencyContact: '',
        longitude: '',
        latitude: '',
    });
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        getAllCountries();
        const updatedStates = getStatesByCountry('US');
        setStates(updatedStates);
    }, [dispatch]);

    const handleChange = ({ name, value }) => {
        if (name === 'state') {
            const city = getCitiesByState('US', value);
            setCities(city);

            // Clear city and zip code
            const clearedData = {
                ...data,
                city: '',
                zipCode: '',
            };

            // Set form errors
            const formErrors = {
                ...formValidation('state', value, clearedData),
                ...formValidation('city', '', clearedData),
                ...formValidation('zipCode', '', clearedData),
            };

            setData((prev) => ({
                ...prev,
                city: '',
                zipCode: '',
                state: value,
                formErrors,
            }));
        } else {
            const formErrors = formValidation(name, value, data);
            setData((prev) => ({ ...prev, [name]: value, formErrors }));
        }
    };

    useEffect(() => {
        const formErrors = formValidation('city', data.city, data);
        setData((prev) => ({ ...prev, ['city']: data.city, formErrors }));
    }, [data.city]);

    const { getMember } = useSelector((state) => state.members);

    useEffect(() => {
        if (memberId) {
            getMemberPersonalFn();
        }
    }, [dispatch, memberId, getMember]);

    const getMemberPersonalFn = () => {
        if (getMember) {
            dispatch(
                getSellPlanMember(memberId, (data) => {
                    setData({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        dob: data.dob ? new Date(data.dob) : '',
                        address: data.address ? data.address : '',
                        latitude: data.latitude ? data.latitude : '',
                        longitude: data?.longitude ? data.longitude : '',
                        gender: data.gender ? data.gender : '',
                        email: data.email ? data.email : '',
                        primaryPhone: data.primaryPhone ? data.primaryPhone : '',
                        city: data.city ? data.city : '',
                        state: data.state ? data.state : '',
                        zipCode: data.zipCode ? data.zipCode : '',
                        emergencyFirstName: data.emergencyFirstName,
                        emergencyLastName: data.emergencyLastName,
                        emergencyContact: data.emergencyContact,
                    });
                    const cities = getCitiesByState('US', data.state);
                    setCities(cities);
                }),
            );
        }
    };

    const handleNext = () => {
        if (showFormErrors(data, setData)) {
            const payload = {
                ...data,
                type: 'next',
                ...(data?.dob && { dob: moment(data.dob).format('MM/DD/YYYY') }),
                ...(data?.primaryPhone && { primaryPhone: data?.primaryPhone?.replace(/\D/g, '') }),
                ...(data?.emergencyContact && { emergencyContact: data?.emergencyContact?.replace(/\D/g, '') }),
            };
            dispatch(
                editSellPlan(memberId, payload, () => {
                    getMemberPersonalFn();
                    onTabEnable(0, 1, 2);
                    history.replace(`/plans/sell-plan/${id}/${newPlanId}/${memberId}${'?tab=identification'}`);
                }),
            );
        }
    };
    const { renderAutocomplete } = usePlacesAutocomplete(data, setData);

    return (
        <>
            <CustomCard col="12" title="Personal">
                <CustomGridLayout>
                    <CustomInput name="firstName" required data={data} onChange={handleChange} disabled />
                    <CustomInput name="lastName" required data={data} onChange={handleChange} />
                    <div className="md:col-12">
                        <label className="text-sm font-semibold">Address</label>
                        <span className="text-red-500">*</span>
                        {renderAutocomplete()}
                    </div>
                    <CustomDropDown name="state" options={states} required onChange={handleChange} data={data} />
                    <CustomDropDown name="city" options={cities} required onChange={handleChange} data={data} />
                    <CustomInput name="zipCode" label="Postal Code" required onChange={handleChange} data={data} disabled={!data.state} />
                    <CustomCalenderInput label="Date Of Birth" name="dob" data={data} onChange={handleChange} />
                    <CustomDropDown name="gender" options={genderOptions} data={data} onChange={handleChange} />
                    <CustomInput name="email" required data={data} onChange={handleChange} />
                    <CustomInputMask id="primaryPhone" required name="primaryPhone" mask="(999) 999-9999" placeholder="" onChange={handleChange} data={data} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Emergency Contact">
                <CustomGridLayout>
                    <CustomInput label="First Name" name="emergencyFirstName" data={data} onChange={handleChange} />
                    <CustomInput label="Last Name" name="emergencyLastName" data={data} onChange={handleChange} />
                    <CustomInputMask
                        label="Emergency Phone"
                        id="emergencyContact"
                        name="emergencyContact"
                        mask="(999) 999-9999"
                        placeholder=""
                        onChange={handleChange}
                        data={data}
                    />
                </CustomGridLayout>
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Next" className="mx-2" onClick={handleNext} />
                <PrimaryButton label="Save & Hold" className="mx-2" />
                <PrimaryButton label="Sign Agreement" className="mx-2" />
                <LightButton label="Cancel" />
            </CustomButtonGroup>
        </>
    );
};

export default PersonalTab;
