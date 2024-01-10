import React, { useState, useEffect } from 'react';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomDropDown, CustomInput } from '../../../../shared/Input/AllInputs';
import { useHistory } from 'react-router-dom';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { daysOptions, hoursOptions, yesNoOptions } from '../../../../utils/dropdownConstants';
import { editCompany } from '../../../../redux/actions/BusinessSettings/companyActions';
import { useDispatch } from 'react-redux';

const Online = (allCompany) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (allCompany) {
            setData({
                bookOutFrom: allCompany?.bookOutFrom,
                bookOutTo: allCompany?.bookOutTo,
                allowCancelOnline: allCompany?.allowCancelOnline,
                timeBeforeEvent: allCompany?.timeBeforeEvent,
            });
        }
    }, [allCompany]);
    const [data, setData] = useState({
        bookOutFrom: '',
        bookOutTo: '',
        allowCancelOnline: false,
        timeBeforeEvent: '',
    });
    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSave = () => {
        dispatch(editCompany(data, setLoading, history));
    };
    // console.log('data>>', data);
    const history = useHistory();
    return (
        <>
            <CustomCard col="12" title="Booking">
                <CustomGridLayout>
                    <CustomDropDown name="bookOutFrom" options={daysOptions} data={data} onChange={handleChange} />
                    <CustomDropDown name="bookOutTo" options={daysOptions} data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Cancellation">
                <CustomGridLayout>
                    <CustomDropDown name="allowCancelOnline" options={yesNoOptions} data={data} onChange={handleChange} />
                    <CustomDropDown name="timeBeforeEvent" options={hoursOptions} data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" onClick={handleSave} />
                <LightButton label="Cancel" onClick={() => history.replace('/settings/business')} />
            </CustomButtonGroup>
        </>
    );
};

export default Online;
