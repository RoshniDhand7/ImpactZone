import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteJobTitle, getJobDetails } from '../../../../redux/actions/BusinessSettings/jobActions';
import { confirmDelete } from '../../../../utils/commonFunctions';

const JobTitle = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getJobDetails());
    }, [dispatch]);

    const { allJobTitle } = useSelector((state) => state.jobTitle);

    const columns = [
        { field: 'jobTitle', header: 'Name' },
        { field: 'description', header: 'Description' },
    ];

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteJobTitle(col._id, () => {}));
            },
            'Do you want to delete this Job Title?',
            position,
        );
    };
    const onEdit = (col) => {
        history.push(`/settings/business/job-title/edit/${col._id}`);
    };

    return (
        <>
            <CustomFilterCard buttonTitle="Add Job Title" linkTo="/settings/business/job-title/add" />
            <CustomTable data={allJobTitle} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default JobTitle;
