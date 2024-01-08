import React from 'react';
import StatsCard from '../../shared/Cards/StatsCard';
import Member from '../../assets/icons/member.png';
import Members from '../../assets/icons/members.png';
import Revenue from '../../assets/icons/revenue_chart.png';
import Growth from '../../assets/icons/growth_stock .png';
import gym from '../../assets/icons/gym_equipment.png';

export default function DashboardCards() {
  const cards = [
    {
      number: '12',
      title: 'Active  Members',
      link: '',
      icon: Members,
      color: 'bg-dark-green ',
    },
    {
      number: '105',
      title: 'Total Members',
      link: '',
      icon: Member,
      color: 'bg-yellow',
    },
    {
      number: ' 20',
      title: 'Total Gym Employees',
      link: '',
      icon: gym,
      color: 'bg-light-green',
    },
    {
      number: '$500',
      title: 'Current Month Revenue',
      link: '',
      icon: Revenue,
      color: 'bg-dark-blue ',
    },
    {
      number: '$2500',
      title: 'Total Revenue',
      link: '',
      icon: Growth,
      color: 'bg-light-blue ',
    },
  ];
  return (
    <div className="grid">
      {cards.map((item) => (
        <StatsCard
          title={item.title}
          color={item.color}
          icon={item.icon}
          heading={item.number}
        />
      ))}
    </div>
  );
}
