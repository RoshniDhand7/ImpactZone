import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CustomFilterCard, CustomGridLayout } from '../../../../../../shared/Cards/CustomCard';
import CustomDialog from '../../../../../../shared/Overlays/CustomDialog';
import { CustomDropDown, CustomInput, CustomInputNumber, CustomMultiselect } from '../../../../../../shared/Input/AllInputs';
import { amountTypeOptions, bonusTypeConstantsOptions, durationOptions, servicesOptions } from '../../../../../../utils/dropdownConstants';
import {
    addEmployeeAppartmentBonus,
    getEmployeeAppartmentBonus,
    getEmployeeAppointmentPay,
} from '../../../../../../redux/actions/EmployeeSettings/appointmentAction';
import { useParams } from 'react-router-dom';
import CustomTable from '../../../../../../shared/Table/CustomTable';

const BonusSetup = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const initialState = {
        bonusType: 'SERVICE_VALUE', //SINGLE_CLIENT,SERVICE_VALUE
        sessionsValue: 0,
        ofSessions: 0, //sessionsValue,ofSessions
        over: 0,
        duration: 'DAYS',
        bonusAmount: 0,
        type: 'BONUS',
        amountType: 'FIXED',
        services: [],
    };
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [employeeAppartBonusId, setemployeeAppartBonusId] = useState(null);
    const [appointmentData, setAppointmentData] = useState([]);

    const [data, setData] = useState(initialState);

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        funcGetEmpAppointment(id);
    }, []);
    const funcGetEmpAppointment = (id) => {
        dispatch(
            getEmployeeAppointmentPay(id, 'BONUS', setLoading, (data) => {
                setAppointmentData(data);
            }),
        );
    };

    useEffect(() => {
        console.log(employeeAppartBonusId);
        if (employeeAppartBonusId) {
            dispatch(
                getEmployeeAppartmentBonus(employeeAppartBonusId, (data) => {
                    setData({
                        bonusType: data.bonusType,
                        sessionsValue: data.sessionsValue,
                        ofSessions: data.ofSessions,
                        over: data.selectTimeframe.over,
                        duration: data.selectTimeframe.duration,
                        bonusAmount: data.bonusAmount,
                        type: 'BONUS',
                        amountType: data.amountType,
                        services: data.services,
                    });
                }),
            );
        }
    }, [employeeAppartBonusId, dispatch]);

    const onClose = () => {
        setemployeeAppartBonusId(null);
        setData(initialState);
        setVisible(false);
    };

    const onEdit = (col) => {
        setemployeeAppartBonusId(col?._id);
        setVisible(true);
    };

    const handleSave = () => {
        const { over, duration, ...rest } = data;
        if (employeeAppartBonusId) {
            // dispatch(
            //     editEmployeeAppointmentPay(employeeAppartBonusId, { ...data }, setLoading, () => {
            //         funcGetEmpAppointment(id);
            //         onClose();
            //     }),
            // );
        } else {
            dispatch(
                addEmployeeAppartmentBonus(
                    {
                        ...rest,
                        selectTimeframe: {
                            over,
                            duration,
                        },
                        employee: id,
                    },
                    setLoading,
                    () => {
                        funcGetEmpAppointment(id);
                        onClose();
                    },
                ),
            );
        }
    };

    const onDelete = () => {};
    const columns = [
        { field: 'bonusType', header: 'Bonus Type' },
        { field: 'services', body: (r) => r.services.join(','), header: 'Services' },
    ];
    return (
        <>
            <CustomFilterCard buttonTitle="Add" onClick={() => setVisible(true)} />
            <CustomTable data={appointmentData} columns={columns} onEdit={onEdit} onDelete={onDelete} />

            <CustomDialog title={employeeAppartBonusId ? 'Edit' : 'Add'} visible={visible} onCancel={onClose} loading={loading} onSave={handleSave}>
                <CustomGridLayout>
                    <CustomDropDown label="" name="bonusType" data={data} onChange={handleChange} options={bonusTypeConstantsOptions} col={6} />
                    {data?.bonusType === 'SINGLE_CLIENT' ? (
                        <CustomInputNumber col={6} name="ofSessions" data={data} onChange={handleChange} />
                    ) : (
                        <CustomInputNumber col={6} name="sessionsValue" data={data} onChange={handleChange} />
                    )}
                    <CustomInput col="6" name="over" data={data} onChange={handleChange} />
                    <CustomDropDown label="" name="duration" data={data} onChange={handleChange} col={6} options={durationOptions} />
                    <CustomInputNumber col={8} name="bonusAmount" data={data} onChange={handleChange} />
                    <CustomDropDown label="" name="amountType" options={amountTypeOptions} data={data} onChange={handleChange} col={4} />
                    <CustomMultiselect col="12" name="services" data={data} onChange={handleChange} options={servicesOptions} />
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default BonusSetup;
