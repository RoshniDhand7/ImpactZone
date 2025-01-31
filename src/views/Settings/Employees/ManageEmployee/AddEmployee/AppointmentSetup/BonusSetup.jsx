import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFilterCard, CustomGridLayout } from '../../../../../../shared/Cards/CustomCard';
import CustomDialog from '../../../../../../shared/Overlays/CustomDialog';
import { CustomDropDown, CustomInputNumber, CustomMultiselect } from '../../../../../../shared/Input/AllInputs';
import { amountTypeOptions, bonusTypeConstantsOptions, durationOptions } from '../../../../../../utils/dropdownConstants';
import {
    addEmployeeBonus,
    deleteEmployeeBonus,
    editEmployeeBonus,
    getEmployeeAppointmentPay,
    getEmployeeBonus,
} from '../../../../../../redux/actions/EmployeeSettings/appointmentAction';
import { useParams } from 'react-router-dom';
import CustomTable from '../../../../../../shared/Table/CustomTable';
import formValidation from '../../../../../../utils/validations';
import { confirmDelete, showFormErrors } from '../../../../../../utils/commonFunctions';
import { getEmployeeSalesItem } from '../../../../../../redux/actions/EmployeeSettings/salesCommssionAction';
import { getEvents } from '../../../../../../redux/actions/Settings/ScheduleSetup/eventsActions';
import PrimaryButton from '../../../../../../shared/Button/CustomButton';
import { getCatalogItems } from '../../../../../../redux/actions/Settings/InventorySetup/catalogItemsAction';
import { getEmployeesFilterType } from '../../../../../../redux/actions/Settings/Employee/employeesAction';

