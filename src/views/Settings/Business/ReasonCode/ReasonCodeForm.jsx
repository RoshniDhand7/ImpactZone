import React, { useState, useEffect } from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomDropDown, CustomInput } from '../../../../shared/Input/AllInputs';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { reasonCodeTypeOptions } from '../../../../utils/dropdownConstants';
import { addReasonCode, editReasonCode, getReasonCode } from '../../../../redux/actions/BusinessSettings/reasonActions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function ReasonCodeForm({ history }) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [data, setData] = useState({
        reasonCodeType: '',
        reasonCode: '',
    });
    useEffect(() => {
        if (id) {
            dispatch(
                getReasonCode(id, (data) => {
                    setData({
                        reasonCodeType: data.reasonCodeType,
                        reasonCode: data.reasonCode,
                    });
                }),
            );
        }
    }, [id]);

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        if (id) {
            dispatch(editReasonCode(id, data, setLoading, history));
        } else {
            dispatch(addReasonCode(data, setLoading, history));
        }
    };
    console.log('data>>', data);
    return (
        <div>
            <FormPage backText="Reason Codes" backTo="/settings/business">
                <CustomCard col="12" title="Active">
                    <CustomGridLayout>
                        <CustomDropDown name="reasonCodeType" options={reasonCodeTypeOptions} data={data} onChange={handleChange} />
                        <CustomInput name="reasonCode" data={data} onChange={handleChange} />
                    </CustomGridLayout>
                </CustomCard>
                <CustomButtonGroup>
                    <PrimaryButton label="Save" loading={loading} className="mx-2" onClick={handleSave} />
                    <LightButton label="Cancel" onClick={() => history.replace('/settings/business')} />
                </CustomButtonGroup>
            </FormPage>
        </div>
    );
}
