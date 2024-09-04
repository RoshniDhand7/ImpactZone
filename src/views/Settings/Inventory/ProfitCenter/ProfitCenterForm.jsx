import React, { useState, useEffect } from 'react';
import { CustomDropDown, CustomInput, CustomInputSwitch, CustomTextArea } from '../../../../shared/Input/AllInputs';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import formValidation from '../../../../utils/validations';
import { showFormErrors } from '../../../../utils/commonFunctions';
import { addProfitCenters, editProfitCenters, getProfitCenter } from '../../../../redux/actions/InventorySettings/profitCenterAction';
import CustomPickList from '../../../../shared/Input/CustomPickList';

const ProfitCenterForm = () => {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { profitCenterDropdown } = useSelector((state) => state.profitCenter);

    useEffect(() => {
        if (id) {
            dispatch(
                getProfitCenter(id, (data) => {
                    setData({
                        name: data.name,
                        glCode: data.glCode,
                        availableProfitCenter: data.availableProfitCenter,
                        parentProfitCenter: data.parentProfitCenter,
                        description: data.description,
                        profitCenterCode: data.profitCenterCode,
                        earningsCode: data.earningsCode,
                        isActive: data.isActive,
                    });
                }),
            );
        }
    }, [id, dispatch]);
    const [data, setData] = useState({
        name: '',
        glCode: '',
        availableProfitCenter: '',
        parentProfitCenter: '',
        description: '',
        profitCenterCode: '',
        earningsCode: '',
        isActive: false,
        catalog: [],
    });
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            if (id) {
                dispatch(editProfitCenters(id, data, setLoading, history));
            } else {
                dispatch(addProfitCenters(data, setLoading, history));
            }
        }
    };
    const { catalogDropDown } = useSelector((state) => state.catalogItems);

    return (
        <FormPage backText="Profit Center">
            <CustomCard col="12" title="General">
                <CustomGridLayout>
                    <CustomInput name="name" data={data} onChange={handleChange} required />
                    <CustomInput name="glCode" data={data} onChange={handleChange} />
                    <CustomDropDown name="availableProfitCenter" options={profitCenterDropdown} data={data} optionLabel="name" onChange={handleChange} />
                    <CustomDropDown name="parentProfitCenter" options={profitCenterDropdown} data={data} onChange={handleChange} optionLabel="name" />
                    <CustomTextArea name="description" maxLength="266" data={data} onChange={handleChange} />

                    <CustomInputSwitch name="isActive" data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Catalog Items">
                <CustomPickList name="catalog" selected={data?.catalog} sourceData={catalogDropDown} onPickListChange={handleChange} />
            </CustomCard>
            <CustomCard col="12" title="Data Export">
                <CustomGridLayout>
                    <CustomInput name="profitCenterCode" data={data} onChange={handleChange} />
                    <CustomInput name="earningsCode" data={data} onChange={handleChange} />
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
