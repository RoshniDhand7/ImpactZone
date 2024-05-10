import React, { useState } from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import { CustomCalenderInput, CustomDropDown, CustomInput, CustomInputNumber, CustomTextArea } from '../../../../shared/Input/AllInputs';
import formValidation from '../../../../utils/validations';
import { useSelector } from 'react-redux';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import AddServices from '../../Inventory/CatalogItems/AddServices';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';
import AddAgreementPlan from './AddAgreementPlan';

const DiscountForm = () => {
    const history = useHistory();
    const { id } = useParams();
    const [data, setData] = useState({
        discountName: '',
        percentage: '',
        startDate: '',
        endDate: '',
        availableDiscount: null, // if not then set automatically null, otherwise send id
        description: '',
        services: [],
        membershipPlan: [],
        multiItemDiscount: [
            {
                value1: 5,
                value2: 10.9,
                valueType: '$',
            },
        ],
    });
    const { loading } = useSelector((state) => state?.loader?.isLoading);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const handleSave = () => {};
    return (
        <>
            <FormPage backText="Discount Type">
                <CustomCard col="12" title="Add Discount Type">
                    <CustomGridLayout>
                        <CustomInput name="discountName" label="Name" data={data} onChange={handleChange} required />
                        <CustomInputNumber name="percentage" data={data} onChange={handleChange} required sufix="%" />
                        <CustomCalenderInput name="startDate" data={data} onChange={handleChange} required />
                        <CustomCalenderInput name="endDate" data={data} onChange={handleChange} required />
                        <CustomDropDown name="availableDiscount" options={[]} data={data} onChange={handleChange} optionLabel="name" />
                        <CustomTextArea name="description" data={data} onChange={handleChange} maxLength="200" />
                    </CustomGridLayout>
                </CustomCard>
                <AddServices data={data} setData={setData} id={id} loading={loading} type="discount" />
                <AddAgreementPlan data={data} setData={setData} id={id} loading={loading} type="discount" />
                <CustomButtonGroup>
                    <PrimaryButton label="Save" className="mx-2" onClick={handleSave} loading={loading} />
                    <LightButton label="Cancel" onClick={() => history.goBack()} />
                </CustomButtonGroup>
            </FormPage>
        </>
    );
};

export default DiscountForm;
