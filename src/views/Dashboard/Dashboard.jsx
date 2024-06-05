import React from 'react';
import DashboardCards from './DashboardCards';
import DashboardGraphs from './DashboardGraphs';
import CustomDialog from '../../shared/Overlays/CustomDialog';

const Dashboard = () => {
    return (
        <>
            <DashboardCards />
            <DashboardGraphs />
        </>
    );
};

export default Dashboard;
