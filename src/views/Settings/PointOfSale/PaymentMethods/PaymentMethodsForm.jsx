import React, { useEffect, useState } from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { defaultReceiptCopiesOptions, yesNoOptions } from '../../../../utils/dropdownConstants';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import formValidation from '../../../../utils/validations';
import { showFormErrors } from '../../../../utils/commonFunctions';
import { CustomDropDown, CustomInput, CustomInputSwitch } from '../../../../shared/Input/AllInputs';
import { addPaymentMethod, editPaymentMethod, getPaymentMethod } from '../../../../redux/actions/PosSettings/PaymentMethods';

const PaymentMethodsForm = () => {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(
                getPaymentMethod(id, (data) => {
                    setData({
                        name: data.name,
                        detail: data.detail,
                        code: data.code,
                        count: data.count,
                        income: data.income,
                        allowMultiple: data.allowMultiple,
                        allowChange: data.allowChange,
                        requireMember: data.requireMember,
                        allowNegativeDrawerAmount: data.allowNegativeDrawerAmount,
                        defaultReceiptCopies: data.defaultReceiptCopies,
                        signatureOnReceipt: data.signatureOnReceipt,
                        hideInPos: data.hideInPos,
                        isActive: data.isActive,
                    });
                }),
            );
        }
    }, [id, dispatch]);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            if (id) {
                dispatch(editPaymentMethod(id, data, setLoading, history));
            } else {
                dispatch(addPaymentMethod(data, setLoading, history));
            }
        }
    };
    const [data, setData] = useState({
        name: '',
        detail: '',
        code: '',
        count: 'false',
        income: 'false',
        allowMultiple: 'false',
        allowChange: 'false',
        requireMember: 'false',
        allowNegativeDrawerAmount: 'false',
        defaultReceiptCopies: '',
        signatureOnReceipt: 'false',
        hideInPos: 'false',
        isActive: true,
    });
    return (
        <>
            <FormPage backText="Payment Methods">
                <CustomCard col="12" title="Add Payment Method">
                    <CustomGridLayout>
                        <CustomInput name="name" data={data} onChange={handleChange} required />
                        <CustomInput name="detail" data={data} onChange={handleChange} required />
                        <CustomInput name="code" data={data} onChange={handleChange} required />
                        <CustomDropDown name="count" label="Count(Close Out)" options={yesNoOptions} data={data} onChange={handleChange} />
                        <CustomDropDown name="income" options={yesNoOptions} data={data} onChange={handleChange} />
                        <CustomDropDown name="allowMultiple" options={yesNoOptions} data={data} onChange={handleChange} />
                        <CustomDropDown name="allowChange" options={yesNoOptions} data={data} onChange={handleChange} />
                        <CustomDropDown name="requireMember" options={yesNoOptions} data={data} onChange={handleChange} />
                        <CustomDropDown name="allowNegativeDrawerAmount" options={yesNoOptions} data={data} onChange={handleChange} />
                        <CustomDropDown name="defaultReceiptCopies" options={defaultReceiptCopiesOptions} data={data} onChange={handleChange} required />
                        <CustomDropDown name="signatureOnReceipt" options={yesNoOptions} data={data} onChange={handleChange} />
                        <CustomDropDown name="hideInPos" options={yesNoOptions} data={data} onChange={handleChange} />
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

export default PaymentMethodsForm;
