import React, { useState, useEffect } from 'react';
import { CustomFilterCard, CustomGridLayout } from '../../../../../../shared/Cards/CustomCard';
import CustomDialog from '../../../../../../shared/Overlays/CustomDialog';
import { useParams } from 'react-router-dom';
import { CustomDropDown, CustomInputNumber } from '../../../../../../shared/Input/AllInputs';
import { useDispatch, useSelector } from 'react-redux';
import {
    deletetEmployeeAppartment,
    editEmployeeAppointmentPay,
    getEmployeeAppointmentPay,
    isDefaultAppointmentPay,
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
    const [appointmentData, setAppointmentData] = useState([]);

    const [defaultPay, setDefaultPay] = useState(false);

    const { id } = useParams();
    const [data, setData] = useState({
        isDefaultPay: '',
        isClassLevel: '',
    });

    useEffect(() => {
        funcGetEmpAppointment(id);
    }, [data?.isClassLevel]);
    const funcGetEmpAppointment = (id) => {
        dispatch(
            getEmployeeAppointmentPay(id, data?.isClassLevel, 'PAY', setLoading, (data) => {
                setAppointmentData(data);
            }),
        );
    };
    useEffect(() => {
        dispatch(getLevels());
    }, [dispatch]);
    useEffect(() => {
        setData((prev) => ({ ...prev, isClassLevel: appointmentData?.isClassLevel }));
    }, [appointmentData?.isClassLevel]);
    const { levelDropdown } = useSelector((state) => state.level);

    const onClose = () => {
        setData((prev) => ({ ...prev, isDefaultPay: '' }));
        setDefaultPay(false);
    };

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
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
                    funcGetEmpAppointment(id);
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
        setAppointmentData((prevData) => ({
            ...prevData,
            list: prevData.list.map((item) => ({
                ...item,
                pay: data?.isDefaultPay,
            })),
        }));
        dispatch(
            isDefaultAppointmentPay({ pay: data.isDefaultPay }, () => {
                funcGetEmpAppointment(id);
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
            <CustomTable data={appointmentData?.list} columns={columns} onEdit={onEdit} onDelete={onDelete} />
            <AddandEditAppointmentPay funcGetEmpAppointment={funcGetEmpAppointment} id={id} setVisible={setVisible} visible={visible} />
            <CustomDialog title="Default Pay" visible={defaultPay} onCancel={onClose} loading={loading} onSave={handleSave}>
                <CustomGridLayout>
                    <CustomInputNumber col="12" name="isDefaultPay" label="Default" data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default PaySetup;
