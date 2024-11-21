import React, { useState, useEffect } from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomDropDown, CustomInput, CustomInputSwitch } from '../../../../shared/Input/AllInputs';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { reasonCodeTypeOptions } from '../../../../utils/dropdownConstants';
import { addReasonCode, editReasonCode, getReasonCode } from '../../../../redux/actions/BusinessSettings/reasonActions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import formValidation from '../../../../utils/validations';
import { showFormErrors } from '../../../../utils/commonFunctions';

export default function ReasonCodeForm({ history }) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [data, setData] = useState({
        reasonCodeType: '',
        reasonCode: '',
        isActive: true,
    });
    useEffect(() => {
        if (id) {
            dispatch(
                getReasonCode(id, (data) => {
                    setData({
                        reasonCodeType: data.reasonCodeType,
                        reasonCode: data.reasonCode,
                        isActive: data.isActive,
                    });
                }),
            );
        }
    }, [id, dispatch]);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            if (id) {
                dispatch(editReasonCode(id, data, setLoading, history));
            } else {
                dispatch(addReasonCode(data, setLoading, history));
            }
        }
    };
    return (
        <div>
            <FormPage backText="Reason Codes">
                <CustomCard col="12" title="Reason Code">
                    <CustomGridLayout>
                        <CustomDropDown name="reasonCodeType" options={reasonCodeTypeOptions} data={data} onChange={handleChange} required />
                        <CustomInput name="reasonCode" data={data} onChange={handleChange} required />
                        <CustomInputSwitch name="isActive" data={data} onChange={handleChange} />
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
