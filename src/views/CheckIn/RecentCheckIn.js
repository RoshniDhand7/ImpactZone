import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { getRecentCheckInHistory } from '../../redux/actions/CheckIn/CheckIn';
import { useDispatch, useSelector } from 'react-redux';
import { getImageURL } from '../../utils/imageUrl';
import { CustomInput } from '../../shared/Input/AllInputs';
import PrimaryButton from '../../shared/Button/CustomButton';
import { CustomFilterCard } from '../../shared/Cards/CustomCard';
import useFilters from '../../hooks/useFilters';
import FilterComponent from '../../components/FilterComponent';
import moment from 'moment';
import maleAvatarImage from '../../../src/assets/images/male-avatar.png';
import femaleAvatarImage from '../../../src/assets/images/female-avatar.png';
import CustomAvatar from '../../shared/Avatar/Avatar';

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
    const getCheckInHistory = useSelector((state) => state.checkin.getCheckInHistory);
    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(getCheckInHistory);
    const statusBackgrounds = {
        active: 'bg-green-100',
        canceled: 'bg-red-100',
    };
    const CheckInCard = ({ checkIn }) => {
        const borderColor = statusColors?.active || 'gray-500';
        const backgroundColor = statusBackgrounds?.active || 'bg-gray-100';

        const getImage = () => {
            if (!checkIn.image) {
                return checkIn.gender === 'MALE' ? maleAvatarImage : femaleAvatarImage;
            }
            return getImageURL(checkIn.image) || null;
        };

        return (
            <Card
                className={`recent-card border-2 border-${borderColor} ${backgroundColor} border-round-3xl shadow-2 flex-no-shrink`}
                style={{ width: '200px', textAlign: 'center' }}
            >
                <div className="flex flex-column align-items-center gap-2">
                    <CustomAvatar image={getImage()} shape="circle" size="xlarge" style={{ backgroundColor: '#c5c9d5', width: '79px', height: '73px' }} />

                    <div>
                        <h4 className="m-0">{checkIn.member}</h4>
                        <p className="text-sm m-0 text-gray-500">{checkIn.reason || checkIn?.membershipPlan?.name}</p>
                        <p className="text-sm m-0 text-blue-600">{moment(checkIn.createdAt).format('hh:mm a')}</p>

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
    if (!getCheckInHistory?.length) return null;
    return (
        <div className="p-2">
            <div className="flex justify-content-between align-items-center">
                <h3 className="">Recent Check-Ins</h3>
                <CustomFilterCard buttonTitle="More" linkTo="/more/attendance/check-in-history" contentPosition="end">
                    <PrimaryButton label="Filter" icon="pi pi-filter" onClick={onFilterOpen} className="mx-2 " />
                </CustomFilterCard>
            </div>

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
    );
};

export default RecentCheckIn;
