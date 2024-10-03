import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addAccessSchedule, editAccessSchedule, getAccessSchedule } from '../../../../redux/actions/MembersSettings/accessSchedule';
import CustomPicker from '../../../../shared/ColorPicker/ColorPicker';
import { CustomInput, CustomInputSwitch, CustomTextArea } from '../../../../shared/Input/AllInputs';
import formValidation from '../../../../utils/validations';
import { showFormErrors } from '../../../../utils/commonFunctions';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';

const General = () => {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (id) {
            dispatch(
                getAccessSchedule(id, (data) => {
                    setData({
                        name: data.name,
                        shortName: data.shortName,
                        color: data.color,
                        description: data.description,
                        isActive: data.isActive,
                    });
                }),
            );
        }
    }, [id, dispatch]);
    const [data, setData] = useState({
        name: '',
        shortName: '',
        color: '',
        description: '',
        isActive: true,
    });
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const handleSave = (tab) => {
        if (showFormErrors(data, setData)) {
            if (id) {
                dispatch(editAccessSchedule(id, data, setLoading, history, tab));
            } else {
                dispatch(addAccessSchedule(data, history, tab));
            }
        }
    };
    return (
        <div>
            <CustomCard col="12" title="Add Access Schedule">
                <CustomGridLayout>
                    <CustomInput name="name" data={data} onChange={handleChange} required />
                    <CustomInput name="shortName" data={data} onChange={handleChange} required />
                    <CustomPicker name="color" data={data} onChange={handleChange} />
                    <CustomTextArea name="description" maxLength="266" data={data} onChange={handleChange} />
                    <CustomInputSwitch name="isActive" data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" onClick={() => handleSave('')} loading={loading} />
                <PrimaryButton label="Save & Next" className="mx-2" onClick={() => handleSave('?tab=access')} loading={loading} />
                <LightButton label="Cancel" onClick={() => history.goBack()} />
            </CustomButtonGroup>
        </div>
    );
};

export default General;
