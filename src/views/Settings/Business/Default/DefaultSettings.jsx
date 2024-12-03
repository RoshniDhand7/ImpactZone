import React, { useEffect, useState } from 'react';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomDropDown } from '../../../../shared/Input/AllInputs';
import useAgreementPlan from '../../../../hooks/Agreement/useAgreementPlan';
import PrimaryButton, { CustomButtonGroup } from '../../../../shared/Button/CustomButton';
import { useDispatch } from 'react-redux';
import { addDefaultSettings, getdefaultSetting } from '../../../../redux/actions/Settings/Business/defaultSettingActions';

const DefaultSettings = () => {
    const [data, setData] = useState({
        agreementPlan: '',
    });
    const dispatch = useDispatch();
    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const { agreementPlansDropdown } = useAgreementPlan();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        dispatch(
            getdefaultSetting((data) => {
                setData({
                    agreementPlan: data.agreementPlan,
                });
            }),
        );
    }, [dispatch]);

    const handleSave = () => {
        dispatch(addDefaultSettings(data, setLoading));
    };
    return (
        <>
            <CustomCard col="12" title="Default">
                <CustomGridLayout>
                    <CustomDropDown name="agreementPlan" options={agreementPlansDropdown} data={data} onChange={handleChange} required />
                </CustomGridLayout>
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" onClick={handleSave} loading={loading} />
            </CustomButtonGroup>
        </>
    );
};

export default DefaultSettings;
