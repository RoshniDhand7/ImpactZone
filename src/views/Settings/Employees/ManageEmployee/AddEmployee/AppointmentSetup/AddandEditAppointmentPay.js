import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addEmployeeAppointmentPay,
    editEmployeeAppointmentPay,
    getEmployeeAppartment,
} from '../../../../../../redux/actions/EmployeeSettings/appointmentAction';
import formValidation from '../../../../../../utils/validations';
import { showFormErrors } from '../../../../../../utils/commonFunctions';
import CustomDialog from '../../../../../../shared/Overlays/CustomDialog';
import { CustomGridLayout } from '../../../../../../shared/Cards/CustomCard';
import { CustomDropDown, CustomInputNumber, CustomMultiselect } from '../../../../../../shared/Input/AllInputs';
import { AppointmentPayPriorityOptions, amountTypeOptions } from '../../../../../../utils/dropdownConstants';
import { getEvents } from '../../../../../../redux/actions/ScheduleSettings/eventsActions';

const AddandEditAppointmentPay = ({ funcGetEmpAppointment, id, setVisible, visible, employeeAppartId, setEmployeeAppartId }) => {
    const dispatch = useDispatch();
    const initialState = {
        event: [],
        priority: 'PER-EVENT',
        type: 'PAY',
        pay: 0,
        amountType: 'FIXED',
    };
    const [data, setData] = useState(initialState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);
    let { isAppointmentLevel, allAppointmentPayDropdown } = useSelector((state) => state?.employees);

    const { allEvents } = useSelector((state) => state.event);
    const filteredEvents = allEvents
        ?.filter((item) => item?.eventLevel?.includes(isAppointmentLevel) && item.eventType === 'Appointments')
        ?.map((item) => ({ name: item.name, value: item._id }));
    const editFiltered = filteredEvents.filter((item) => !allAppointmentPayDropdown?.map((ed) => ed.name).includes(item.name) || data?.event === item?.value);
    const filtered = filteredEvents.filter((item) => !allAppointmentPayDropdown?.map((ed) => ed.name).includes(item.name));

    useEffect(() => {
        if (employeeAppartId) {
            dispatch(
                getEmployeeAppartment(employeeAppartId, setLoading, (data) => {
                    setData({
                        event: data.event,
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
                        funcGetEmpAppointment();
                        onClose();
                    }),
                );
            } else {
                dispatch(
                    addEmployeeAppointmentPay({ ...data, employee: id }, setLoading, () => {
                        funcGetEmpAppointment();
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
                    {employeeAppartId ? (
                        <CustomDropDown name="event" data={data} onChange={handleChange} options={editFiltered} col={12} />
                    ) : (
                        <CustomMultiselect name="event" data={data} onChange={handleChange} options={filtered} col={12} />
                    )}

                    <CustomDropDown name="priority" data={data} onChange={handleChange} options={AppointmentPayPriorityOptions} col={12} />
                    <CustomInputNumber col={8} name="pay" data={data} onChange={handleChange} minFractionDigits={4} maxFractionDigits={4} />
                    <CustomDropDown label="" name="amountType" options={amountTypeOptions} data={data} onChange={handleChange} col={4} />
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default AddandEditAppointmentPay;
