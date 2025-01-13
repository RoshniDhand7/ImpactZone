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
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { convertToDateTime } from '../../utils/commonFunctions';

const ManageEvents = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(
                getCalendarBooking(id, (item) =>
                    setData({ employee: item.staff, date: new Date(item.createdAt), time: convertToDateTime(item.startTime), duration: item.duration }),
                ),
            );
        }
    }, [id]);

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
    });

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const columns = [
        { field: 'event', header: 'Member' },
        { field: 'event', header: 'Service' },
        { field: 'event', header: 'Verified' },
    ];

    const [openMemberList, setOpenMemberList] = useState(false);

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
            <CustomTable data={[]} columns={columns} />
        </FormPage>
    );
};

export default ManageEvents;
