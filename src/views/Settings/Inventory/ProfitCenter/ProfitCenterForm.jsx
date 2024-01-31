import React, { useState, useEffect } from 'react';
import { CustomDropDown, CustomInput, CustomInputSwitch, CustomTextArea } from '../../../../shared/Input/AllInputs';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addLevel, editLevel, getLevel } from '../../../../redux/actions/ScheduleSettings/levelActions';
import formValidation from '../../../../utils/validations';
import { showFormErrors } from '../../../../utils/commonFunctions';

const ProfitCenterForm = () => {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (id) {
            // dispatch(
            //     getLevel(id, (data) => {
            //         setData({
            //             name: data.name,
            //             isActive: data.isActive,
            //         });
            //     }),
            // );
        }
    }, [id, dispatch]);
    const [data, setData] = useState({
        name: '',
        isActive: false,
    });
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            if (id) {
                // dispatch(editLevel(id, data, setLoading, history));
            } else {
                // dispatch(addLevel(data, setLoading, history));
            }
        }
    };
    return (
        <FormPage backText="Profit Center">
            <CustomCard col="12" title="General">
                <CustomGridLayout>
                    <CustomInput name="name" data={data} onChange={handleChange} required />
                    <CustomInput name="glCode" data={data} onChange={handleChange} required />
                    <CustomDropDown name="availableProfitCenter" options={[]} data={data} />
                    <CustomDropDown name="selectParentProfitCenter" options={[]} data={data} />
                    <CustomTextArea name="description" maxLength="266" data={data} onChange={handleChange} />

                    <CustomInputSwitch name="isActive" data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Catalog Items">
                <CustomGridLayout></CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Data Export">
                <CustomGridLayout>
                    <CustomInput name="profitCenterCode" data={data} onChange={handleChange} required />
                    <CustomInput name="earningsCode" data={data} onChange={handleChange} required />
                </CustomGridLayout>
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" onClick={handleSave} loading={loading} />
                <LightButton label="Cancel" onClick={() => history.goBack()} />
            </CustomButtonGroup>
        </FormPage>
    );
};

export default ProfitCenterForm;
