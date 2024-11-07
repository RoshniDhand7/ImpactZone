import React, { useEffect, useMemo, useState } from 'react';
import { CustomAsyncReactSelect, CustomInput } from '../../shared/Input/AllInputs';
import formValidation from '../../utils/validations';
import useMembers from '../../hooks/Members/useMembers';
import PrimaryButton, { CustomButton } from '../../shared/Button/CustomButton';
import { Divider } from 'primereact/divider';
import CustomCard, { CustomGridLayout, CustomListItem } from '../../shared/Cards/CustomCard';
import CustomTable from '../../shared/Table/CustomTable';
import { Tag } from 'primereact/tag';
import { Card } from 'primereact/card';
import { useDispatch, useSelector } from 'react-redux';
import { getCheckIn, getCheckInLast, getRecentCheckInHistory } from '../../redux/actions/CheckIn/CheckIn';
import { Avatar } from 'primereact/avatar';
import { getImageURL } from '../../utils/imageUrl';

export default function CheckIn() {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        member: null,
        membershipType: null,
        lastVisit: '',
        barCode: '',
        agreementNo: '',
        notes: '',
        secondarymember: '',
        expiryDate: '',
        pastDue: '',
        fees: '',
        totalPastDue: '',
        totalNextDue: '',
        nextDueDate: '',
    });
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
        dispatch(getCheckIn(value));
    };

    const { allMembers } = useMembers();

    const suggestions = useMemo(
        () =>
            allMembers.map((item) => ({
                value: item._id,
                name: `${item.firstName} ${item.MI} ${item.lastName}`,
            })),
        [allMembers],
    );

    const memberOptions = useMemo(() => allMembers?.map((item) => ({ name: `${item.firstName} ${item.MI} ${item.lastName}`, value: item?._id })), [allMembers]);

    useEffect(() => {
        dispatch(getCheckInLast());
    }, [dispatch]);

    useEffect(() => {}, [data?.member]);

    useEffect(() => {
        dispatch(getRecentCheckInHistory());
    }, []);

    const { getCheckInHistory, getCheckInData } = useSelector((state) => state.checkin);

    useEffect(() => {
        if (Object.keys(getCheckInData)) {
            setData((prev) => ({
                ...prev,
                member: getCheckInData?._id,
                membershipType: getCheckInData?.membershipType,
                lastVisit: null,
                barCode: getCheckInData?.barCode,
                notes: getCheckInData?.note,
            }));
        }
    }, [getCheckInData]);

    console.log(getCheckInData, 'getCheckInData');

    const column1 = [
        { field: 'employee', header: 'Name' },
        { field: 'employee', header: 'Date/Time' },
        { field: 'employee', header: 'Location' },
    ];

    const column2 = [
        { field: '', header: 'Name' },
        { field: '', header: 'Count' },
        { field: '', header: 'Expires' },
    ];
    const column3 = [
        { field: '', header: 'Name' },
        { field: '', header: 'Count' },
        { field: '', header: 'Expires' },
    ];

    const posColumn = [
        {
            field: 'name',
            header: 'Name',
        },
        {
            field: 'finalNetPrice',
            header: 'Price',
        },
    ];

    const checkIns = [
        {
            name: 'Jerry Brown',
            status: 'active',
            time: '10:34 AM',
            profileImage: 'path-to-image1.jpg',
        },
        {
            name: 'Merry',
            status: 'canceled',
            reason: 'Membership Cancelled',
            time: '10:34 AM',
            profileImage: 'path-to-image2.jpg',
        },
        // ...additional check-in data
    ];

    const statusColors = {
        active: 'green-500',
        canceled: 'red-500',
        pending: 'yellow-500',
    };

    const CheckInCard = ({ checkIn }) => {
        const borderColor = statusColors[checkIn.status] || 'gray-500';

        return (
            <Card className={`p-3 border-2 border-${borderColor} border-round shadow-2`}>
                <div className="flex align-items-center gap-3">
                    <Avatar image={getImageURL(checkIn.image)} shape="circle" size="large" />
                    <div>
                        <h4 className="m-0">{checkIn.member}</h4>
                        <p className="text-sm m-0 text-gray-600">{checkIn.time}</p>
                        <p className="text-sm m-0 text-gray-500">{checkIn.reason || 'Impact1'}</p>
                        {checkIn.status === 'canceled' && <Tag severity="danger" icon="pi pi-exclamation-triangle" value="Canceled" className="mt-2" />}
                    </div>
                </div>
            </Card>
        );
    };

    const RecentCheckIns = () => {
        return (
            <div className="p-4">
                <h3 className="mb-3">Recent Check-Ins</h3>
                <div className="flex align-items-center gap-6 mb-4">
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <CustomInput name="barCode" placeholder="Search by barcode/member" col={12} />
                    </span>
                    <PrimaryButton icon="pi pi-filter" label="Filter" className="p-button-outlined mt-5" />
                    <CustomInput name="search" placeholder="Search by filter" />
                    <PrimaryButton label="More" className="p-button-text mt-6" />
                </div>
                <div className="flex gap-3 overflow-x-auto">
                    {getCheckInHistory?.slice(0, 10).map((checkIn, index) => (
                        <CheckInCard key={index} checkIn={checkIn} />
                    ))}
                </div>
            </div>
        );
    };

    console.log(data, 'data');

    return (
        <>
            <div className="col-12 mt-3">
                <label className="font-bold ml-1 mb-3">
                    Member Search
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
                </label>
            </div>

            {data?.member && (
                <div className="member-container mx-2 p-3 border-round-xl shadow-2 bg-green flex gap-5 my-3 align-items-center">
                    <div className="avatar-img">
                        <img
                            className="fit-cover rounded-full border-white border-2"
                            src={getImageURL(getCheckInData?.image) || 'default-avatar-url.jpg'}
                            onError={(e) => (e.target.src = 'default-avatar-url.jpg')}
                            alt=""
                        />
                    </div>

                    <div className="flex flex-column justify-center">
                        <p className="text-white text-2xl font-medium">
                            {getCheckInData?.firstName + ' ' + getCheckInData?.MI + ' ' + getCheckInData?.lastName}
                        </p>
                        <p className="text-white font-medium mt-2">Barcode: {getCheckInData?.barCode}</p>
                        <p className="text-white font-medium">{getCheckInData?.isActive ? 'Active' : 'InActive'}</p>
                        <p className="text-white">{data?.membershipType || 'All Access'}</p>
                    </div>

                    <div className="mb-0">
                        <CustomButton label="Add Task" icon="pi pi-plus" className="p-button-text text-white" />
                    </div>

                    <Divider layout="vertical" className="mx-4" />

                    <div className="alerts-container flex-1">
                        <div className="flex justify-content-between align-items-center">
                            <p className="text-white text-2xl font-medium">Alerts</p>
                            <CustomButton label="Add Alert" icon="pi pi-plus" className="p-button-text text-white" />
                        </div>
                        <div className="alert-list mt-2 ml-4">
                            <p className="text-white text-sm">Membership expires at 15/1/2022</p>
                            <p className="text-white text-sm">Membership expires at 15/1/2022</p>
                            <p className="text-white text-sm">Membership expires at 15/1/2022</p>
                        </div>
                    </div>
                </div>
            )}

            <CustomGridLayout>
                <div className="col-12 md:col-3">
                    {/* Events Section */}

                    <div className="flex align-items-center gap-8">
                        <h3 className="font-semibold text-lg m-0">Events</h3>
                        <label className="m-0 text-secondary">Calendar</label>
                        <label className="m-0 text-secondary">Quick Enroll</label>
                    </div>
                    <CustomTable data={[]} columns={column1} minWidth="0rem" paginator={false} />

                    {/* Services Section */}
                    <div className="flex align-items-center gap-8">
                        <h3 className="font-semibold text-lg my-2">Services</h3>
                        <label className="mb-2 block">POS</label>
                    </div>
                    <CustomTable data={[]} columns={column2} minWidth="0rem" paginator={false} />

                    {/* Resources Section */}
                    <div className="flex align-items-center gap-8">
                        <h3 className="font-semibold text-lg my-2">Resources</h3>
                        <label className="my-2 block">Calendar</label>
                        <label className="my-2 block">Reserve</label>
                    </div>
                    <CustomTable data={[]} columns={column3} minWidth="30rem" paginator={false} />
                </div>

                <div className="col-9">
                    <CustomGridLayout>
                        <CustomCard title="Member Details" col={6} height="200px">
                            <CustomListItem name="membershipType" data={data} />
                            <CustomListItem name="lastVisit" data={data} />
                            <CustomListItem name="barCode" data={data} />
                            <CustomListItem name="agreementNo" label="Agreement#" data={data} />
                            <CustomListItem name="notes" data={data} />
                            <CustomListItem name="secondaryMembers" data={data} />
                        </CustomCard>
                        <CustomCard title="Agreements" col={6} height="200px">
                            <CustomListItem name="agreement" data={data} />
                            <CustomListItem name="expiryDate" data={data} />
                            <CustomListItem name="pastDue" data={data} />
                            <CustomListItem name="fees" label="Agreement#" data={data} />
                            <CustomListItem name="totalPastDue" data={data} />
                            <CustomListItem name="totalNextDue" data={data} />
                            <CustomListItem name="nextDueDate" data={data} />
                        </CustomCard>
                        <CustomCard title="POS" col={12} height="200px">
                            <CustomTable data={getCheckInData?.posSale} columns={posColumn} minWidth="0rem" paginator={false} />
                        </CustomCard>
                    </CustomGridLayout>
                </div>
            </CustomGridLayout>
            <RecentCheckIns />
        </>
    );
}
