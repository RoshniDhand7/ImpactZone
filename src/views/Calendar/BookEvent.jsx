import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomGridLayout } from '../../shared/Cards/CustomCard';
import { CustomAsyncReactSelect, CustomCalenderInput, CustomDropDown } from '../../shared/Input/AllInputs';
import useEmployees from '../../hooks/Employees/useEmployees';
import useMembers from '../../hooks/Members/useMembers';
import { getDefaultImage, getImageURL } from '../../utils/imageUrl';
import { getMemberData } from '../../redux/actions/MembersPortal/memberPortalActions';
import { EventTypeOptions } from '../../utils/dropdownConstants';
import { calendarBooking, getAllCalendarBooking } from '../../redux/actions/Calendar/CalendarAction';
import formValidation from '../../utils/validations';
import { getTime, showFormErrors, updateEndTime } from '../../utils/commonFunctions';
import moment from 'moment';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../shared/Button/CustomButton';

const BookEvent = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const initialState = {
        member: '',
        eventDate: new Date(),
        staff: '',
        eventType: '',
        event: '',
        resources: '',
        startTime: '',
        endTime: '',
        duration: '',
    };
    const [data, setData] = useState(initialState);
    const { employeesDropdown } = useEmployees();

    const { calendarResourcesDropdown, calendarEventsDropdown } = useSelector((state) => state.calendar);
    let { events } = useSelector((state) => state.calendar);

    const onSubmit = () => {
        if (showFormErrors(data, setData, ['endTime'])) {
            dispatch(
                calendarBooking(
                    {
                        ...data,
                        eventDate: moment(data.eventDate).format('YYYY-MM-DD'),
                        startTime: getTime(data.startTime),
                        endTime: getTime(data.endTime),
                    },
                    setLoading,
                    () => {
                        // setOpenBookEvent(false);
                        onClose();
                        dispatch(getAllCalendarBooking());
                    },
                ),
            );
        }
    };

    const handleChange = ({ name, value }) => {
        setData((prev) => {
            const updatedData = { ...prev, [name]: value };
            const formErrors = formValidation(name, value, updatedData);

            if (name === 'duration') {
                updatedData.endTime = updateEndTime(updatedData.startTime, value);
                updatedData.duration = value || null;
            } else if (name === 'startTime') {
                updatedData.endTime = updateEndTime(value, updatedData.duration);
                updatedData.startTime = value || null;
            } else if (name === 'event') {
                updatedData.event = value;
                updatedData.duration = '';
            }

            return { ...updatedData, formErrors };
        });
    };

    const onClose = () => {
        // setOpenBookEvent(false);
        setData(initialState);
    };
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
    useEffect(() => {
        if (data?.member) {
            dispatch(getMemberData(data?.member, 'dashboard'));
        }
    }, [dispatch, data?.member]);

    const memberData = useSelector((state) => state.membersPortal.dashboard);
    events = events?.find((item) => item._id === data?.event);

    const durationOptions = events?.duration?.map((item) => ({ name: `${item} minutes`, value: item }));

    console.log('Booked>>', data?.event, events, data);

    return (
        <>
            <CustomGridLayout>
                <CustomAsyncReactSelect
                    name="member"
                    suggestions={suggestions}
                    options={memberOptions}
                    placeholder="Search Member"
                    showLabel={false}
                    value={data.member}
                    onChange={handleChange}
                    col={12}
                />
                <div className="text-sm p-error ">{data?.formErrors?.member}</div>
                {data?.member && (
                    <div className=" my-2 mx-2 border-round-xl shadow-2  flex justify-content-between p-1 w-full">
                        <div className="flex w-full justify-content-between">
                            <div className="flex gap-5">
                                <div className="avatar-img1">
                                    <img
                                        className="fit-cover rounded-full border-white border-2"
                                        src={getImageURL(memberData?.image)}
                                        onError={(e) => (e.target.src = getDefaultImage())}
                                        alt=""
                                    />
                                </div>

                                <div className="flex flex-column justify-center">
                                    <p className=" text-2xl font-medium ">
                                        {memberData && memberData?.firstName + ' ' + memberData?.MI + ' ' + memberData?.lastName}
                                    </p>
                                    <p className=" font-medium mt-2">Barcode: {memberData && memberData?.barCode}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </CustomGridLayout>
            <CustomGridLayout>
                <CustomCalenderInput name="eventDate" data={data} onChange={handleChange} col={12} minDate={new Date()} />
                <CustomDropDown name="eventType" data={data} options={EventTypeOptions} onChange={handleChange} col={12} />
                <CustomDropDown name="event" data={data} options={calendarEventsDropdown} onChange={handleChange} col={12} />
                <CustomCalenderInput name="startTime" data={data} onChange={handleChange} col={12} timeOnly hourFormat="12" />
                <CustomDropDown name="duration" options={durationOptions} onChange={handleChange} data={data} col={12} />
                <CustomCalenderInput name="endTime" data={data} onChange={handleChange} col={12} timeOnly hourFormat="12" disabled={true} />
                <CustomDropDown name="staff" options={employeesDropdown} data={data} onChange={handleChange} col={12} />
                <CustomDropDown name="resources" options={calendarResourcesDropdown} data={data} onChange={handleChange} col={12} />
            </CustomGridLayout>
            <CustomButtonGroup>
                <PrimaryButton label="Book" className="mx-2" onClick={onSubmit} loading={loading} />
                <LightButton label="Request" />
            </CustomButtonGroup>
        </>
        // <CustomDialog loading={loading} title="Member Details" visible={openBookEvent} onCancel={onClose} onSave={onSubmit} saveLabel="Book" width="60vh">

        // </CustomDialog>
    );
};
export default BookEvent;
