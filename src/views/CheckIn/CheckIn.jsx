import React, { useEffect, useMemo, useState } from 'react';
import { CustomAsyncReactSelect } from '../../shared/Input/AllInputs';
import formValidation from '../../utils/validations';
import useMembers from '../../hooks/Members/useMembers';
import { CustomButton } from '../../shared/Button/CustomButton';
import { Divider } from 'primereact/divider';
import CustomCard, { CustomGridLayout, CustomListItem } from '../../shared/Cards/CustomCard';
import CustomTable from '../../shared/Table/CustomTable';
import { useDispatch, useSelector } from 'react-redux';
import { getCheckIn, getCheckInLast } from '../../redux/actions/CheckIn/CheckIn';
import { getDefaultImage, getImageURL } from '../../utils/imageUrl';
import RecentCheckIn from './RecentCheckIn';
import BarcodeScanner from '../../shared/Barcode/BarcodeScanner';
import { showToast } from '../../redux/actions/toastAction';
import Reserve from './Reserve';

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

    const [reserve, setReserve] = useState(false);
    const memberOptions = useMemo(() => allMembers?.map((item) => ({ name: `${item.firstName} ${item.MI} ${item.lastName}`, value: item?._id })), [allMembers]);

    useEffect(() => {
        dispatch(getCheckInLast());
    }, [dispatch]);

    const { getCheckInData } = useSelector((state) => state.checkin);

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
        { field: 'name', header: 'Name' },
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

    console.log(data, 'data');

    const handleScanner = ({ value }) => {
        let _member = allMembers.find((item) => item.barCode == value);
        if (_member) {
            handleChange({ name: 'member', value: _member._id });
        } else {
            dispatch(showToast({ severity: 'warn', summary: 'No member found with the provided barcode. Please verify the barcode and try again.' }));
        }
    };

    return (
        <>
            <div className="grid">
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
                <div className="col-1 text-center">
                    <BarcodeScanner onChnage={handleScanner} />
                </div>
            </div>

            {data?.member && (
                <div className="member-container  border-round-xl shadow-2 bg-green flex justify-content-between p-3 mb-2">
                    <div className="flex w-full justify-content-between">
                        <div className="flex gap-5">
                            <div className="avatar-img">
                                <img
                                    className="fit-cover rounded-full border-white border-2"
                                    src={getImageURL(getCheckInData?.image)}
                                    onError={(e) => (e.target.src = getDefaultImage())}
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
                        </div>

                        <div className="relative">
                            <CustomButton label="Add Task" icon="pi pi-plus" className="text-white border-1 border-surface-100" />
                        </div>
                    </div>

                    <Divider layout="vertical" className="mx-4" />
                    <div className="flex flex-column w-full">
                        {/* <div className="alerts-container flex-1"> */}
                        <div className="flex justify-content-between align-items-center">
                            <p className="text-white text-2xl font-medium">Alerts</p>
                            <CustomButton label="Add Alert" icon="pi pi-plus" className="text-white border-1 border-surface-100" />
                        </div>
                        <div className="alert-list mt-2">
                            <p className="text-white text-sm">Membership expires at 15/1/2022</p>
                            <p className="text-white text-sm">Membership expires at 15/1/2022</p>
                            <p className="text-white text-sm">Membership expires at 15/1/2022</p>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            )}

            <CustomGridLayout>
                <div className="grid col-12">
                    {/* Events Section */}

                    <div className="col-4">
                        <div className="flex align-items-center  justify-content-between mt-3">
                            <h3 className="font-semibold text-lg m-0">Events</h3>
                            <label className="m-0 text-secondary">Calendar</label>
                            <label className="m-0 text-secondary">Quick Enroll</label>
                        </div>
                        <CustomTable data={[]} columns={column1} minWidth="0rem" paginator={false} className={''} />
                    </div>
                    <div className="col-4">
                        {/* Services Section */}
                        <div className="flex align-items-center  justify-content-between mt-3">
                            <h3 className="font-semibold text-lg ">Redeemable</h3>
                            <label className="mb-2 block">POS</label>
                        </div>
                        <CustomTable data={getCheckInData?.plan?.[0]?.services} columns={column2} minWidth="0rem" paginator={false} className={''} />
                    </div>
                    <div className="col-4">
                        {/* Resources Section */}
                        <div className="flex align-items-center justify-content-between mt-3">
                            <h3 className="font-semibold text-lg ">Resources</h3>
                            <label className=" block">Calendar</label>
                            <label className=" block cursor-pointer" onClick={() => setReserve(true)}>
                                Reserve
                            </label>
                        </div>
                        <CustomTable data={[]} columns={column3} minWidth="0rem" paginator={false} className={'custom-table-height'} />
                    </div>
                </div>
                <Reserve reserve={reserve} setReserve={setReserve} suggestions={suggestions} memberOptions={memberOptions} member={data?.member} />

                <CustomCard title="Agreements" col={4} height="200px">
                    <CustomListItem name="agreement" data={data} />
                    <CustomListItem name="expiryDate" data={data} />
                    <CustomListItem name="pastDue" data={data} />
                    <CustomListItem name="fees" label="Agreement#" data={data} />
                    <CustomListItem name="totalPastDue" data={data} />
                    <CustomListItem name="totalNextDue" data={data} />
                    <CustomListItem name="nextDueDate" data={data} />
                </CustomCard>
                <CustomCard title="POS" col={8} height="200px">
                    <CustomTable data={getCheckInData?.posSale} columns={posColumn} minWidth="0rem" paginator={false} />
                </CustomCard>
            </CustomGridLayout>
            <RecentCheckIn />
        </>
    );
}