const BonusSetup = ({ type }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [openSimilar, setOpenSimilarTo] = useState(false);

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
    const [data1, setData1] = useState({
        employee: '',
    });
    useEffect(() => {
        dispatch(getEmployeesFilterType(type === 'appointment' ? 'appointment' : 'salesCommission'));
    }, [dispatch, type]);

    let { allEmployeesFilter } = useSelector((state) => state.settings.employee);

    allEmployeesFilter = allEmployeesFilter?.filter((item) => item._id !== id);
    const handleInputChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data1);
        setData1((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    useEffect(() => {
        dispatch(getCatalogItems());
        dispatch(getEvents());
    }, [dispatch]);

    const { catalogServiceDropdown } = useSelector((state) => state.catalogItems);
    let { isAppointmentLevel } = useSelector((state) => state?.employees);
    const { events } = useSelector((state) => state.settings.schedule);

    const filteredEvents = events
        ?.filter((item) => item?.eventLevel?.includes(isAppointmentLevel) && item.eventType === 'Appointments')
        ?.map((item) => ({ name: item.name, value: item._id }));

    useEffect(() => {
        funcGetEmpAppointment(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const funcGetEmpAppointment = (id) => {
        if (type === 'appointment') {
            dispatch(getEmployeeAppointmentPay(id, 'BONUS', setLoading));
        } else {
            dispatch(
                getEmployeeSalesItem(id, 'BONUS', setLoading, (data) => {
                    setAppointmentData(data);
                }),
            );
        }
    };
    let { allAppointmentPay } = useSelector((state) => state?.employees);

    useEffect(() => {
        if (employeeAppartBonusId) {
            dispatch(
                getEmployeeBonus(type, employeeAppartBonusId, (data) => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const handleSaveSimilar = () => {
        if (showFormErrors(data1, setData1)) {
            dispatch(
                addEmployeeBonus(
                    type,
                    {
                        ...(type === 'appointment'
                            ? { employeeBonusData: data1?.employee?.employeeAppointmentData }
                            : { employeeSalesCommissionData: data1?.employee?.employeeSalesCommissionData, type: 'bonus' }),
                        similarTo: data1?.employee?.id,
                        employee: id,
                    },
                    setLoading,
                    () => {
                        funcGetEmpAppointment(id);
                        setOpenSimilarTo(false);
                    },
                ),
            );

            setData1({
                employee: '',
            });
        }
    };

    const handleSave = () => {
        let ignore = [];
        if (data?.bonusType === 'SINGLE_CLIENT') {
            ignore = ['sessionsValue'];
        } else {
            ignore = ['ofSessions'];
        }
        if (showFormErrors(data, setData, ignore)) {
            const { over, duration, ...rest } = data;
            if (employeeAppartBonusId) {
                dispatch(
                    editEmployeeBonus(
                        type,
                        employeeAppartBonusId,
                        {
                            ...rest,
                            selectTimeframe: {
                                over,
                                duration,
                            },
                        },
                        setLoading,
                        () => {
                            funcGetEmpAppointment(id);
                            onClose();
                        },
                    ),
                );
            } else {
                dispatch(
                    addEmployeeBonus(
                        type,
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
        }
    };

    const onDelete = (col) => {
        confirmDelete(() => {
            dispatch(
                deleteEmployeeBonus(type, col._id, () => {
                    funcGetEmpAppointment(id);
                    onClose();
                }),
            );
        }, 'Do you want to delete this Bonus?');
    };
    const columns = [
        { field: 'bonusType', body: (r) => (r.bonusType === 'SERVICE_VALUE' ? 'Service Value' : 'Single Client'), header: 'Bonus Type' },
        { field: 'Session', body: (r) => (r.bonusType === 'SERVICE_VALUE' ? r.sessionsValue : r.ofSessions), header: 'Value' },
        { field: 'selectTimeframe.over', body: (r) => r.selectTimeframe.over + ' ' + r.selectTimeframe.duration.toLowerCase(), header: 'Time Frame' },
        { field: 'bonusAmount', body: (r) => (r.amountType === 'FIXED' ? '$' + r.bonusAmount : r.bonusAmount + '%'), header: 'Bonus Amount' },

        { field: 'services', body: (r) => r.services?.map((item) => item.name)?.join(','), header: 'Services' },
    ];
    return (
        <>
            <CustomFilterCard buttonTitle="Add" onClick={() => setVisible(true)}>
                <div className=" flex justify-content-between align-items-end">
                    <PrimaryButton name="Similar To" className="w-12rem" label="Similar To" onClick={() => setOpenSimilarTo(true)} />
                </div>
            </CustomFilterCard>
            <CustomTable data={type === 'appointment' ? allAppointmentPay?.list : appointmentData} columns={columns} onEdit={onEdit} onDelete={onDelete} />

            <CustomDialog
                title={employeeAppartBonusId ? 'Edit' : 'Add'}
                visible={visible}
                onCancel={onClose}
                loading={loading}
                onSave={handleSave}
                width="90vh"
            >
                <CustomGridLayout>
                    <CustomDropDown label="" name="bonusType" data={data} onChange={handleChange} options={bonusTypeConstantsOptions} col={6} />
                    {data?.bonusType === 'SINGLE_CLIENT' ? (
                        <CustomInputNumber col={6} label="No of Sessions" name="ofSessions" data={data} onChange={handleChange} />
                    ) : (
                        <CustomInputNumber col={6} name="sessionsValue" data={data} onChange={handleChange} minFractionDigits={4} maxFractionDigits={4} />
                    )}
                    <CustomInputNumber col="6" name="over" data={data} onChange={handleChange} />
                    <CustomDropDown label="" name="duration" data={data} onChange={handleChange} col={6} options={durationOptions} />
                    <CustomInputNumber col={8} name="bonusAmount" data={data} onChange={handleChange} minFractionDigits={4} maxFractionDigits={4} />
                    <CustomDropDown label="" name="amountType" options={amountTypeOptions} data={data} onChange={handleChange} col={4} />
                    <CustomMultiselect
                        col="12"
                        name="services"
                        data={data}
                        onChange={handleChange}
                        options={type === 'appointment' ? filteredEvents : catalogServiceDropdown}
                    />
                </CustomGridLayout>
            </CustomDialog>
            <CustomDialog title={'Similar To'} visible={openSimilar} onCancel={() => setOpenSimilarTo(false)} loading={loading} onSave={handleSaveSimilar}>
                <CustomGridLayout>
                    <CustomDropDown
                        name="employee"
                        col={12}
                        data={data1}
                        onChange={handleInputChange}
                        options={allEmployeesFilter?.map((item) => ({
                            name: `${item.firstName} ${item.middleInitial} ${item.lastName}`,
                            value:
                                type === 'appointment'
                                    ? { id: item._id, employeeAppointmentData: item.employeeAppointmentData?.filter((item) => item.type === 'BONUS') }
                                    : { id: item._id, employeeSalesCommissionData: item.employeeSalesCommissionData?.filter((item) => item.type === 'BONUS') },
                        }))}
                    />
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default BonusSetup;
