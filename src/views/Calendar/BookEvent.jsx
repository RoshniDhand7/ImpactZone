import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomDialog from '../../shared/Overlays/CustomDialog';
import { CustomGridLayout } from '../../shared/Cards/CustomCard';
import { CustomAsyncReactSelect, CustomCalenderInput, CustomDropDown } from '../../shared/Input/AllInputs';
import useEmployees from '../../hooks/Employees/useEmployees';
import useMembers from '../../hooks/Members/useMembers';

const BookEvent = ({ openBookEvent, setOpenBookEvent }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        employee: '',
        location: '',
        resources: '',
    });
    const { employeesDropdown } = useEmployees();

    const { calendarLocationDropdown, calendarEvents, calendarResourcesDropdown } = useSelector((state) => state.calendar);

    const onSubmit = () => {};
    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const onClose = () => {};
    const { members } = useMembers();

    const suggestions = useMemo(
        () =>
            members.map((item) => ({
                value: item._id,
                name: `${item.firstName} ${item.MI} ${item.lastName}`,
            })),
        [members],
    );

    const memberOptions = useMemo(() => members?.map((item) => ({ name: `${item.firstName} ${item.MI} ${item.lastName}`, value: item?._id })), [members]);

    return (
        <CustomDialog title="Member Details" visible={openBookEvent} onCancel={onClose} onApply={onSubmit} saveLabel="Book">
            <CustomGridLayout>
                <CustomAsyncReactSelect
                    name="member"
                    suggestions={suggestions}
                    options={memberOptions}
                    placeholder="Search Member"
                    showLabel={false}
                    value={data.member}
                    onChange={handleChange}
                    col={11}
                />
                <CustomCalenderInput name="eventDate" data={data} onChange={handleChange} col={6} />
                <CustomCalenderInput name="eventTime" data={data} onChange={handleChange} col={6} timeOnly />
                <CustomDropDown name="staff" options={employeesDropdown} data={data} onChange={handleChange} col={6} />
                <CustomDropDown name="eventType" data={data} onChange={handleChange} col={6} />
                <CustomDropDown name="event" data={data} onChange={handleChange} col={6} />
                <CustomDropDown name="resoures" options={calendarResourcesDropdown} data={data} onChange={handleChange} col={6} />
            </CustomGridLayout>
        </CustomDialog>
    );
};
export default BookEvent;
