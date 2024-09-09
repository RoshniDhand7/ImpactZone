import React, { useEffect, useState } from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import {
    CustomCalenderInput,
    CustomCheckbox,
    CustomDropDown,
    CustomInput,
    CustomInputNumber,
    CustomInputSwitch,
    CustomMultiselect,
    CustomTextArea,
} from '../../../../shared/Input/AllInputs';
import formValidation from '../../../../utils/validations';
import { useDispatch, useSelector } from 'react-redux';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import AddServices from '../../Inventory/CatalogItems/AddServices';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';
import { amountTypeOptions, WeekDaysOption, yesNoOptions } from '../../../../utils/dropdownConstants';
import { getIds, showArrayFormErrors, showFormErrors } from '../../../../utils/commonFunctions';
import { addDiscountType, editDiscountType, getDiscountType, getDiscountTypes } from '../../../../redux/actions/PosSettings/discountType';
import AddSalesCode from './AddSalesCode';
import AddMembershipType from './AddMembershipType';

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
                        membershipType: data.membershipType,
                        multiItemDiscount: data.multiItemDiscount,
                        multiItemDiscountCheck: data.multiItemDiscountCheck,
                        isActive: data.isActive,
                        amountType: data.amountType,
                        indefinite: data.indefinite ? data.indefinite : false,
                        combinedDiscount: data.combinedDiscount,
                        itemUsedMoreThanOnce: data.itemUsedMoreThanOnce,
                        itemBogo: data.itemBogo,
                        specificTime: data.specificTime,
                        days: data.days,
                        startTime: data?.startTime ? new Date(data.startTime) : null,
                        endTime: data?.endTime ? new Date(data.endTime) : null,
                        salesCode: data?.salesCode,
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
        salesCode: [],
        membershipType: [],
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
        indefinite: false,
        combinedDiscount: false,
        itemUsedMoreThanOnce: false,
        itemBogo: false,
        isActive: true,
        // days Schedule
        selectedDays: [],
        frequency: '',
        timeRangeEnabled: false,
        timeRange: { start: '', end: '' },
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
        if (data.indefinite) {
            ignore = [...ignore, 'endDate'];
        }
        if (!data.specificTime) {
            ignore = [...ignore, 'days', 'startTime', 'endTime'];
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
                    salesCode: getIds(data.salesCode),
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
                        <CustomDropDown label="Amount Type" name="amountType" options={amountTypeOptions} data={data} onChange={handleChange} col={1} />
                        <CustomCalenderInput name="startDate" data={data} onChange={handleChange} required col={3} />
                        {!data?.indefinite && <CustomCalenderInput name="endDate" data={data} onChange={handleChange} required col={3} />}
                        <CustomDropDown name="availableDiscount" options={allDiscountDropdown} data={data} onChange={handleChange} optionLabel="name" col={3} />
                    </CustomGridLayout>
                    <CustomGridLayout>
                        <CustomCheckbox label="Indefinite" name="indefinite" onChange={handleChange} data={data} col="4" inputClass="mt-5 ml-5" />

                        <CustomCheckbox
                            label="Multi Item Discount"
                            name="multiItemDiscountCheck"
                            onChange={handleChange}
                            data={data}
                            col="4"
                            inputClass="mt-5 ml-5"
                        />
                        <CustomCheckbox label="Specific Time" name="specificTime" onChange={handleChange} data={data} col="4" inputClass="mt-5 ml-5" />

                        {data?.multiItemDiscountCheck && <PrimaryButton label="Add" className="mx-2 my-4  " onClick={handleAdd} loading={loading} />}

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

                        {data?.specificTime && (
                            <>
                                <CustomMultiselect name="days" onChange={handleChange} data={data} options={WeekDaysOption} col={4} />
                                <CustomCalenderInput
                                    name="startTime"
                                    onChange={handleChange}
                                    data={data}
                                    timeOnly
                                    placeholder="Select Time"
                                    hourFormat="12"
                                    col={4}
                                />
                                <CustomCalenderInput
                                    name="endTime"
                                    onChange={handleChange}
                                    data={data}
                                    timeOnly
                                    placeholder="Select Time"
                                    hourFormat="12"
                                    col={4}
                                />
                            </>
                        )}

                        <CustomDropDown
                            label="Can this discount be combined with others?"
                            name="combinedDiscount"
                            options={yesNoOptions}
                            data={data}
                            onChange={handleChange}
                        />
                        <CustomDropDown
                            label="Can this item be used more than once?"
                            name="itemUsedMoreThanOnce"
                            options={yesNoOptions}
                            data={data}
                            onChange={handleChange}
                        />
                        <CustomDropDown label="Is this Item BOGO?" name="itemBogo" options={yesNoOptions} data={data} onChange={handleChange} />
                        <CustomTextArea name="description" data={data} onChange={handleChange} maxLength="200" />
                    </CustomGridLayout>
                </CustomCard>
                <AddServices data={data} setData={setData} id={id} loading={loading} type="discount" name=" Catalog Item" />
                <AddSalesCode data={data} setData={setData} id={id} loading={loading} name="Sales Code" />
                <AddMembershipType data={data} setData={setData} id={id} loading={loading} name="Membership Type" />
                <CustomButtonGroup>
                    <PrimaryButton label="Save" className="mx-2" onClick={handleSave} loading={loading} />
                    <LightButton label="Cancel" onClick={() => history.goBack()} />
                </CustomButtonGroup>
            </FormPage>
        </>
    );
};

export default DiscountForm;
