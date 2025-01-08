import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomDialog from '../../shared/Overlays/CustomDialog';
import { CustomGridLayout } from '../../shared/Cards/CustomCard';
import { CustomAsyncReactSelect, CustomCalenderInput, CustomDropDown } from '../../shared/Input/AllInputs';
import useEmployees from '../../hooks/Employees/useEmployees';
import useMembers from '../../hooks/Members/useMembers';
import { getDefaultImage, getImageURL } from '../../utils/imageUrl';
import { getMemberData } from '../../redux/actions/MembersPortal/memberPortalActions';
import { EventTypeOptions } from '../../utils/dropdownConstants';
import { calendarBooking } from '../../redux/actions/Calendar/CalendarAction';
import formValidation from '../../utils/validations';
import { showFormErrors } from '../../utils/commonFunctions';

const BookEvent = ({ openBookEvent, setOpenBookEvent }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const initialState = {
        member: '',
        eventDate: new Date(),
        eventTime: new Date(),
        staff: '',
        eventType: '',
        event: '',
        resources: '',
    };
    const [data, setData] = useState(initialState);
    const { employeesDropdown } = useEmployees();

    const { calendarResourcesDropdown, calendarEventsDropdown } = useSelector((state) => state.calendar);

    const onSubmit = () => {
        if (showFormErrors(data, setData)) {
            dispatch(
                calendarBooking(data, setLoading, () => {
                    setOpenBookEvent(false);
                    onClose();
                }),
            );
        }
    };
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const onClose = () => {
        setOpenBookEvent(false);
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

    console.log('data', data);

    return (
        <CustomDialog loading={loading} title="Member Details" visible={openBookEvent} onCancel={onClose} onSave={onSubmit} saveLabel="Book">
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
                <div className="text-sm p-error ">{data?.formErrors?.member}</div>
                {data?.member && (
                    <div className="member-container mt-3 ml-2 border-round-xl shadow-2  flex justify-content-between p-2 mb-2">
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
                                    <p className=" text-2xl font-semibold ">
                                        {memberData && memberData?.firstName + ' ' + memberData?.MI + ' ' + memberData?.lastName}
                                    </p>
                                    <p className=" font-semibold mt-2">Barcode: {memberData && memberData?.barCode}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <CustomCalenderInput name="eventDate" data={data} onChange={handleChange} col={12} minDate={new Date()} />
                <CustomCalenderInput name="eventTime" data={data} onChange={handleChange} col={12} timeOnly hourFormat="12" />
                <CustomDropDown name="staff" options={employeesDropdown} data={data} onChange={handleChange} col={12} />
                <CustomDropDown name="eventType" data={data} options={EventTypeOptions} onChange={handleChange} col={12} />
                <CustomDropDown name="event" data={data} options={calendarEventsDropdown} onChange={handleChange} col={12} />
                <CustomDropDown name="resources" options={calendarResourcesDropdown} data={data} onChange={handleChange} col={12} />
            </CustomGridLayout>
        </CustomDialog>
    );
};
export default BookEvent;
