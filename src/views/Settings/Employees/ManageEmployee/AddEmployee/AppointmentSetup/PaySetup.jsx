import React, { useState, useEffect } from 'react';
import { CustomFilterCard, CustomGridLayout } from '../../../../../../shared/Cards/CustomCard';
import CustomDialog from '../../../../../../shared/Overlays/CustomDialog';
import { useParams } from 'react-router-dom';
import { CustomDropDown, CustomInput, CustomInputNumber } from '../../../../../../shared/Input/AllInputs';
import { AppointmentPayPriorityOptions, amountTypeOptions } from '../../../../../../utils/dropdownConstants';
import { useDispatch } from 'react-redux';
import {
    addEmployeeAppointmentPay,
    deletetEmployeeAppartment,
    editEmployeeAppointmentPay,
    getEmployeeAppartment,
    getEmployeeAppointmentPay,
} from '../../../../../../redux/actions/EmployeeSettings/appointmentAction';
import CustomTable from '../../../../../../shared/Table/CustomTable';
import { confirmDelete, showFormErrors } from '../../../../../../utils/commonFunctions';
import formValidation from '../../../../../../utils/validations';

const PaySetup = () => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [employeeAppartId, setEmployeeAppartId] = useState(null);
    const [appointmentData, setAppointmentData] = useState([]);

    const initialState = {
        name: '',
        priority: 'PER-EVENT',
        type: 'PAY',
        pay: 0,
        amountType: 'FIXED',
    };

    const [data, setData] = useState(initialState);

    const { id } = useParams();

    useEffect(() => {
        funcGetEmpAppointment(id);
    }, []);
    const funcGetEmpAppointment = (id) => {
        dispatch(
            getEmployeeAppointmentPay(id, 'PAY', setLoading, (data) => {
                setAppointmentData(data);
            }),
        );
    };

    useEffect(() => {
        console.log(employeeAppartId);
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

    const onClose = () => {
        setEmployeeAppartId(null);
        setData(initialState);
        setVisible(false);
    };

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value ,formErrors}));
    };

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'priority', header: 'Priority' },
        { field: 'pay', header: 'Pay' },
    ];

    const onDelete = (col) => {
        confirmDelete(() => {
            dispatch(
                deletetEmployeeAppartment(col._id, () => {
                    funcGetEmpAppointment(id);
                    onClose();
                }),
            );
        }, 'Do you want to delete this Appartment Pay?');
    };
    const onEdit = (col) => {
        setEmployeeAppartId(col?._id);
        setVisible(true);
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

    console.log('data>>', data);

    return (
        <>
            <CustomFilterCard buttonTitle="Add" onClick={() => setVisible(true)} />
            <CustomTable data={appointmentData} columns={columns} onEdit={onEdit} onDelete={onDelete} />

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

export default PaySetup;
