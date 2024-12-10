import React, { useEffect } from 'react';
import ProfileDetail from './ProfileDetail';
import TopLayout from './TopLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../../../redux/actions/MembersPortal/memberPortalActions';
import CustomTable from '../../../shared/Table/CustomTable';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { formatLetter } from '../../../utils/commonFunctions';

const Task = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const tableData = useSelector((state) => state.membersPortal.tasks);

    useEffect(() => {
        dispatch(getTasks(id));
    }, [dispatch, id]);

    const columns = [
        { field: 'dueDate', body: (r) => (r?.dueDate ? moment(r?.dueDate).format('MMMM-DD-YYYY') : '-'), header: 'Deadline' },
        { field: 'taskType', body: (r) => (r?.taskType ? formatLetter(r?.taskType) : '-'), header: 'Task Type' },
        { field: 'taskTitle', header: 'Title' },
        { field: 'message', header: 'Message' },
        { field: 'completedDate', body: (r) => (r?.completedDate ? moment(r?.completedDate).format('MMMM-DD-YYYY') : '-'), header: 'Date Completed' },
    ];
    return (
        <>
            <div className="">
                <ProfileDetail />
                <TopLayout />
                <CustomTable data={tableData} columns={columns} />
            </div>
        </>
    );
};

export default Task;
