import React, { useEffect, useState } from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import {
    CustomCalenderInput,
    CustomCheckbox,
    CustomDropDown,
    CustomInput,
    CustomInputNumber,
    CustomInputSwitch,
    CustomTextArea,
} from '../../../../shared/Input/AllInputs';
import formValidation from '../../../../utils/validations';
import { useDispatch, useSelector } from 'react-redux';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import AddServices from '../../Inventory/CatalogItems/AddServices';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';
import AddAgreementPlan from './AddAgreementPlan';
import { amountTypeOptions, soundAudioOptions } from '../../../../utils/dropdownConstants';
import { getIds, showArrayFormErrors, showFormErrors } from '../../../../utils/commonFunctions';
import { addDiscountType, editDiscountType, getDiscountType, getDiscountTypes } from '../../../../redux/actions/PosSettings/discountType';

const DiscountForm = () => {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(
                getDiscountType(id, (data) => {
                    setData({
                        discountName: data.discountName,
                        discountCode: data.discountCode,
                        percentage: data.percentage,
                        startDate: data.startDate ? new Date(data.startDate) : '',
                        endDate: data.endDate ? new Date(data.endDate) : '',
                        availableDiscount: data.availableDiscount,
                        description: data.description,
                        services: data.services,
                        membershipPlan: data.membershipPlan,
                        multiItemDiscount: data.multiItemDiscount,
                        multiItemDiscountCheck: data.multiItemDiscountCheck,
                        isActive: data.isActive,
                        amountType: data.amountType,
                    });
                }),
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, dispatch]);
    const [data, setData] = useState({
        discountName: '',
        discountCode: '',
        percentage: 0,
        startDate: '',
        endDate: '',
        availableDiscount: null,
        description: '',
        services: [],
        membershipPlan: [],
        amountType: 'FIXED',
        multiItemDiscount: [
            {
                value1: 0,
                value2: 0,
                amountType: 'FIXED',
            },
        ],
        // sounds: '',
        multiItemDiscountCheck: false,
        isActive: true,
    });
    const { loading } = useSelector((state) => state?.loader?.isLoading);
    useEffect(() => {
        dispatch(getDiscountTypes());
    }, [dispatch]);
    const { allDiscountDropdown } = useSelector((state) => state.discountType);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const handleAdd = () => {
        const newDiscount = {
            value1: 0,
            value2: 0,
            amountType: 'FIXED',
        };
        setData((prevData) => ({
            ...prevData,
            multiItemDiscount: [...prevData.multiItemDiscount, newDiscount],
        }));
    };

    const handleChangeDynamicField = ({ name, value, customIndex, fieldName }) => {
        const _newData = { ...data };
        let obj = _newData[fieldName][customIndex];
        obj[name] = value;
        const formErrors = formValidation(name, value, obj);
        obj.formErrors = formErrors;
        _newData[fieldName][customIndex] = obj;

        setData(() => ({
            ..._newData,
        }));
    };
    const handleRemove = (indexToRemove, fieldName) => {
        setData((prevData) => ({
            ...prevData,
            [fieldName]: prevData[fieldName].filter((_, index) => index !== indexToRemove),
        }));
    };

    const handleSave = () => {
        let ignore = ['services'];
        if (!data?.multiItemDiscountCheck) {
            ignore = [...ignore, 'value1', 'value2'];
        }
        if (showFormErrors(data, setData, ignore)) {
            const validatedSchedule = showArrayFormErrors(data.multiItemDiscount, ignore);

            if (!validatedSchedule.isValid) {
                setData((prev) => ({ ...prev, multiItemDiscount: validatedSchedule.data }));
            }

            if (validatedSchedule.isValid) {
                const discountData = {
                    ...data,
                    services: getIds(data?.services),
                    membershipPlan: getIds(data?.membershipPlan),
                };

                if (id) {
                    dispatch(editDiscountType(id, discountData, history));
                } else {
                    dispatch(addDiscountType(discountData, history));
                }
            }
        }
    };

    return (
        <>
            <FormPage backText="Discount Type">
                <CustomCard col="12" title="Add Discount Type">
                    <CustomGridLayout>
                        <CustomInputSwitch name="isActive" data={data} onChange={handleChange} col="12" />
                        <CustomInput name="discountName" label="Name" data={data} onChange={handleChange} required />
                        <CustomInput name="discountCode" data={data} onChange={handleChange} required />

                        <CustomInputNumber
                            name="percentage"
                            data={data}
                            label="Discount Amount"
                            onChange={handleChange}
                            required
                            sufix="%"
                            col="4"
                            minFractionDigits={4}
                            maxFractionDigits={4}
                        />
                        <CustomDropDown label="Amount Type" name="amountType" options={amountTypeOptions} data={data} onChange={handleChange} col={2} />
                        <CustomCalenderInput name="startDate" data={data} onChange={handleChange} required />
                        <CustomCalenderInput name="endDate" data={data} onChange={handleChange} required />
                        <CustomDropDown name="availableDiscount" options={allDiscountDropdown} data={data} onChange={handleChange} optionLabel="name" />
                        <CustomCheckbox label="Multi Item Discount" name="multiItemDiscountCheck" onChange={handleChange} data={data} col="6" />
                        {data?.multiItemDiscountCheck && <PrimaryButton label="Add" className="mx-2" onClick={handleAdd} loading={loading} />}

                        {data?.multiItemDiscountCheck &&
                            data?.multiItemDiscount?.map((item, index) => (
                                <>
                                    <CustomInputNumber
                                        label="No of Items"
                                        name="value1"
                                        fieldName="multiItemDiscount"
                                        customIndex={index}
                                        data={item}
                                        onChange={handleChangeDynamicField}
                                        col="4"
                                    />
                                    <CustomInputNumber
                                        label="Amount"
                                        name="value2"
                                        customIndex={index}
                                        fieldName="multiItemDiscount"
                                        data={item}
                                        onChange={handleChangeDynamicField}
                                        col="4"
                                        minFractionDigits={4}
                                        maxFractionDigits={4}
                                    />
                                    <CustomDropDown
                                        label="Amount Type"
                                        name="amountType"
                                        customIndex={index}
                                        fieldName="multiItemDiscount"
                                        options={amountTypeOptions}
                                        data={item}
                                        onChange={handleChangeDynamicField}
                                        col={1}
                                    />
                                    {index > 0 && <i class="pi pi-minus-circle mt-4 text-center" onClick={() => handleRemove(index, 'multiItemDiscount')}></i>}
                                </>
                            ))}
                        <CustomTextArea name="description" data={data} onChange={handleChange} maxLength="200" />
                    </CustomGridLayout>
                </CustomCard>
                <AddServices data={data} setData={setData} id={id} loading={loading} type="discount" name="Add Catalog Item" />
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
