import React, { useEffect } from 'react';
import StatsCard from '../../shared/Cards/StatsCard';
import Member from '../../assets/icons/member.png';
import Members from '../../assets/icons/members.png';
import Revenue from '../../assets/icons/revenue_chart.png';
import Growth from '../../assets/icons/growth_stock .png';
import gym from '../../assets/icons/gym_equipment.png';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboard } from '../../redux/actions/Dashboard/Dashboard';

export default function DashboardCards() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDashboard());
    }, []);

    const { allDashboard } = useSelector((state) => state?.dashboard);
    const { employeeCount, memberCount } = allDashboard;

    const cards = [
        {
            number: memberCount,
            title: 'Active  Members',
            link: '',
            icon: Members,
            color: 'bg-dark-green ',
        },
        {
            number: memberCount,
            title: 'Total Members',
            link: '',
            icon: Member,
            color: 'bg-yellow',
        },
        {
            number: employeeCount,
            title: 'Total Gym Employees',
            link: '',
            icon: gym,
            color: 'bg-light-green',
        },
        {
            number: '$0',
            title: 'Current Month Revenue',
            link: '',
            icon: Revenue,
            color: 'bg-dark-blue ',
        },
        {
            number: '$0',
            title: 'Total Revenue',
            link: '',
            icon: Growth,
            color: 'bg-light-blue ',
        },
    ];
    return (
        <div className="grid">
            {cards.map((item) => (
                <StatsCard title={item.title} color={item.color} icon={item.icon} heading={item.number} />
            ))}
        </div>
    );
}
