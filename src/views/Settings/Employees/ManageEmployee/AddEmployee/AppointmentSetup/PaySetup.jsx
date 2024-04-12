import React, { useState, useEffect, useCallback } from 'react';
import { CustomFilterCard } from '../../../../../../shared/Cards/CustomCard';
import { useParams } from 'react-router-dom';
import { CustomDropDown } from '../../../../../../shared/Input/AllInputs';
import { useDispatch, useSelector } from 'react-redux';
import {
    deletetEmployeeAppartment,
    getEmployeeAppointmentPay,
    updateEmployeeAppointmentPayLevel,
} from '../../../../../../redux/actions/EmployeeSettings/appointmentAction';
import CustomTable from '../../../../../../shared/Table/CustomTable';
import { confirmDelete } from '../../../../../../utils/commonFunctions';
import formValidation from '../../../../../../utils/validations';
import { getLevels } from '../../../../../../redux/actions/ScheduleSettings/levelActions';
import AddandEditAppointmentPay from './AddandEditAppointmentPay';

const PaySetup = () => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [employeeAppartId, setEmployeeAppartId] = useState(null);

    const { id } = useParams();
    const [data, setData] = useState({
        isDefaultPay: '',
        isAppointmentLevel: '',
    });
    let { allAppointmentPay } = useSelector((state) => state?.employees);
    const funcGetEmpAppointment = useCallback(() => {
        dispatch(getEmployeeAppointmentPay(id, 'PAY'));
    }, [dispatch, id]);

    useEffect(() => {
        funcGetEmpAppointment();
    }, [funcGetEmpAppointment]);
    useEffect(() => {
        dispatch(getLevels());
    }, [dispatch]);
    useEffect(() => {
        if (allAppointmentPay) {
            setData((prev) => ({ ...prev, isAppointmentLevel: allAppointmentPay?.isAppointmentLevel }));
        }
    }, [allAppointmentPay]);

    const { levelDropdown } = useSelector((state) => state.level);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);

        if (name === 'isAppointmentLevel') {
            dispatch(
                updateEmployeeAppointmentPayLevel(id, value, () => {
                    funcGetEmpAppointment();
                }),
            );
            setData((prev) => ({ ...prev, [name]: value, formErrors }));
        }
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const columns = [
        { field: 'event', header: 'Name' },
        { field: 'priority', header: 'Priority' },
        { field: 'pay', header: 'Pay' },
    ];

    const onDelete = (col) => {
        confirmDelete(() => {
            dispatch(
                deletetEmployeeAppartment(col._id, () => {
                    funcGetEmpAppointment();
                    setVisible(false);
                }),
            );
        }, 'Do you want to delete this Appartment Pay?');
    };
    const onEdit = (col) => {
        setEmployeeAppartId(col?._id);
        setVisible(true);
    };

    return (
        <>
            <CustomFilterCard buttonTitle="Add" onClick={() => setVisible(true)} extraClass="align-items-end">
                <CustomDropDown
                    extraClassName="w-18rem"
                    name="isAppointmentLevel"
                    label="Appointment Level"
                    options={levelDropdown}
                    optionLabel="name"
                    data={data}
                    onChange={handleChange}
                />
            </CustomFilterCard>
            <CustomTable data={allAppointmentPay?.list} columns={columns} onEdit={onEdit} onDelete={onDelete} />
            <AddandEditAppointmentPay
                funcGetEmpAppointment={funcGetEmpAppointment}
                id={id}
                setVisible={setVisible}
                visible={visible}
                employeeAppartId={employeeAppartId}
                setEmployeeAppartId={setEmployeeAppartId}
            />
        </>
    );
};

export default PaySetup;
