import React, { useEffect, useState } from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import { CustomCalenderInput, CustomCheckbox, CustomDropDown, CustomInput, CustomInputNumber, CustomTextArea } from '../../../../shared/Input/AllInputs';
import formValidation from '../../../../utils/validations';
import { useDispatch, useSelector } from 'react-redux';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import AddServices from '../../Inventory/CatalogItems/AddServices';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';
import AddAgreementPlan from './AddAgreementPlan';
import { amountTypeOptions, soundAudioOptions } from '../../../../utils/dropdownConstants';
import { getIds, showFormErrors } from '../../../../utils/commonFunctions';
import { addDiscountType, editDiscountType, getDiscountType, getDiscountTypes } from '../../../../redux/actions/PosSettings/discountType';

const DiscountForm = () => {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        discountName: '',
        percentage: '',
        startDate: '',
        endDate: '',
        availableDiscount: null,
        description: '',
        services: [],
        membershipPlan: [],
        multiItemDiscount: [
            {
                value1: 0,
                value2: 0,
                amountType: 'FIXED',
            },
        ],
        // sounds: '',
        multiItemDiscountCheck: false,
    });
    const { loading } = useSelector((state) => state?.loader?.isLoading);
    useEffect(() => {
        dispatch(getDiscountTypes());
    }, [dispatch]);
    const { allDiscountDropdown } = useSelector((state) => state.discountType);

    useEffect(() => {
        if (id) {
            dispatch(
                getDiscountType(id, (data) => {
                    setData({
                        discountName: data.discountName,
                        percentage: data.percentage,
                        startDate: data.startDate ? new Date(data.startDate) : '',
                        endDate: data.endDate ? new Date(data.endDate) : '',
                        availableDiscount: data.availableDiscount,
                        description: data.description,
                        services: data.services,
                        membershipPlan: data.membershipPlan,
                        multiItemDiscount: data.multiItemDiscount,
                        multiItemDiscountCheck: data.multiItemDiscountCheck,
                    });
                }),
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, dispatch]);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    console.log('data>>', data);

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

    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            if (id) {
                dispatch(editDiscountType(id, { ...data, services: getIds(data?.services), membershipPlan: getIds(data?.membershipPlan) }, history));
            } else {
                dispatch(addDiscountType({ ...data, services: getIds(data?.services), membershipPlan: getIds(data?.membershipPlan) }, history));
            }
        }
    };
    return (
        <>
            <FormPage backText="Discount Type">
                <CustomCard col="12" title="Add Discount Type">
                    <CustomGridLayout>
                        {/* <CustomDropDown name="sounds" options={soundAudioOptions} data={data} onChange={handleChange} />
                        {data?.sounds && (
                            <audio controls>
                                <source src={data?.sounds} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        )} */}
                        <CustomInput name="discountName" label="Name" data={data} onChange={handleChange} required />
                        <CustomInputNumber name="percentage" data={data} onChange={handleChange} required sufix="%" col="4" />
                        <CustomCalenderInput name="startDate" data={data} onChange={handleChange} required />
                        <CustomCalenderInput name="endDate" data={data} onChange={handleChange} required />
                        <CustomDropDown name="availableDiscount" options={allDiscountDropdown} data={data} onChange={handleChange} optionLabel="name" />
                        <CustomCheckbox name="multiItemDiscountCheck" onChange={handleChange} data={data} col="8" />
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
                                        minFractionDigits={2}
                                        maxFractionDigits={2}
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
                                </>
                            ))}
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
