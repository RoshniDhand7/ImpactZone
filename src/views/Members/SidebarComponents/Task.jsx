import React, { useEffect } from 'react';
import ProfileDetail from './ProfileDetail';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../../../redux/actions/MembersPortal/memberPortalActions';
import CustomTable from '../../../shared/Table/CustomTable';
import { useParams } from 'react-router-dom';
import { dateConversions, formatLetter } from '../../../utils/commonFunctions';

const Task = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const tableData = useSelector((state) => state.membersPortal.tasks);

    useEffect(() => {
        dispatch(getTasks(id));
    }, [dispatch, id]);

    const columns = [
        { field: 'dueDate', body: (r) => dateConversions(r?.dueDate), header: 'Deadline' },
        { field: 'taskType', body: (r) => (r?.taskType ? formatLetter(r?.taskType) : '-'), header: 'Task Type' },
        { field: 'taskTitle', header: 'Title' },
        { field: 'employee', header: 'Employee' },
        { field: 'message', body: 'descriptionBodyTemplate', header: 'Message' },
        { field: 'completedDate', body: (r) => dateConversions(r?.completedDate), header: 'Date Completed' },
    ];
    return (
        <>
            <div className="">
                <ProfileDetail />
                <CustomTable data={tableData} columns={columns} />
            </div>
        </>
    );
};

export default Task;
