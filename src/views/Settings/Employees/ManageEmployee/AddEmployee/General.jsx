import React, { useState, useEffect } from 'react';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../../shared/Button/CustomButton';
import { CustomCalenderInput, CustomDropDown, CustomInput, CustomInputMask, CustomTextArea } from '../../../../../shared/Input/AllInputs';
import CustomCard, { CustomGridLayout } from '../../../../../shared/Cards/CustomCard';
import { getAllCountries, getStatesByCountry } from '../../../../../utils/commonFunctions';
import { useDispatch } from 'react-redux';
import { yesNoOptions } from '../../../../../utils/dropdownConstants';
import PhotoUpload from '../../../../../shared/Input/DragDropFiles';

const General = () => {
    const dispatch = useDispatch();
    const [country, setCountry] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        const allCountryList = getAllCountries();
        const updatedStates = getStatesByCountry('US');
        setStates(updatedStates);
        setCountry(allCountryList);
    }, [dispatch]);
    return (
        <>
            <CustomCard col="12" title="Employement">
                <CustomGridLayout>
                    <CustomCalenderInput name="hireDate" />
                    <CustomInput name="appId" />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Contact">
                <CustomGridLayout>
                    <CustomInputMask id="primaryPhone" name="primaryPhone" mask="(999) 999-9999" placeholder="(999) 999-9999" />
                    <CustomInputMask id="workPhone" name="workPhone" mask="(999) 999-9999" placeholder="(999) 999-9999" />
                    <CustomInputMask id="mobilePhone" name="mobilePhone" mask="(999) 999-9999" placeholder="(999) 999-9999" />
                    <CustomInputMask id="faxPhone" name="faxPhone" mask="(999) 999-9999" placeholder="(999) 999-9999" />
                    <CustomInputMask id="emergencyPhone" name="emergencyPhone" mask="(999) 999-9999" placeholder="(999) 999-9999" />
                    <CustomInput name="streetAddress" />
                    <CustomDropDown name="state" options={states} />
                    <CustomDropDown name="city" options={cities} />
                    <CustomInput name="zipCode" />
                    <CustomDropDown name="emailUpdates" options={yesNoOptions} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Online">
                <CustomInput name="onlineNickname" />
                <CustomTextArea name="bio" />
            </CustomCard>
            <CustomCard col="12" title="Photo">
                <PhotoUpload />
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" />
                <LightButton label="Cancel" />
            </CustomButtonGroup>
        </>
    );
};

export default General;
