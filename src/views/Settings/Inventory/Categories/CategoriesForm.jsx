import React, { useState, useEffect } from 'react';
import { CustomDropDown, CustomInput, CustomInputSwitch, CustomTextArea } from '../../../../shared/Input/AllInputs';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import formValidation from '../../../../utils/validations';
import { showFormErrors } from '../../../../utils/commonFunctions';
import { addCategory, editCategory, getCategory } from '../../../../redux/actions/InventorySettings/categoriesAction';
import { yesNoOptions } from '../../../../utils/dropdownConstants';

const CategoriesForm = () => {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { categoryDropdown } = useSelector((state) => state.category);

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (id) {
            dispatch(
                getCategory(id, (data) => {
                    setData({
                        name: data.name,
                        displayInPos: data.displayInPos.toString(),
                        posButtonLabel: data.posButtonLabel,
                        availableCategory: data.availableCategory,
                        description: data.description,
                        isActive: data.isActive,
                    });
                }),
            );
        }
    }, [id, dispatch]);
    const [data, setData] = useState({
        name: '',
        displayInPos: '',
        posButtonLabel: '',
        availableCategory: '',
        description: '',
        isActive: false,
    });
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            if (id) {
                dispatch(editCategory(id, data, setLoading, history));
            } else {
                dispatch(addCategory(data, setLoading, history));
            }
        }
    };
    return (
        <FormPage backText="Categories">
            <CustomCard col="12" title="Add Categories">
                <CustomGridLayout>
                    <CustomInput name="name" data={data} onChange={handleChange} required />
                    <CustomDropDown name="displayInPos" label="Display In POS" options={yesNoOptions} data={data} onChange={handleChange} />
                    <CustomInput label="POS Button Label" name="posButtonLabel" data={data} onChange={handleChange} />
                    <CustomDropDown name="availableCategory" options={categoryDropdown} data={data} onChange={handleChange} />
                    <CustomTextArea name="description" maxLength="266" data={data} onChange={handleChange} />
                    <CustomInputSwitch name="isActive" data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Catalog Items">
                <CustomGridLayout></CustomGridLayout>
            </CustomCard>

            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" onClick={handleSave} loading={loading} />
                <LightButton label="Cancel" onClick={() => history.goBack()} />
            </CustomButtonGroup>
        </FormPage>
    );
};

export default CategoriesForm;
