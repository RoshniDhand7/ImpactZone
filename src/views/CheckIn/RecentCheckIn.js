import React, { useEffect, useState } from 'react';
import { Avatar } from 'primereact/avatar';
import { Card } from 'primereact/card';
import { getRecentCheckInHistory } from '../../redux/actions/CheckIn/CheckIn';
import { useDispatch, useSelector } from 'react-redux';
import { getImageURL } from '../../utils/imageUrl';
import { CustomInput } from '../../shared/Input/AllInputs';
import PrimaryButton from '../../shared/Button/CustomButton';
import { CustomFilterCard } from '../../shared/Cards/CustomCard';
import useFilters from '../../hooks/useFilters';
import FilterComponent from '../../components/FilterComponent';

const RecentCheckIn = () => {
    const dispatch = useDispatch();
    const statusColors = {
        active: 'green-500',
        canceled: 'red-500',
        pending: 'yellow-500',
    };
    const [data, setData] = useState({
        filterType: 'AND',
    });
    useEffect(() => {
        dispatch(getRecentCheckInHistory());
    }, [dispatch]);
    const { getCheckInHistory } = useSelector((state) => state.checkin);
    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(getCheckInHistory);
    const statusBackgrounds = {
        active: 'bg-green-100',
        canceled: 'bg-red-100',
    };
    const CheckInCard = ({ checkIn }) => {
        console.log(checkIn, 'checkIn');
        const borderColor = statusColors?.active || 'gray-500';
        const backgroundColor = statusBackgrounds?.active || 'bg-gray-100';

        return (
            <Card className={`p-2 border-2 border-${borderColor} ${backgroundColor} border-round-3xl shadow-2`} style={{ width: '200px', textAlign: 'center' }}>
                <div className="flex flex-column align-items-center gap-2">
                    <Avatar image={checkIn.image ? getImageURL(checkIn.image) : null} shape="circle" size="xlarge" />

                    <div>
                        <h4 className="m-0">{checkIn.member}</h4>
                        <p className="text-sm m-0 text-gray-600">{checkIn.time}</p>
                        <p className="text-sm m-0 text-gray-500">{checkIn.reason || 'Impact1'}</p>

                        {checkIn.status === 'canceled' && (
                            <div className="flex align-items-center mt-2 text-red-500">
                                <i className="pi pi-exclamation-triangle mr-2"></i>
                                <span>Membership Canceled</span>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        );
    };

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <div>
            <div className="p-4">
                <h3 className="mb-3">Recent Check-Ins</h3>
                <CustomFilterCard buttonTitle="More" linkTo="/more/attendance/check-in-history" contentPosition="end">
                    <div className="text-end w-full">
                        <PrimaryButton label="Filter" icon="pi pi-filter" onClick={onFilterOpen} className="mx-2 " />
                    </div>
                </CustomFilterCard>
                <div className="flex gap-3 overflow-x-auto">
                    {tableData?.slice(0, 10).map((checkIn, index) => (
                        <CheckInCard key={index} checkIn={checkIn} />
                    ))}
                </div>
                <FilterComponent
                    value={filters}
                    onApply={onApplyFilters}
                    visible={isFilterVisible}
                    onHide={onFilterClose}
                    data={data}
                    handleChange={handleChange}
                    setData={setData}
                >
                    <div>
                        <CustomInput name="member" data={data} onChange={handleChange} col={12} />
                        {/* <CustomCalenderInput name="from" data={data} onChange={handleChange} col={12} maxDate={data.to} />
                        <CustomCalenderInput name="to" data={data} onChange={handleChange} col={12} minDate={data.from} /> */}
                    </div>
                </FilterComponent>
            </div>
        </div>
    );
};

export default RecentCheckIn;
