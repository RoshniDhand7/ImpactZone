import React, { useState, useEffect, useCallback } from 'react';
import { CustomFilterCard, CustomGridLayout } from '../../../../../../shared/Cards/CustomCard';
import { useParams } from 'react-router-dom';
import { CustomDropDown } from '../../../../../../shared/Input/AllInputs';
import { useDispatch, useSelector } from 'react-redux';
import {
    addEmployeeAppointmentPay,
    deletetEmployeeAppartment,
    getEmployeeAppointmentPay,
    updateEmployeeAppointmentPayLevel,
} from '../../../../../../redux/actions/EmployeeSettings/appointmentAction';
import CustomTable from '../../../../../../shared/Table/CustomTable';
import { confirmDelete, showFormErrors } from '../../../../../../utils/commonFunctions';
import formValidation from '../../../../../../utils/validations';
import { getLevels } from '../../../../../../redux/actions/ScheduleSettings/levelActions';
import AddandEditAppointmentPay from './AddandEditAppointmentPay';
import CustomDialog from '../../../../../../shared/Overlays/CustomDialog';
import { addEmployeeClasses, getEmployeeClasses } from '../../../../../../redux/actions/EmployeeSettings/classesAction';
import { getEmployees } from '../../../../../../redux/actions/EmployeeSettings/employeesAction';
import PrimaryButton from '../../../../../../shared/Button/CustomButton';

const PaySetup = () => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [employeeAppartId, setEmployeeAppartId] = useState(null);
    const [openSimilar, setOpenSimilarTo] = useState(false);
    const [loading, setLoading] = useState(false);

    const { id } = useParams();
    const [data, setData] = useState({
        isDefaultPay: '',
        isAppointmentLevel: '',
    });

    const [data1, setData1] = useState({
        employee: '',
    });
    const handleSave = () => {
        if (showFormErrors(data1, setData1)) {
            dispatch(
                addEmployeeAppointmentPay(
                    { type: 'PAY', employeeAppointmentData: data1?.employee?.employeeAppointmentData, similarTo: data1?.employee?.id, employee: id },
                    setLoading,
                    () => {
                        dispatch(getEmployeeAppointmentPay(id, 'PAY'));
                        setOpenSimilarTo(false);
                    },
                ),
            );
            setData1({
                employee: '',
            });
        }
    };
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
    useEffect(() => {
        dispatch(getEmployees());
    }, [dispatch]);

    let { allEmployees } = useSelector((state) => state.employees);
    allEmployees = allEmployees?.filter((item) => item._id !== id);
    const handleInputChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data1);
        setData1((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    console.log('data1>>', data1);

    return (
        <>
            <CustomFilterCard buttonTitle="Add" onClick={() => setVisible(true)} extraClass="align-items-end">
                <div className=" flex justify-content-between align-items-end">
                    <CustomDropDown
                        extraClassName="w-18rem"
                        name="isAppointmentLevel"
                        label="Appointment Level"
                        options={levelDropdown}
                        optionLabel="name"
                        data={data}
                        onChange={handleChange}
                    />
                    <PrimaryButton name="Similar To" className="w-12rem" label="Similar To" onClick={() => setOpenSimilarTo(true)} />
                </div>
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
            <CustomDialog title={'Similar To'} visible={openSimilar} onCancel={() => setOpenSimilarTo(false)} loading={loading} onSave={handleSave}>
                <CustomGridLayout>
                    <CustomDropDown
                        name="employee"
                        col={12}
                        data={data1}
                        onChange={handleInputChange}
                        options={allEmployees?.map((item) => ({
                            name: `${item.firstName} ${item.middleInitial} ${item.lastName}`,
                            value: { id: item._id, employeeAppointmentData: item.employeeAppointmentData?.filter((item) => item.type === 'PAY') },
                        }))}
                    />
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default PaySetup;
