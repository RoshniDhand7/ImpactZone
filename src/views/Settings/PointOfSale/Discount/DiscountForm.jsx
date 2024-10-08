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
                        amountType: data.amountType,
                        amount: data.amount,
                        startDate: data.startDate ? new Date(data.startDate) : '',
                        endDate: data.endDate ? new Date(data.endDate) : '',
                        indefinite: data.indefinite,
                        availableDiscount: data.availableDiscount,
                        description: data.description,
                        services: data.services,
                        membershipType: data.membershipType,
                        multiItemDiscount: data.multiItemDiscount,
                        multiItemDiscountCheck: data.multiItemDiscountCheck,
                        isActive: data.isActive,
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
        amountType: 'FIXED',
        amount: 0,
        availableDiscount: null,
        startDate: '',
        endDate: '',
        indefinite: false,

        combinedDiscount: false,
        itemUsedMoreThanOnce: true,
        itemBogo: false,

        multiItemDiscountCheck: false,
        multiItemDiscount: [
            {
                noOfItems: 0,
                amountType: 'FIXED',
                amount: 0,
            },
        ],

        services: [],
        salesCode: [],
        membershipType: [],

        // days Schedule
        days: [],
        timeRangeEnabled: false,
        startTime: '',
        endTime: '',
        description: '',
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
            noOfItems: 0,
            amountType: 'FIXED',
            amount: 0,
        };
        setData((prevData) => ({
            ...prevData,
            multiItemDiscount: [...prevData.multiItemDiscount, newDiscount],
        }));
    };
    const handleRemove = (indexToRemove, fieldName) => {
        setData((prevData) => ({
            ...prevData,
            [fieldName]: prevData[fieldName].filter((_, index) => index !== indexToRemove),
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
    console.log('data==>', data);

    const handleSave = () => {
        let ignore = ['services'];
        if (data.indefinite) {
            ignore = [...ignore, 'endDate'];
        }
        if (!data.specificTime) {
            ignore = [...ignore, 'days', 'startTime', 'endTime'];
        }
        if (showFormErrors(data, setData, ignore)) {
            if (!data?.multiItemDiscountCheck) {
                ignore = [...ignore, 'noOfItems', 'amount'];
            }
            const validatedSchedule = showArrayFormErrors(data.multiItemDiscount, ignore);
            console.log('validatedSchedule=>', validatedSchedule);

            if (!validatedSchedule.isValid) {
                setData((prev) => ({ ...prev, multiItemDiscount: validatedSchedule.data }));
            }

            if (validatedSchedule.isValid) {
                // so items should always be in ascending order.
                let multiItemDiscount = data?.multiItemDiscount.sort((a, b) => a.noOfItems - b.noOfItems);
                const discountData = {
                    ...data,
                    multiItemDiscount,
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
                        <CustomInput name="discountName" label="Name" data={data} onChange={handleChange} required />
                        <CustomInput name="discountCode" data={data} onChange={handleChange} required />
                        <CustomDropDown name="amountType" options={amountTypeOptions} data={data} onChange={handleChange} col={1} />
                        <CustomInputNumber
                            label={`Amount (${data?.amountType === 'FIXED' ? '$' : '%'})`}
                            name="amount"
                            data={data}
                            onChange={handleChange}
                            required
                            maxFractionDigits={4}
                            col={3}
                        />

                        <CustomDropDown name="availableDiscount" options={allDiscountDropdown} data={data} onChange={handleChange} optionLabel="name" />
                        <CustomCalenderInput name="startDate" data={data} onChange={handleChange} required col={3} minDate={new Date()} />
                        {!data?.indefinite && <CustomCalenderInput name="endDate" data={data} onChange={handleChange} required col={3} />}
                        <CustomCheckbox
                            label="No End Date(Indefinite )"
                            name="indefinite"
                            onChange={handleChange}
                            data={data}
                            col="2"
                            extraClassName="my-auto"
                        />
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
                        <CustomCheckbox
                            label="Multi Item Discount"
                            name="multiItemDiscountCheck"
                            onChange={handleChange}
                            data={data}
                            col={data?.multiItemDiscountCheck ? 12 : 2}
                            extraClassName="mt-2"
                        />
                        {data?.multiItemDiscountCheck && (
                            <>
                                {data?.multiItemDiscount?.map((item, index) => (
                                    <>
                                        <CustomInputNumber
                                            name="noOfItems"
                                            fieldName="multiItemDiscount"
                                            customIndex={index}
                                            data={item}
                                            onChange={handleChangeDynamicField}
                                        />
                                        <CustomDropDown
                                            name="amountType"
                                            customIndex={index}
                                            fieldName="multiItemDiscount"
                                            options={amountTypeOptions}
                                            data={item}
                                            onChange={handleChangeDynamicField}
                                            col={1}
                                        />
                                        <CustomInputNumber
                                            name="amount"
                                            label={`Amount (${item?.amountType === 'FIXED' ? '$' : '%'})`}
                                            customIndex={index}
                                            fieldName="multiItemDiscount"
                                            data={item}
                                            onChange={handleChangeDynamicField}
                                            col={3}
                                            maxFractionDigits={4}
                                        />
                                        <div className="col-4 my-auto">
                                            {index > 0 ? (
                                                <i class="pi pi-minus-circle cursor-pointer" onClick={() => handleRemove(index, 'multiItemDiscount')}></i>
                                            ) : (
                                                <i class="pi pi-plus-circle cursor-pointer" onClick={handleAdd}></i>
                                            )}
                                        </div>
                                    </>
                                ))}
                            </>
                        )}

                        <CustomCheckbox
                            label="Specific Time"
                            name="specificTime"
                            onChange={handleChange}
                            data={data}
                            col={data?.specificTime ? 12 : 2}
                            extraClassName="mt-2"
                        />

                        {data?.specificTime && (
                            <div className="col-12">
                                <CustomGridLayout>
                                    <CustomMultiselect name="days" onChange={handleChange} data={data} options={WeekDaysOption} required />
                                    <CustomCalenderInput name="startTime" onChange={handleChange} data={data} timeOnly hourFormat="12" required />
                                    <CustomCalenderInput name="endTime" onChange={handleChange} data={data} timeOnly hourFormat="12" required />
                                </CustomGridLayout>
                            </div>
                        )}
                        <CustomTextArea name="description" data={data} onChange={handleChange} maxLength="200" />
                        <CustomInputSwitch name="isActive" data={data} onChange={handleChange} col="12" />
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
