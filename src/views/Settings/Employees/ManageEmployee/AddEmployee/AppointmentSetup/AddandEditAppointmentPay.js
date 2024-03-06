import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    addEmployeeAppointmentPay,
    editEmployeeAppointmentPay,
    getEmployeeAppartment,
} from '../../../../../../redux/actions/EmployeeSettings/appointmentAction';
import formValidation from '../../../../../../utils/validations';
import { showFormErrors } from '../../../../../../utils/commonFunctions';
import CustomDialog from '../../../../../../shared/Overlays/CustomDialog';
import { CustomGridLayout } from '../../../../../../shared/Cards/CustomCard';
import { CustomDropDown, CustomInput, CustomInputNumber } from '../../../../../../shared/Input/AllInputs';
import { AppointmentPayPriorityOptions, amountTypeOptions } from '../../../../../../utils/dropdownConstants';

const AddandEditAppointmentPay = ({ funcGetEmpAppointment, id, setVisible, visible }) => {
    const dispatch = useDispatch();
    const initialState = {
        name: '',
        priority: 'PER-EVENT',
        type: 'PAY',
        pay: 0,
        amountType: 'FIXED',
    };
    const [data, setData] = useState(initialState);

    const [loading, setLoading] = useState(false);
    const [employeeAppartId, setEmployeeAppartId] = useState(null);
    useEffect(() => {
        if (employeeAppartId) {
            dispatch(
                getEmployeeAppartment(employeeAppartId, setLoading, (data) => {
                    setData({
                        name: data.name,
                        priority: data.priority,
                        type: 'PAY',
                        pay: data.pay,
                        amountType: data.amountType,
                    });
                }),
            );
        }
    }, [employeeAppartId, dispatch]);
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            if (employeeAppartId) {
                dispatch(
                    editEmployeeAppointmentPay(employeeAppartId, { ...data }, setLoading, () => {
                        funcGetEmpAppointment(id);
                        onClose();
                    }),
                );
            } else {
                dispatch(
                    addEmployeeAppointmentPay({ ...data, employee: id }, setLoading, () => {
                        funcGetEmpAppointment(id);
                        onClose();
                    }),
                );
            }
        }
    };
    const onClose = () => {
        setEmployeeAppartId(null);
        setData(initialState);
        setVisible(false);
    };
    return (
        <>
            <CustomDialog title={employeeAppartId ? 'Edit' : 'Add'} visible={visible} onCancel={onClose} loading={loading} onSave={handleSave}>
                <CustomGridLayout>
                    <CustomInput col="12" name="name" data={data} onChange={handleChange} />
                    <CustomDropDown name="priority" data={data} onChange={handleChange} options={AppointmentPayPriorityOptions} col={12} />
                    <CustomInputNumber col={8} name="pay" data={data} onChange={handleChange} />
                    <CustomDropDown label="" name="amountType" options={amountTypeOptions} data={data} onChange={handleChange} col={4} />
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default AddandEditAppointmentPay;
