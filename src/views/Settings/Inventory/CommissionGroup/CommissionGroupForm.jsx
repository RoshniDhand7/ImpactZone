import React, { useState, useEffect } from 'react';
import { CustomDropDown, CustomInput, CustomInputSwitch } from '../../../../shared/Input/AllInputs';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import formValidation from '../../../../utils/validations';
import { showFormErrors } from '../../../../utils/commonFunctions';
import { catalogProductTypeOptions } from '../../../../utils/dropdownConstants';
import SelectCatalogItems from '../CatalogItems/SelectCatalogItems';
import { addCommissionGroups, editCommissionGroups, getCommissionGroup } from '../../../../redux/actions/Settings/InventorySetup/commissionGroupAction';

const CommissionGroupForm = () => {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (id) {
            dispatch(
                getCommissionGroup(id, (data) => {
                    setData({
                        name: data.name,
                        type: data.type,
                        isActive: data.isActive,
                        catalogs: data?.catalogs,
                    });
                }),
            );
        }
    }, [id, dispatch]);
    const [data, setData] = useState({
        name: '',
        type: 'PRODUCTS',
        isActive: true,
        catalogs: [],
    });
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            if (id) {
                dispatch(editCommissionGroups(id, data, setLoading, history));
            } else {
                dispatch(addCommissionGroups(data, setLoading, history));
            }
        }
    };
    return (
        <FormPage backText="CommissionGroup">
            <CustomCard col="12" title="Add New Commission Group">
                <CustomGridLayout>
                    <CustomInput name="name" data={data} onChange={handleChange} required />
                    <CustomDropDown name="type" options={catalogProductTypeOptions} data={data} onChange={handleChange} />
                    <CustomInputSwitch name="isActive" data={data} onChange={handleChange} col={4} />
                </CustomGridLayout>
            </CustomCard>
            <SelectCatalogItems data={data} setData={setData} id={id} loading={loading} name="Catalog Items" />
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" onClick={handleSave} loading={loading} />
                <LightButton label="Cancel" onClick={() => history.goBack()} />
            </CustomButtonGroup>
        </FormPage>
    );
};

export default CommissionGroupForm;
