import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomChipInput, CustomInput, CustomInputSwitch } from '../../../../shared/Input/AllInputs';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import formValidation from '../../../../utils/validations';
import { showFormErrors } from '../../../../utils/commonFunctions';
import { addAgreementCategories, editAgreementCategories, getAgreementCategory } from '../../../../redux/actions/AgreementSettings/agreementCategories';

const AgreementCategoriesForm = () => {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(
                getAgreementCategory(id, (data) => {
                    setData({
                        name: data.name,
                        subCategories: data.subCategories ?? [],
                        isActive: data.isActive,
                    });
                }),
            );
        }
    }, [id, dispatch]);
    const [data, setData] = useState({
        name: '',
        subCategories: [],
        isActive: false,
    });
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            if (id) {
                dispatch(editAgreementCategories(id, data, setLoading, history));
            } else {
                dispatch(addAgreementCategories(data, setLoading, history));
            }
        }
    };

    console.log('datat>>', data);
    return (
        <>
            <FormPage backText="Agreement Categories">
                <CustomCard col="12" title="Add Agreements">
                    <CustomGridLayout>
                        <CustomInput name="name" data={data} onChange={handleChange} required />
                        <CustomChipInput data={data} name="subCategories" onChange={handleChange} col={12} />
                        <CustomInputSwitch name="isActive" data={data} onChange={handleChange} />
                    </CustomGridLayout>
                </CustomCard>
                <CustomButtonGroup>
                    <PrimaryButton label="Save" className="mx-2" onClick={handleSave} loading={loading} />
                    <LightButton label="Cancel" onClick={() => history.goBack()} />
                </CustomButtonGroup>
            </FormPage>
        </>
    );
};

export default AgreementCategoriesForm;
