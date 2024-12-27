import { useEffect, useState } from 'react';
import CustomCard, { CustomGridLayout } from '../../../shared/Cards/CustomCard';
import { CustomCalenderInput, CustomDropDown, CustomInput, CustomInputMask, CustomInputNumber } from '../../../shared/Input/AllInputs';
import formValidation from '../../../utils/validations';
import { getCitiesByState, getStatesByCountry, showFormErrors } from '../../../utils/commonFunctions';
import { useDispatch } from 'react-redux';
import { genderOptions } from '../../../utils/dropdownConstants';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../shared/Button/CustomButton';
import { useHistory } from 'react-router-dom';
import usePlacesAutocomplete from '../../Members/usePlacesAutoComplete';
import CustomImageInput from '../../../shared/Input/CustomImageInput';

const PersonalTab = ({ onTabEnable, onCancel, memberInfo, setMemberInfo }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        onTabEnable(1);
    }, []);

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        const _states = getStatesByCountry('US');
        setStates(_states);
    }, [dispatch]);

    useEffect(() => {
        if (memberInfo?.state) {
            const _cities = getCitiesByState('US', memberInfo?.state);
            setCities(_cities);
        }
    }, [memberInfo?.state]);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, memberInfo);
        if (name === 'state') {
            setMemberInfo((prev) => ({ ...prev, [name]: value, city: '', formErrors }));
        }
        setMemberInfo((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const handleNext = () => {
        if (showFormErrors(memberInfo, setMemberInfo)) {
            history.replace({
                search: `?tab=agreement&member=${memberInfo._id}`,
            });
        }
    };
    const { renderAutocomplete } = usePlacesAutocomplete(memberInfo, setMemberInfo);

    return (
        <>
            <CustomCard col="12" title="Personal">
                <CustomGridLayout>
                    <div className="col-2">
                        <CustomImageInput name="image" data={memberInfo} onFilesChange={handleChange} required editable={true} />
                    </div>
                    <div className="col-10 grid">
                        <CustomInput name="accessCode" required data={memberInfo} onChange={handleChange} col={6} />
                        <CustomInputNumber name="barCode" required data={memberInfo} onChange={handleChange} col={6} />
                        <CustomInput name="firstName" required data={memberInfo} onChange={handleChange} col={6} disabled />
                        <CustomInput name="lastName" required data={memberInfo} onChange={handleChange} col={6} />
                    </div>

                    <div className="md:col-12">
                        <label className="text-sm font-semibold">Address</label>
                        <span className="text-red-500">*</span>
                        {renderAutocomplete()}
                    </div>
                    <CustomDropDown name="state" options={states} required onChange={handleChange} data={memberInfo} />
                    <CustomDropDown name="city" options={cities} required onChange={handleChange} data={memberInfo} />
                    <CustomInput name="zipCode" label="Postal Code" required onChange={handleChange} data={memberInfo} disabled={!memberInfo.state} />
                    <CustomCalenderInput label="Date Of Birth" name="dob" data={memberInfo} onChange={handleChange} />
                    <CustomDropDown name="gender" options={genderOptions} data={memberInfo} onChange={handleChange} />
                    <CustomInput name="email" required data={memberInfo} onChange={handleChange} />
                    <CustomInputMask
                        id="primaryPhone"
                        required
                        name="primaryPhone"
                        mask="(999) 999-9999"
                        placeholder=""
                        onChange={handleChange}
                        data={memberInfo}
                    />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Emergency Contact">
                <CustomGridLayout>
                    <CustomInput label="First Name" name="emergencyFirstName" data={memberInfo} onChange={handleChange} />
                    <CustomInput label="Last Name" name="emergencyLastName" data={memberInfo} onChange={handleChange} />
                    <CustomInputMask
                        label="Emergency Phone"
                        id="emergencyContact"
                        name="emergencyContact"
                        mask="(999) 999-9999"
                        placeholder=""
                        onChange={handleChange}
                        data={memberInfo}
                    />
                </CustomGridLayout>
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Next" className="mx-2" onClick={() => handleNext('')} />
                {/* <PrimaryButton label="Save & Hold" className="mx-2" onClick={() => handleNext('?tab=personal')} /> */}
                <LightButton label="Cancel" onClick={onCancel} />
            </CustomButtonGroup>
        </>
    );
};

export default PersonalTab;
