import React, { useEffect, useMemo, useState } from 'react';
import FormPage from '../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../shared/Cards/CustomCard';
import { CustomButton } from '../../shared/Button/CustomButton';
import { CustomAsyncReactSelect, CustomCalenderInput, CustomDropDown, CustomInput, CustomTextArea } from '../../shared/Input/AllInputs';
import useEmployees from '../../hooks/Employees/useEmployees';
import { eventStatusOptions, generateSequence } from '../../utils/dropdownConstants';
import CustomTable from '../../shared/Table/CustomTable';
import AddMember from './AddMember';
import { getCalendarBooking } from '../../redux/actions/Calendar/CalendarAction';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { convertToDateTime } from '../../utils/commonFunctions';
import formValidation from '../../utils/validations';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const ManageEvents = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(getCalendarBooking(id));
        }
    }, [id]);

    const { calendarEvent } = useSelector((state) => state.calendar);

    useEffect(() => {
        if (calendarEvent) {
            setData({
                employee: calendarEvent.staff,
                date: new Date(calendarEvent.createdAt),
                time: calendarEvent.startTime ? convertToDateTime(calendarEvent.startTime) : null,
                duration: calendarEvent.duration,
                member: calendarEvent.member,
                event: calendarEvent.event,
            });
        }
    }, [calendarEvent]);

    const { employees } = useEmployees();
    const suggestions = useMemo(
        () =>
            employees.map((item) => ({
                value: item._id,
                name: `${item.firstName} ${item.middleInitial} ${item.lastName}`,
            })),
        [employees],
    );
    const employeeOptions = useMemo(
        () => employees?.map((item) => ({ name: `${item.firstName} ${item.middleInitial} ${item.lastName}`, value: item?._id })),
        [employees],
    );
    const durationOptions = generateSequence();
    const [data, setData] = useState({
        employee: '',
        date: '',
        time: '',
        duration: '',
        enrollment: `5/30`,
        member: [],
        services: [],
        employeelevelService: [],
    });

    useEffect(() => {
        if (data.employee) {
            let employee = employees.find((item) => item._id === data?.employee);
            let level = employee?.isClassLevel[0];
            console.log(level, data.event, 'level22');
            let eventService = data.event?.eventService?.find((item) => item.eventLevel == level);
            eventService = eventService?.services;
            if (eventService?.length > 0) {
                setData((prev) => ({ ...prev, employeelevelService: eventService ? eventService : [] }));
            }
            console.log(eventService, 'eventService');
        }
    }, [data.employee]);

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    const handleChangeDynamicFields = (rowData, index, event) => {
        const { name, value } = event.target;
        console.log(rowData, index, name, value, 'val');

        const updatedService = { ...rowData.service };

        const customIndex = index.rowIndex;

        updatedService[customIndex] = {
            ...updatedService[customIndex],
            [name]: value,
        };

        console.log(updatedService, '_updatedService');

        setData((prevData) => ({
            ...prevData,
            service: updatedService,
        }));
    };

    const CustomServiceTemplate = (r, index) => {
        console.log(r, 'index');
        const idsToMatch = data?.employeelevelService?.map((item) => item._id);
        const filteredServices = r?.services?.filter((item) => idsToMatch?.includes(item._id));
        console.log(filteredServices, 'filteredServices');
        // r?.services?.filter((item)=>item._id===)
        return (
            <CustomDropDown
                name="service"
                value={r?._id}
                onChange={(val) => handleChangeDynamicFields(r, index, val)}
                options={filteredServices?.map((item) => ({ name: item.name, value: item._id }))}
                fieldName="services"
                customIndex={index.rowIndex}
            />
        );
    };

    const [openMemberList, setOpenMemberList] = useState(false);

    console.log(data, 'data');

    return (
        <FormPage backText="Calendar">
            <div className="member-container bg-lightest-blue  border-round-xl shadow-3  flex justify-content-start p-2 mb-2 mx-2">
                <CustomButton className="ml-3">Remove Event</CustomButton>
                <CustomButton
                    className="ml-3"
                    onClick={() => {
                        setOpenMemberList(true);
                    }}
                >
                    Add Member
                </CustomButton>

                <CustomButton className="ml-3">Repeat Event</CustomButton>
                <AddMember openMemberList={openMemberList} setOpenMemberList={setOpenMemberList} />
            </div>
            <CustomCard col="12" title="Event Details">
                <CustomGridLayout>
                    <div className="col-4 p-1">
                        <label>Employee</label>
                        <CustomAsyncReactSelect
                            name="employee"
                            suggestions={suggestions}
                            options={employeeOptions}
                            placeholder="Search Employee"
                            showLabel={false}
                            value={data.employee}
                            onChange={handleChange}
                            col={12}
                        />
                    </div>

                    <CustomCalenderInput name="date" onChange={handleChange} data={data} col={4} />
                    <CustomCalenderInput name="time" onChange={handleChange} data={data} col={4} timeOnly hourformat={12} />
                    <CustomDropDown name="duration" options={durationOptions} onChange={handleChange} data={data} col={4} />
                    <CustomInput name="enrollment" data={data} disabled />
                    <CustomDropDown name="status" options={eventStatusOptions} onChange={handleChange} data={data} col={4} />
                    <CustomTextArea name="statusReason" data={data} />
                </CustomGridLayout>
            </CustomCard>
            <h2 className="text-semibold text-2xl ml-2 mt-2">Manage Event</h2>
            <DataTable value={data?.member} scrollable scrollHeight="400px" tableStyle={{ minWidth: '50rem' }}>
                <Column field="firstName" body={(r) => r?.firstName + '' + r?.lastName} header="Member" className="bg-light-green font-bold" />
                <Column className="bg-light-green font-bold" header="Service" body={(rowData, index) => CustomServiceTemplate(rowData, index)} />
                <Column header="Verified" className="bg-light-green font-bold" />
            </DataTable>
        </FormPage>
    );
};

export default ManageEvents;
