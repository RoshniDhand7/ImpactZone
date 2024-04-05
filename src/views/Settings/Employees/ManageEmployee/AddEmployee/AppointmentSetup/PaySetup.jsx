import React, { useState, useEffect } from 'react';
import { CustomFilterCard, CustomGridLayout } from '../../../../../../shared/Cards/CustomCard';
import CustomDialog from '../../../../../../shared/Overlays/CustomDialog';
import { useParams } from 'react-router-dom';
import { CustomDropDown, CustomInputNumber } from '../../../../../../shared/Input/AllInputs';
import { useDispatch, useSelector } from 'react-redux';
import {
    deletetEmployeeAppartment,
    getEmployeeAppointmentPay,
    isDefaultAppointmentPay,
    updateEmployeeAppointmentPayLevel,
} from '../../../../../../redux/actions/EmployeeSettings/appointmentAction';
import CustomTable from '../../../../../../shared/Table/CustomTable';
import { confirmDelete } from '../../../../../../utils/commonFunctions';
import formValidation from '../../../../../../utils/validations';
import { getLevels } from '../../../../../../redux/actions/ScheduleSettings/levelActions';
import PrimaryButton from '../../../../../../shared/Button/CustomButton';
import AddandEditAppointmentPay from './AddandEditAppointmentPay';

const PaySetup = () => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [employeeAppartId, setEmployeeAppartId] = useState(null);

    const [defaultPay, setDefaultPay] = useState(false);

    const { id } = useParams();
    const [data, setData] = useState({
        isDefaultPay: '',
        isClassLevel: '',
    });
    let { allAppointmentPay } = useSelector((state) => state?.employees);
    useEffect(() => {
        funcGetEmpAppointment();
    }, []);
    const funcGetEmpAppointment = () => {
        dispatch(getEmployeeAppointmentPay(id, 'PAY'));
    };
    useEffect(() => {
        dispatch(getLevels());
    }, [dispatch]);
    useEffect(() => {
        if (allAppointmentPay) {
            setData((prev) => ({ ...prev, isClassLevel: allAppointmentPay?.isClassLevel }));
        }
    }, [allAppointmentPay]);

    const { levelDropdown } = useSelector((state) => state.level);

    const onClose = () => {
        setData((prev) => ({ ...prev, isDefaultPay: '' }));
        setDefaultPay(false);
    };

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);

        if (name === 'isClassLevel') {
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
        { field: 'name', header: 'Name' },
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

    const handleSave = () => {
        allAppointmentPay = allAppointmentPay?.list?.map((item) => ({
            ...item,
            pay: data?.isDefaultPay,
        }));

        dispatch(
            isDefaultAppointmentPay({ pay: data.isDefaultPay }, () => {
                funcGetEmpAppointment();
                onClose();
            }),
        );
    };

    return (
        <>
            <CustomFilterCard buttonTitle="Add" onClick={() => setVisible(true)} extraClass="align-items-end">
                <div className="flex align-items-end">
                    <CustomDropDown name="isClassLevel" col={6} options={levelDropdown} optionLabel="name" data={data} onChange={handleChange} />
                    <PrimaryButton name="" className="w-12rem" label="Default Pay" onClick={() => setDefaultPay(true)} />
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
            <CustomDialog title="Default Pay" visible={defaultPay} onCancel={onClose} loading={loading} onSave={handleSave}>
                <CustomGridLayout>
                    <CustomInputNumber col="12" name="isDefaultPay" label="Default" data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default PaySetup;
